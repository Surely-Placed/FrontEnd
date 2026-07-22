'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPaymentOrder, getPaymentsApiUrl, verifyPayment } from '@/lib/payments';

function createIdempotencyKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `idemp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getOrderIdempotencyKey(orderPayload) {
  const email = String(orderPayload?.email || '')
    .trim()
    .toLowerCase();
  const plan = String(orderPayload?.planSlug || 'unknown');
  const storageKey = `sp_pay_idemp_v1:${plan}:${email}`;

  try {
    const existing = window.sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const next = createIdempotencyKey();
    window.sessionStorage.setItem(storageKey, next);
    return next;
  } catch {
    return createIdempotencyKey();
  }
}

function clearOrderIdempotencyKey(orderPayload) {
  const email = String(orderPayload?.email || '')
    .trim()
    .toLowerCase();
  const plan = String(orderPayload?.planSlug || 'unknown');
  try {
    window.sessionStorage.removeItem(`sp_pay_idemp_v1:${plan}:${email}`);
  } catch {
    /* ignore */
  }
}

function loadPayPalSdk(clientId, currency = 'USD') {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('PayPal checkout is only available in the browser'));
      return;
    }
    if (!clientId) {
      reject(new Error('PayPal client id is missing'));
      return;
    }

    const desiredSrc = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId
    )}&currency=${encodeURIComponent(currency)}&intent=capture&components=buttons`;

    if (window.paypal?.Buttons && window.__spPaypalClientId === clientId) {
      resolve(window.paypal);
      return;
    }

    // Replace stale SDK script if client id changed
    document.querySelectorAll('script[data-sp-paypal="1"]').forEach((node) => node.remove());
    delete window.paypal;
    window.__spPaypalClientId = clientId;

    const script = document.createElement('script');
    script.src = desiredSrc;
    script.async = true;
    script.dataset.spPaypal = '1';
    script.onload = () => {
      if (!window.paypal?.Buttons) {
        reject(new Error('PayPal SDK loaded but Buttons API is unavailable'));
        return;
      }
      resolve(window.paypal);
    };
    script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
    document.body.appendChild(script);
  });
}

export async function fetchPayPalConfig() {
  const response = await fetch(`${getPaymentsApiUrl()}/api/payments/config`, {
    cache: 'no-store',
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Could not load PayPal config');
  }
  return data;
}

/**
 * Render PayPal Buttons into a DOM node.
 * Order is created inside the button click so the PayPal popup can open.
 */
export async function renderPayPalButtons({
  container,
  orderPayload,
  onSuccess,
  onFailure,
  onCancel,
}) {
  if (!container) throw new Error('PayPal button container is missing');

  const config = await fetchPayPalConfig();
  if (!config.configured || !config.clientId) {
    throw new Error('PayPal is not configured on the server. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.');
  }

  const paypal = await loadPayPalSdk(config.clientId, config.currency || 'USD');
  container.innerHTML = '';

  let pendingOrder = null;

  return paypal
    .Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        height: 45,
      },
      // Create inside click gesture so PayPal popup is not blocked
      createOrder: async () => {
        const idempotencyKey = getOrderIdempotencyKey(orderPayload);
        try {
          pendingOrder = await createPaymentOrder(orderPayload, idempotencyKey);
          if (!pendingOrder?.paypalOrderId) {
            throw new Error('PayPal order id missing from server response');
          }
          return pendingOrder.paypalOrderId;
        } catch (err) {
          // Don't reuse a key that mapped to a conflict / failure
          clearOrderIdempotencyKey(orderPayload);
          throw err;
        }
      },
      onApprove: async (data) => {
        try {
          const paypalOrderId = data?.orderID || pendingOrder?.paypalOrderId;
          if (!pendingOrder?.orderId || !paypalOrderId) {
            throw new Error('Missing order details after PayPal approval');
          }
          const verifyIdempotencyKey = `verify_${paypalOrderId}`.slice(0, 100);
          const verified = await verifyPayment(
            {
              orderId: pendingOrder.orderId,
              paypalOrderId,
            },
            verifyIdempotencyKey
          );
          clearOrderIdempotencyKey(orderPayload);
          onSuccess?.(verified, pendingOrder);
          return verified;
        } catch (err) {
          onFailure?.(err, pendingOrder);
          throw err;
        }
      },
      onCancel: () => {
        onCancel?.(new Error('Checkout dismissed'), pendingOrder);
      },
      onError: (err) => {
        onFailure?.(new Error(err?.message || 'PayPal checkout failed'), pendingOrder);
      },
    })
    .render(container);
}

export function usePayPalCheckout({ onSuccess, onFailure } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStep, setPaymentStep] = useState(false);
  const [activePayload, setActivePayload] = useState(null);
  const buttonsHostRef = useRef(null);
  const buttonsRenderedRef = useRef(false);

  const resetPaymentStep = useCallback(() => {
    setPaymentStep(false);
    setActivePayload(null);
    setLoading(false);
    buttonsRenderedRef.current = false;
    if (buttonsHostRef.current) buttonsHostRef.current.innerHTML = '';
  }, []);

  const startCheckout = useCallback(
    async (orderPayload) => {
      setError(null);
      setLoading(true);
      setActivePayload(orderPayload);
      setPaymentStep(true);
      // loading stays true until buttons render
    },
    []
  );

  useEffect(() => {
    if (!paymentStep || !activePayload) return;
    if (buttonsRenderedRef.current) return;

    let cancelled = false;
    let attempts = 0;

    const tryRender = async () => {
      const container = buttonsHostRef.current;
      if (!container) {
        attempts += 1;
        if (attempts < 20 && !cancelled) {
          window.setTimeout(tryRender, 50);
        } else if (!cancelled) {
          setLoading(false);
          setError('PayPal button container failed to mount');
          setPaymentStep(false);
        }
        return;
      }

      buttonsRenderedRef.current = true;
      try {
        await renderPayPalButtons({
          container,
          orderPayload: activePayload,
          onSuccess: (verified, order) => {
            setLoading(false);
            resetPaymentStep();
            onSuccess?.(verified, order);
          },
          onFailure: (err, order) => {
            setLoading(false);
            setError(err.message);
            onFailure?.(err, order);
          },
          onCancel: (err, order) => {
            setLoading(false);
            onFailure?.(err || new Error('Checkout dismissed'), order);
          },
        });
        if (!cancelled) setLoading(false);
      } catch (err) {
        if (cancelled) return;
        buttonsRenderedRef.current = false;
        setLoading(false);
        setError(err.message);
        setPaymentStep(false);
        onFailure?.(err);
      }
    };

    tryRender();

    return () => {
      cancelled = true;
    };
  }, [paymentStep, activePayload, onFailure, onSuccess, resetPaymentStep]);

  return {
    startCheckout,
    loading,
    error,
    paymentStep,
    buttonsHostRef,
    resetPaymentStep,
  };
}
