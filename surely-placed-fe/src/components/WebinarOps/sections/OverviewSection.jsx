'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { adminFetch } from '../api';
import { useOps } from '../OpsContext';
import { formatEst, formatMoneyUsd } from '../format';
import OpsButton from '../ui/OpsButton';
import OpsCard from '../ui/OpsCard';

export default function OverviewSection() {
  const { token, logout, setError } = useOps();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [webinars, setWebinars] = useState([]);
  const [paidCount, setPaidCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [activeRes, listRes, attendeesRes] = await Promise.all([
          adminFetch('/api/admin/webinars/active', { token }),
          adminFetch('/api/admin/webinars', { token }),
          adminFetch('/api/admin/attendees?page=1&pageSize=1', { token }),
        ]);
        if (cancelled) return;
        setActive(activeRes.webinar);
        setWebinars(listRes.webinars || []);
        setPaidCount(attendeesRes.paidCount || 0);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          if (/Unauthorized/i.test(err.message)) logout();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, logout, setError]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={2.5}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }}
        gap={2}
      >
        {[
          ['Active webinar', active ? 'Live' : 'None'],
          ['Seats left', active ? `${active.seatsLeft} / ${active.seatsTotal}` : '—'],
          ['Price (USD)', active ? formatMoneyUsd(active.priceCents) : '—'],
          ['Paid orders', String(paidCount)],
        ].map(([label, value]) => (
          <OpsCard key={label}>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
            <Typography fontWeight={700} fontSize="1.35rem" mt={0.5} lineHeight={1.3}>
              {value}
            </Typography>
          </OpsCard>
        ))}
      </Box>

      <OpsCard>
        <Typography fontWeight={700} mb={1}>
          Pipeline
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {active
            ? `${active.title} · ${active.datetimeLabel || formatEst(active.startsAt)}`
            : 'No active webinar. Create one or viewers will join the waitlist.'}
        </Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <OpsButton component={Link} href={active ? '/sp-webinar-ops/active' : '/sp-webinar-ops/create'}>
            {active ? 'Manage active' : 'Create webinar'}
          </OpsButton>
          <OpsButton tone="secondary" component={Link} href="/sp-webinar-ops/attendees">
            View attendees
          </OpsButton>
          <OpsButton tone="secondary" component={Link} href="/sp-webinar-ops/waitlist">
            View waitlist
          </OpsButton>
        </Stack>
      </OpsCard>

      <OpsCard>
        <Typography fontWeight={700} mb={1}>
          All webinar events ({webinars.length})
        </Typography>
        {webinars.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No webinars in the database.
          </Typography>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #D8E1F4' }}>
                  <th style={{ padding: 10 }}>Title</th>
                  <th style={{ padding: 10 }}>Starts (EST)</th>
                  <th style={{ padding: 10 }}>Price</th>
                  <th style={{ padding: 10 }}>Seats</th>
                  <th style={{ padding: 10 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {webinars.map((w) => (
                  <tr key={w.id} style={{ borderBottom: '1px solid #EEF2F8' }}>
                    <td style={{ padding: 10 }}>{w.title}</td>
                    <td style={{ padding: 10 }}>{formatEst(w.startsAt)}</td>
                    <td style={{ padding: 10 }}>{formatMoneyUsd(w.priceCents)}</td>
                    <td style={{ padding: 10 }}>
                      {w.seatsLeft}/{w.seatsTotal}
                    </td>
                    <td style={{ padding: 10 }}>
                      <Chip
                        size="small"
                        label={w.active ? 'Active' : 'Inactive'}
                        color={w.active ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </OpsCard>
    </Stack>
  );
}
