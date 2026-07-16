'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { adminFetch } from '../api';
import { PAGE_SIZE } from '../constants';
import { useOps } from '../OpsContext';
import { formatEst } from '../format';
import OpsCard from '../ui/OpsCard';
import PaginationBar from '../ui/PaginationBar';

export default function WaitlistSection() {
  const { token, logout, setError } = useOps();
  const [loading, setLoading] = useState(true);
  const [waitlist, setWaitlist] = useState([]);
  const [pagination, setPagination] = useState(null);

  const load = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const qs = new URLSearchParams({
          page: String(page),
          pageSize: String(PAGE_SIZE),
        });
        const data = await adminFetch(`/api/admin/waitlist?${qs}`, { token });
        setWaitlist(data.waitlist || []);
        setPagination(data.pagination);
      } catch (err) {
        setError(err.message);
        if (/Unauthorized/i.test(err.message)) logout();
        setWaitlist([]);
      } finally {
        setLoading(false);
      }
    },
    [token, logout, setError]
  );

  useEffect(() => {
    load(1);
  }, [load]);

  return (
    <OpsCard>
      <Typography fontWeight={700} mb={2}>
        Waitlist
      </Typography>
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
                  <th style={{ padding: 10 }}>Phone</th>
                  <th style={{ padding: 10 }}>Notified</th>
                  <th style={{ padding: 10 }}>Joined (EST)</th>
                </tr>
              </thead>
              <tbody>
                {waitlist.map((w) => (
                  <tr key={w.id} style={{ borderBottom: '1px solid #EEF2F8' }}>
                    <td style={{ padding: 10 }}>{w.name}</td>
                    <td style={{ padding: 10 }}>{w.email}</td>
                    <td style={{ padding: 10 }}>{w.contact || '—'}</td>
                    <td style={{ padding: 10 }}>{w.notifiedAt ? 'Yes' : 'Pending'}</td>
                    <td style={{ padding: 10 }}>{formatEst(w.createdAt)}</td>
                  </tr>
                ))}
                {!waitlist.length && (
                  <tr>
                    <td colSpan={5} style={{ padding: 16, color: '#737373' }}>
                      No waitlist signups yet.
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
