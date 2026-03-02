'use client';
import React, { useState, useCallback } from 'react';
import { Box, Button, Alert } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const StripePaymentForm = ({ onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!stripe || !elements) return;
      setSubmitting(true);
      setMessage('');
      try {
        // Trigger validation and show Element-level errors inline
        const { error: submitError } = await elements.submit();
        if (submitError) {
          setMessage(submitError.message || 'There was an error with your submission.');
          return;
        }
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {},
          redirect: 'if_required',
        });
        if (result.error) {
          setMessage(result.error.message || 'Payment failed. Please try again.');
          return;
        }
        if (result?.paymentIntent?.status === 'succeeded') {
          // Pass the payment intent ID to the success handler
          if (typeof onSuccess === 'function') onSuccess(result.paymentIntent.id);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [stripe, elements, onSuccess, onClose]
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {message && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {message}
        </Alert>
      )}
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="filled"
        sx={{ mt: 2, color: 'extremes.light' }}
        disabled={!stripe || submitting}
      >
        {submitting ? 'Processing…' : 'Pay'}
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, color: '#000' }}
        disabled={!stripe || submitting}
        onClick={onClose}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default StripePaymentForm;
