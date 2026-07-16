'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stack, Typography } from '@mui/material';
import { showToast } from '@/hooks/showToast';
import { adminFetch } from '../api';
import { useOps } from '../OpsContext';
import ConfirmDialog from '../ui/ConfirmDialog';
import OpsButton from '../ui/OpsButton';
import OpsCard from '../ui/OpsCard';

export default function SettingsSection() {
  const router = useRouter();
  const { token, setMessage, setError } = useOps();
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const clearData = async () => {
    setSaving(true);
    setError('');
    try {
      const result = await adminFetch('/api/admin/cleanup-test-data', {
        token,
        method: 'POST',
      });
      const msg = `Removed ${result.deletedEvents} webinars, ${result.deletedOrders} pending orders, ${result.deletedWaitlist} waitlist rows.`;
      setMessage(msg);
      showToast(msg, 'success');
      setConfirmOpen(false);
      router.push('/sp-webinar-ops');
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
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
        <OpsButton tone="danger" disabled={saving} onClick={() => setConfirmOpen(true)}>
          Remove webinars & pending orders
        </OpsButton>
      </OpsCard>

      <ConfirmDialog
        open={confirmOpen}
        title="Remove webinars & pending orders?"
        description="This permanently deletes all webinar events, waitlist entries, and non-paid (pending) webinar orders. Paid orders are kept."
        confirmLabel="Remove data"
        loading={saving}
        onClose={() => !saving && setConfirmOpen(false)}
        onConfirm={clearData}
      />
    </Stack>
  );
}
