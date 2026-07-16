'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stack, Typography } from '@mui/material';
import { adminFetch } from '../api';
import { useOps } from '../OpsContext';
import OpsButton from '../ui/OpsButton';
import OpsCard from '../ui/OpsCard';

export default function SettingsSection() {
  const router = useRouter();
  const { token, setMessage, setError } = useOps();
  const [saving, setSaving] = useState(false);

  const clearData = async () => {
    if (
      !window.confirm(
        'Remove all webinar events, waitlist entries, and non-paid (pending) webinar orders? Paid orders are kept.'
      )
    ) {
      return;
    }
    setSaving(true);
    setError('');
    try {
      const result = await adminFetch('/api/admin/cleanup-test-data', {
        token,
        method: 'POST',
      });
      setMessage(
        `Removed ${result.deletedEvents} webinars, ${result.deletedOrders} pending orders, ${result.deletedWaitlist} waitlist rows.`
      );
      router.push('/sp-webinar-ops');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={2.5}>
      <OpsCard>
        <Typography fontWeight={700} mb={1} lineHeight={1.3}>
          Region defaults
        </Typography>
        <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
          Timezone: <strong>EST</strong> (America/New_York)
          <br />
          Currency: <strong>USD</strong>
        </Typography>
      </OpsCard>
      <OpsCard>
        <Typography fontWeight={700} mb={1} lineHeight={1.3}>
          Remove webinars & pending orders
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2} lineHeight={1.5}>
          Permanently deletes all webinar events, waitlist rows, and non-paid (pending) webinar
          orders. Paid orders are kept.
        </Typography>
        <OpsButton tone="danger" disabled={saving} onClick={clearData}>
          Remove webinars & pending orders
        </OpsButton>
      </OpsCard>
    </Stack>
  );
}
