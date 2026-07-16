'use client';

import { useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { adminFetch } from '../api';
import OpsButton from '../ui/OpsButton';
import OpsField from '../ui/OpsField';

export default function OpsLogin({ onLogin }) {
  const [email, setEmail] = useState('webinar@surelyplaced.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await adminFetch('/api/admin/login', {
        method: 'POST',
        body: { email, password },
      });
      onLogin(data.token);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F4F7FC' }}>
      <Box sx={{ bgcolor: '#0F1C3F', color: '#fff', px: 3, py: 2 }}>
        <Typography fontWeight={700}>Surely Placed · Webinar Ops</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          maxWidth: 420,
          mx: 'auto',
          mt: { xs: 8, md: 12 },
          p: 3.5,
          borderRadius: '12px',
          border: '1px solid #D8E1F4',
          bgcolor: '#fff',
          boxShadow: '0 8px 32px rgba(26, 86, 219, 0.08)',
        }}
      >
        <Typography fontFamily="var(--font-avantgarde), sans-serif" fontSize="1.75rem" fontWeight={600} mb={0.5}>
          Webinar Ops
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign in to manage webinars, seats, and waitlist.
        </Typography>
        <Stack spacing={2}>
          <OpsField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <OpsField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <OpsButton type="submit" disabled={loading} sx={{ fontWeight: 700, py: 1.25 }}>
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign in'}
          </OpsButton>
        </Stack>
      </Box>
    </Box>
  );
}
