'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { showToast } from '@/hooks/showToast';
import { adminFetch } from '../api';
import { useOps } from '../OpsContext';
import { formatEst, formatMoneyUsd } from '../format';
import ConfirmDialog from '../ui/ConfirmDialog';
import OpsButton from '../ui/OpsButton';
import OpsCard from '../ui/OpsCard';
import OpsField from '../ui/OpsField';

export default function ActiveSection() {
  const { token, logout, setMessage, setError } = useOps();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [active, setActive] = useState(null);
  const [seatEdit, setSeatEdit] = useState({ seatsTotal: 25, seatsLeft: 5 });
  const [priceEdit, setPriceEdit] = useState('19.99');

  const load = useCallback(async () => {
    try {
      const res = await adminFetch('/api/admin/webinars/active', { token });
      setActive(res.webinar);
      if (res.webinar) {
        setSeatEdit({
          seatsTotal: res.webinar.seatsTotal,
          seatsLeft: res.webinar.seatsLeft,
        });
        setPriceEdit(((res.webinar.priceCents || 0) / 100).toFixed(2));
      }
    } catch (err) {
      setError(err.message);
      if (/Unauthorized/i.test(err.message)) logout();
    } finally {
      setLoading(false);
    }
  }, [token, logout, setError]);

  useEffect(() => {
    setLoading(true);
    load();
    const timer = window.setInterval(load, 12_000);
    return () => window.clearInterval(timer);
  }, [load]);

  const saveAll = async () => {
    if (!active?.id) return;
    const dollars = Number(priceEdit);
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setError('Enter a valid USD price (e.g. 19.99)');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await adminFetch(`/api/admin/webinars/${active.id}/seats`, {
        token,
        method: 'PATCH',
        body: {
          seatsTotal: Number(seatEdit.seatsTotal),
          seatsLeft: Number(seatEdit.seatsLeft),
        },
      });
      await adminFetch(`/api/admin/webinars/${active.id}`, {
        token,
        method: 'PATCH',
        body: { priceCents: Math.round(dollars * 100) },
      });
      setMessage('Webinar settings saved.');
      setEditing(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    if (active) {
      setSeatEdit({
        seatsTotal: active.seatsTotal,
        seatsLeft: active.seatsLeft,
      });
      setPriceEdit(((active.priceCents || 0) / 100).toFixed(2));
    }
    setEditing(false);
  };

  const deactivate = async () => {
    if (!active?.id) return;
    setSaving(true);
    setError('');
    try {
      await adminFetch(`/api/admin/webinars/${active.id}`, {
        token,
        method: 'PATCH',
        body: { active: false },
      });
      setMessage('Webinar deactivated. Landing page shows the waitlist form. The Zoom meeting is still scheduled.');
      setEditing(false);
      await load();
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteWebinar = async () => {
    if (!active?.id) return;
    setSaving(true);
    setError('');
    try {
      const result = await adminFetch(`/api/admin/webinars/${active.id}`, {
        token,
        method: 'DELETE',
      });
      const zoomNote =
        result.zoomDeleted && result.zoomMeetingId
          ? ` Zoom meeting ${result.zoomMeetingId} removed.`
          : '';
      setMessage(`Webinar deleted.${zoomNote}`);
      showToast(`Deleted “${active.title}”.${zoomNote}`, 'success');
      setConfirmDelete(false);
      setEditing(false);
      await load();
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !active) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <OpsCard>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2} mb={2}>
        <Typography fontWeight={700} lineHeight={1.3}>
          Active webinar
        </Typography>
        {active && !editing && (
          <IconButton
            aria-label="Edit webinar settings"
            onClick={() => setEditing(true)}
            sx={{
              border: '1px solid #D8E1F4',
              borderRadius: '8px',
              width: 40,
              height: 40,
              bgcolor: '#fff',
            }}
          >
            <Box component="span" sx={{ fontSize: 16, lineHeight: 1 }} title="Edit">
              ✎
            </Box>
          </IconButton>
        )}
      </Stack>

      {!active ? (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            No active webinar. The public page shows the notify waitlist form.
          </Typography>
          <OpsButton component={Link} href="/sp-webinar-ops/create" sx={{ alignSelf: 'flex-start' }}>
            Create webinar
          </OpsButton>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Typography fontSize="1.2rem" fontWeight={600} lineHeight={1.3}>
            {active.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {active.datetimeLabel || '—'}
          </Typography>
          <Typography variant="body2">Starts (EST): {formatEst(active.startsAt)}</Typography>
          <Typography variant="body2">
            Zoom Meeting ID: <strong>{active.zoomMeetingId || 'Not linked'}</strong>
          </Typography>

          {!editing ? (
            <Box
              sx={{
                border: '1px solid #D8E1F4',
                borderRadius: '12px',
                bgcolor: '#F8FAFF',
                p: 2,
              }}
            >
              <Typography variant="body2" lineHeight={1.5}>
                Seats left:{' '}
                <strong>
                  {active.seatsLeft} / {active.seatsTotal}
                </strong>{' '}
                <Typography component="span" variant="caption" color="text.secondary">
                 
                </Typography>
              </Typography>
              <Typography variant="body2" mt={1} lineHeight={1.5}>
                Price: <strong>{formatMoneyUsd(active.priceCents)}</strong>
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              <Typography fontWeight={600}>Edit settings</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <OpsField
                  label="Seats total"
                  type="number"
                  value={seatEdit.seatsTotal}
                  onChange={(e) => setSeatEdit((s) => ({ ...s, seatsTotal: e.target.value }))}
                />
                <OpsField
                  label="Seats left"
                  type="number"
                  value={seatEdit.seatsLeft}
                  onChange={(e) => setSeatEdit((s) => ({ ...s, seatsLeft: e.target.value }))}
                />
                <OpsField
                  label="Price (USD)"
                  type="number"
                  inputProps={{ step: '0.01', min: '1' }}
                  value={priceEdit}
                  onChange={(e) => setPriceEdit(e.target.value)}
                />
              </Stack>
              <Stack direction="row" gap={1} flexWrap="wrap">
                <OpsButton onClick={saveAll} disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </OpsButton>
                <OpsButton tone="secondary" onClick={cancelEdit} disabled={saving}>
                  Cancel
                </OpsButton>
                <OpsButton tone="secondary" onClick={deactivate} disabled={saving}>
                  Deactivate only
                </OpsButton>
                <OpsButton tone="danger" onClick={() => setConfirmDelete(true)} disabled={saving}>
                  Delete webinar
                </OpsButton>
              </Stack>
            </Stack>
          )}

          {!editing && active && (
            <Stack direction="row" gap={1} flexWrap="wrap" pt={1}>
              <OpsButton tone="danger" disabled={saving} onClick={() => setConfirmDelete(true)}>
                Delete webinar
              </OpsButton>
            </Stack>
          )}
        </Stack>
      )}

      <ConfirmDialog
        open={confirmDelete}
        title="Delete webinar?"
        description={
          active
            ? `Delete “${active.title}” and remove Zoom meeting ${active.zoomMeetingId || '(not linked)'}? This permanently removes the webinar from ops and Zoom. Use “Deactivate only” if you just want to hide it from the landing page.`
            : ''
        }
        confirmLabel="Delete from ops and Zoom"
        loading={saving}
        onClose={() => !saving && setConfirmDelete(false)}
        onConfirm={deleteWebinar}
      />
    </OpsCard>
  );
}
