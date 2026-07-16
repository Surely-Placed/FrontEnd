'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { adminFetch } from '../api';
import {
  DEFAULT_PRICE_CENTS,
  DEFAULT_SEATS_LEFT,
  DEFAULT_SEATS_TOTAL,
  TZ,
} from '../constants';
import { formatDisplayLabelFromLocal, formatMoneyUsd } from '../format';
import { useOps } from '../OpsContext';
import OpsButton from '../ui/OpsButton';
import OpsCard from '../ui/OpsCard';
import OpsField from '../ui/OpsField';

export default function CreateSection() {
  const router = useRouter();
  const { token, setMessage, setError } = useOps();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: 'Live Career Webinar',
    datetimeLabel: '',
    startsAt: '',
    seatsTotal: DEFAULT_SEATS_TOTAL,
    seatsLeft: DEFAULT_SEATS_LEFT,
    priceUsd: (DEFAULT_PRICE_CENTS / 100).toFixed(2),
  });

  const onPickStart = (startsAt) => {
    const label = formatDisplayLabelFromLocal(startsAt);
    setForm((f) => ({
      ...f,
      startsAt,
      datetimeLabel: label || f.datetimeLabel,
      seatsTotal: DEFAULT_SEATS_TOTAL,
      seatsLeft: DEFAULT_SEATS_LEFT,
      priceUsd: f.priceUsd || (DEFAULT_PRICE_CENTS / 100).toFixed(2),
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.startsAt) {
      setError('Please select a start date and time.');
      return;
    }
    const dollars = Number(form.priceUsd);
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setError('Enter a valid USD price (e.g. 19.99)');
      return;
    }
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const data = await adminFetch('/api/admin/webinars', {
        token,
        method: 'POST',
        body: {
          title: form.title,
          datetimeLabel: form.datetimeLabel,
          startsAt: form.startsAt,
          seatsTotal: Number(form.seatsTotal),
          seatsLeft: Number(form.seatsLeft),
          priceCents: Math.round(dollars * 100),
          createZoom: true,
          timezone: TZ,
        },
      });
      setMessage(
        data.webinar?.zoomMeetingId
          ? `Webinar created. Zoom Meeting ID: ${data.webinar.zoomMeetingId}`
          : 'Webinar created (Zoom not linked — check OAuth).'
      );
      router.push('/sp-webinar-ops/active');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <OpsCard>
      <Typography fontWeight={700} mb={1} lineHeight={1.3}>
        Create webinar
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3} lineHeight={1.5}>
        Pick a start time first — the public label and seats fill in automatically. Timezone is EST;
        currency is USD.
      </Typography>

      <Box component="form" onSubmit={submit}>
        <Stack spacing={2.5}>
          <OpsField
            label="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
          />

          <OpsField
            label="Starts at (EST)"
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => onPickStart(e.target.value)}
            required
          />

          {form.datetimeLabel ? (
            <Box
              sx={{
                border: '1px solid #D8E1F4',
                borderRadius: '12px',
                bgcolor: '#F8FAFF',
                px: 2,
                py: 1.75,
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                Public datetime label (auto-filled)
              </Typography>
              <Typography fontWeight={600} lineHeight={1.4} color="text.primary">
                {form.datetimeLabel}
              </Typography>
              <OpsField
                label="Edit label"
                value={form.datetimeLabel}
                onChange={(e) => setForm((f) => ({ ...f, datetimeLabel: e.target.value }))}
                sx={{ mt: 2 }}
              />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Select a start date/time to auto-fill the public label and seats below.
            </Typography>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <OpsField
              label="Seats total"
              type="number"
              value={form.seatsTotal}
              onChange={(e) => {
                const seatsTotal = e.target.value;
                setForm((f) => ({
                  ...f,
                  seatsTotal,
                  seatsLeft:
                    Number(f.seatsLeft) > Number(seatsTotal) ||
                    Number(f.seatsLeft) === Number(f.seatsTotal)
                      ? seatsTotal
                      : f.seatsLeft,
                }));
              }}
            />
            <OpsField
              label="Seats left"
              type="number"
              value={form.seatsLeft}
              onChange={(e) => setForm((f) => ({ ...f, seatsLeft: e.target.value }))}
            />
            <OpsField
              label="Price (USD)"
              type="number"
              inputProps={{ step: '0.01', min: '1' }}
              value={form.priceUsd}
              onChange={(e) => setForm((f) => ({ ...f, priceUsd: e.target.value }))}
              helperText={`Charged as ${formatMoneyUsd(Math.round(Number(form.priceUsd || 0) * 100))}`}
            />
          </Stack>

          <OpsButton type="submit" disabled={saving} sx={{ alignSelf: 'flex-start', fontWeight: 700 }}>
            {saving ? 'Creating…' : 'Create + generate Zoom meeting'}
          </OpsButton>
        </Stack>
      </Box>
    </OpsCard>
  );
}
