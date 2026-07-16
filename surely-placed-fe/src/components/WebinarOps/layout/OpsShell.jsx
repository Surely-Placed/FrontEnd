'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, CircularProgress, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { adminFetch } from '../api';
import { NAV_ITEMS } from '../constants';
import useOpsAuth from '../hooks/useOpsAuth';
import { OpsProvider } from '../OpsContext';
import OpsButton from '../ui/OpsButton';
import OpsLogin from './OpsLogin';
import OpsSidebar from './OpsSidebar';

function titleForPath(pathname) {
  const match = NAV_ITEMS.find((n) =>
    n.href === '/sp-webinar-ops' ? pathname === n.href : pathname.startsWith(n.href)
  );
  return match?.label || 'Webinar Ops';
}

export default function OpsShell({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { token, ready, login, logout, isAuthenticated } = useOpsAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [zoomOk, setZoomOk] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    adminFetch('/api/admin/me', { token })
      .then((me) => setZoomOk(Boolean(me.zoomConfigured)))
      .catch((err) => {
        if (/Unauthorized/i.test(err.message)) logout();
      });
  }, [token, logout]);

  useEffect(() => {
    setMessage('');
    setError('');
  }, [pathname]);

  const ctx = useMemo(
    () => ({
      token,
      logout,
      zoomOk,
      message,
      error,
      setMessage,
      setError,
    }),
    [token, logout, zoomOk, message, error]
  );

  if (!ready) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F4F7FC">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <OpsLogin onLogin={login} />;
  }

  return (
    <OpsProvider value={ctx}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F7FC' }}>
        <OpsSidebar
          open={sidebarOpen}
          zoomOk={zoomOk}
          onLogout={logout}
          mobileOpen={mobileNav}
          onCloseMobile={() => setMobileNav(false)}
        />

        <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 5,
              bgcolor: 'rgba(244,247,252,0.92)',
              backdropFilter: 'blur(8px)',
              borderBottom: '1px solid #D8E1F4',
              px: { xs: 2, md: 3.5 },
              py: 1.75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <IconButton
                onClick={() => (isMobile ? setMobileNav(true) : setSidebarOpen((v) => !v))}
                edge="start"
                aria-label="Toggle navigation"
                sx={{
                  border: '1px solid #D8E1F4',
                  borderRadius: '8px',
                  bgcolor: '#fff',
                  width: 40,
                  height: 40,
                }}
              >
                <Box component="span" sx={{ fontSize: 18, lineHeight: 1, color: '#0F1C3F' }}>
                  ☰
                </Box>
              </IconButton>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  fontFamily="Inter, Arial, sans-serif"
                  fontWeight={700}
                  fontSize={{ xs: '1.15rem', md: '1.35rem' }}
                  lineHeight={1.35}
                  sx={{ overflow: 'visible' }}
                >
                  {titleForPath(pathname)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontFamily="Inter, Arial, sans-serif"
                  lineHeight={1.5}
                  display="block"
                >
                  Timezone EST · Currency USD
                </Typography>
              </Box>
            </Stack>
            <OpsButton tone="secondary" onClick={() => window.location.reload()}>
              Refresh
            </OpsButton>
          </Box>

          <Box
            sx={{
              px: { xs: 2, md: 3, lg: 4 },
              py: { xs: 2.5, md: 3 },
              width: '100%',
              maxWidth: 'none',
              boxSizing: 'border-box',
            }}
          >
            {message && (
              <Typography variant="body2" color="secondary.main" mb={2} fontFamily="Inter, Arial, sans-serif">
                {message}
              </Typography>
            )}
            {error && (
              <Typography variant="body2" color="error" mb={2} fontFamily="Inter, Arial, sans-serif">
                {error}
              </Typography>
            )}
            {children}
          </Box>
        </Box>
      </Box>
    </OpsProvider>
  );
}
