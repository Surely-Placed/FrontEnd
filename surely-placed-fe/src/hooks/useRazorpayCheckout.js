'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPaymentOrder, verifyPayment } from '@/lib/payments';

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Razorpay checkout is only available in the browser'));
      return;
    }

    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const existing = document.querySelector(`script[src="${CHECKOUT_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay));
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay')));
      return;
    }

    const script = document.createElement('script');
    script.src = CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error('Failed to load Razorpay'));
    document.body.appendChild(script);
  });
}

function createIdempotencyKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `idemp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function useRazorpayCheckout({ onSuccess, onFailure } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const checkoutRef = useRef(null);

  useEffect(() => {
    loadRazorpayScript().catch(() => {});
  }, []);

  const startCheckout = useCallback(
    async (orderPayload) => {
      setLoading(true);
      setError(null);

      try {
        const Razorpay = await loadRazorpayScript();
        const idempotencyKey = createIdempotencyKey();
        const order = await createPaymentOrder(orderPayload, idempotencyKey);

        return new Promise((resolve, reject) => {
          const options = {
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: 'Surely Placed',
            description: order.plan?.name || 'Payment',
            order_id: order.razorpayOrderId,
            prefill: {
              name: order.customer?.name,
              email: order.customer?.email,
              contact: order.customer?.contact,
            },
            theme: { color: '#1a56db' },
            method: {
              upi: true,
              card: true,
              netbanking: true,
              wallet: true,
              emi: true,
              paylater: true,
            },
            handler: async (response) => {
              try {
                const verifyIdempotencyKey = createIdempotencyKey();
                const verified = await verifyPayment(
                  {
                    orderId: order.orderId,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                  },
                  verifyIdempotencyKey
                );
                onSuccess?.(verified, order);
                resolve(verified);
              } catch (verifyError) {
                setError(verifyError.message);
                onFailure?.(verifyError, order);
                reject(
                  new Error(
                    'Payment may have gone through on Razorpay but confirmation failed. Please contact support with your payment ID if you were charged.'
                  )
                );
              } finally {
                setLoading(false);
              }
            },
            modal: {
              ondismiss: () => {
                setLoading(false);
                onFailure?.(new Error('Checkout dismissed'), order);
                reject(new Error('Checkout dismissed'));
              },
            },
          };

          checkoutRef.current = new Razorpay(options);
          checkoutRef.current.open();
        });
      } catch (checkoutError) {
        setError(checkoutError.message);
        setLoading(false);
        onFailure?.(checkoutError);
        throw checkoutError;
      }
    },
    [onFailure, onSuccess]
  );

  return { startCheckout, loading, error };
}
