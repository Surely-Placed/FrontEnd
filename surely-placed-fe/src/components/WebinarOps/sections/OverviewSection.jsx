'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { showToast } from '@/hooks/showToast';
import { adminFetch } from '../api';
import { PAGE_SIZE } from '../constants';
import { useOps } from '../OpsContext';
import { formatEst, formatMoneyUsd } from '../format';
import ConfirmDialog from '../ui/ConfirmDialog';
import OpsButton from '../ui/OpsButton';
import OpsCard from '../ui/OpsCard';
import PaginationBar from '../ui/PaginationBar';

export default function OverviewSection() {
  const { token, logout, setError } = useOps();
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [active, setActive] = useState(null);
  const [webinars, setWebinars] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [paidCount, setPaidCount] = useState(0);

  const loadSummary = useCallback(async () => {
    const [activeRes, attendeesRes] = await Promise.all([
      adminFetch('/api/admin/webinars/active', { token }),
      adminFetch('/api/admin/attendees?page=1&pageSize=1', { token }),
    ]);
    setActive(activeRes.webinar);
    setPaidCount(attendeesRes.paidCount || 0);
  }, [token]);

  const loadWebinars = useCallback(
    async (nextPage = page) => {
      setListLoading(true);
      try {
        const qs = new URLSearchParams({
          page: String(nextPage),
          pageSize: String(PAGE_SIZE),
        });
        const listRes = await adminFetch(`/api/admin/webinars?${qs}`, { token });
        setWebinars(listRes.webinars || []);
        setPagination(listRes.pagination || null);
        setPage(listRes.pagination?.page || nextPage);
      } finally {
        setListLoading(false);
      }
    },
    [token, page]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        await Promise.all([loadSummary(), loadWebinars(1)]);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          showToast(err.message, 'error');
          if (/Unauthorized/i.test(err.message)) logout();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setError('');
    try {
      await adminFetch(`/api/admin/webinars/${pendingDelete.id}`, {
        token,
        method: 'DELETE',
      });
      showToast(`Deleted “${pendingDelete.title}”`, 'success');
      setPendingDelete(null);
      const nextPage =
        webinars.length === 1 && page > 1 ? page - 1 : page;
      await Promise.all([loadSummary(), loadWebinars(nextPage)]);
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
      if (/Unauthorized/i.test(err.message)) logout();
    } finally {
      setDeleting(false);
    }
  };

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mb={2}
          flexWrap="wrap"
        >
          <Typography fontWeight={700} lineHeight={1.3}>
            All webinar events
            {pagination?.total != null ? ` (${pagination.total})` : ''}
          </Typography>
          {listLoading && <CircularProgress size={18} />}
        </Stack>

        {webinars.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No webinars in the database.
          </Typography>
        ) : (
          <>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #D8E1F4' }}>
                    <th style={{ padding: 10 }}>Title</th>
                    <th style={{ padding: 10 }}>Starts (EST)</th>
                    <th style={{ padding: 10 }}>Price</th>
                    <th style={{ padding: 10 }}>Seats</th>
                    <th style={{ padding: 10 }}>Status</th>
                    <th style={{ padding: 10, textAlign: 'right' }}>Actions</th>
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
                      <td style={{ padding: 10, textAlign: 'right' }}>
                        <OpsButton
                          tone="danger"
                          size="small"
                          disabled={deleting}
                          onClick={() => setPendingDelete(w)}
                          sx={{ minHeight: 36, py: 0.75, px: 1.5 }}
                        >
                          Delete
                        </OpsButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
            <PaginationBar
              pagination={pagination}
              loading={listLoading || deleting}
              onPageChange={(p) => loadWebinars(p)}
            />
          </>
        )}
      </OpsCard>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete webinar?"
        description={
          pendingDelete
            ? `Delete ${pendingDelete.active ? 'the active' : 'this'} webinar “${pendingDelete.title}”? This removes it from the database and tries to delete the Zoom meeting.`
            : ''
        }
        confirmLabel="Delete webinar"
        loading={deleting}
        onClose={() => !deleting && setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
}
