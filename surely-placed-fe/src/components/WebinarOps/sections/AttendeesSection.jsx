'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { adminFetch } from '../api';
import { PAGE_SIZE } from '../constants';
import { useOps } from '../OpsContext';
import { formatEst, formatMoneyUsd } from '../format';
import OpsCard from '../ui/OpsCard';
import OpsSelect from '../ui/OpsSelect';
import PaginationBar from '../ui/PaginationBar';
import StatusChip from '../ui/StatusChip';

export default function AttendeesSection() {
  const { token, logout, setError } = useOps();
  const [loading, setLoading] = useState(true);
  const [attendees, setAttendees] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('all');
  const [paidCount, setPaidCount] = useState(0);
  const [seats, setSeats] = useState({ left: null, total: null });

  const loadSeats = useCallback(async () => {
    try {
      const res = await adminFetch('/api/admin/webinars/active', { token });
      const w = res.webinar;
      if (w) {
        setSeats({ left: w.seatsLeft, total: w.seatsTotal });
      } else {
        setSeats({ left: null, total: null });
      }
    } catch {
      /* keep last */
    }
  }, [token]);

  const load = useCallback(
    async (nextPage = page) => {
      setLoading(true);
      try {
        const qs = new URLSearchParams({
          page: String(nextPage),
          pageSize: String(PAGE_SIZE),
        });
        if (status && status !== 'all') qs.set('status', status);
        const data = await adminFetch(`/api/admin/attendees?${qs}`, { token });
        setAttendees(data.attendees || []);
        setPagination(data.pagination);
        setPaidCount(data.paidCount || 0);
        setPage(data.pagination?.page || nextPage);
      } catch (err) {
        setError(err.message);
        if (/Unauthorized/i.test(err.message)) logout();
        setAttendees([]);
      } finally {
        setLoading(false);
      }
    },
    [token, page, status, logout, setError]
  );

  useEffect(() => {
    load(1);
    loadSeats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, status]);

  useEffect(() => {
    const timer = window.setInterval(loadSeats, 12_000);
    return () => window.clearInterval(timer);
  }, [loadSeats]);

  return (
    <OpsCard>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={2}
        flexWrap="wrap"
      >
        <Box>
          <Typography fontWeight={700} lineHeight={1.3}>
            Attendees & payments ({paidCount} paid)
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5} lineHeight={1.4}>
            {seats.total != null
              ? `Seats left ${seats.left} / ${seats.total} · live from backend`
              : 'No active webinar · seats unavailable'}
          </Typography>
        </Box>
        <OpsSelect
          id="attendee-status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'paid', label: 'Paid' },
            { value: 'created', label: 'Pending' },
          ]}
        />
      </Stack>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #D8E1F4' }}>
                  <th style={{ padding: 10 }}>Name</th>
                  <th style={{ padding: 10 }}>Email</th>
                  <th style={{ padding: 10 }}>Status</th>
                  <th style={{ padding: 10 }}>Amount (USD)</th>
                  <th style={{ padding: 10 }}>Zoom</th>
                  <th style={{ padding: 10 }}>Ordered (EST)</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((a) => (
                  <tr key={a.orderId} style={{ borderBottom: '1px solid #EEF2F8' }}>
                    <td style={{ padding: 10 }}>{a.customerName}</td>
                    <td style={{ padding: 10 }}>{a.customerEmail}</td>
                    <td style={{ padding: 10 }}>
                      <StatusChip status={a.status} />
                    </td>
                    <td style={{ padding: 10 }}>{formatMoneyUsd(a.amountMinor)}</td>
                    <td style={{ padding: 10 }}>
                      {a.zoom?.join_url ? 'Registered' : a.zoom?.error ? 'Failed' : '—'}
                    </td>
                    <td style={{ padding: 10 }}>{formatEst(a.orderedAt)}</td>
                  </tr>
                ))}
                {!attendees.length && (
                  <tr>
                    <td colSpan={6} style={{ padding: 16, color: '#737373' }}>
                      No orders for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
          <PaginationBar
            pagination={pagination}
            loading={loading}
            onPageChange={(p) => load(p)}
          />
        </>
      )}
    </OpsCard>
  );
}
