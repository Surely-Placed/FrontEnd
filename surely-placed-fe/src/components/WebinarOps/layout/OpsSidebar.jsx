'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import { NAV_ITEMS, SIDEBAR_COLLAPSED, SIDEBAR_WIDTH } from '../constants';

const navBtnSx = (expanded, active) => ({
  justifyContent: expanded ? 'flex-start' : 'center',
  textTransform: 'none',
  fontFamily: 'Inter, Arial, sans-serif',
  fontWeight: active ? 700 : 500,
  fontSize: '0.9375rem',
  lineHeight: 1.5,
  letterSpacing: 0,
  minHeight: 44,
  height: 'auto',
  overflow: 'visible',
  color: active ? '#fff' : 'rgba(255,255,255,0.78)',
  bgcolor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
  borderRadius: '8px',
  px: expanded ? 1.5 : 0.75,
  py: 1,
  whiteSpace: 'nowrap',
  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' },
});

function NavBody({ expanded, zoomOk, onLogout, onNavigate }) {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: expanded ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0F1C3F',
        color: '#fff',
        px: expanded ? 2 : 1,
        py: 2.5,
        transition: 'width 0.2s ease',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Box mb={expanded ? 0.5 : 2} textAlign={expanded ? 'left' : 'center'}>
        <Typography
          fontFamily="Inter, Arial, sans-serif"
          fontWeight={700}
          fontSize={expanded ? '1.05rem' : '0.85rem'}
          lineHeight={1.4}
          sx={{ overflow: 'visible' }}
        >
          {expanded ? 'Surely Placed' : 'SP'}
        </Typography>
      </Box>
      {expanded && (
        <Typography
          variant="caption"
          fontFamily="Inter, Arial, sans-serif"
          sx={{ color: 'rgba(255,255,255,0.55)', mb: 3, lineHeight: 1.5, display: 'block' }}
        >
          Webinar Ops · EST · USD
        </Typography>
      )}

      <Box component="nav" sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === '/sp-webinar-ops'
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              title={item.label}
              onClick={onNavigate}
              fullWidth
              sx={navBtnSx(expanded, active)}
            >
              {expanded ? item.label : item.short}
            </Button>
          );
        })}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 2 }} />
      {expanded && (
        <Chip
          size="small"
          label={zoomOk ? 'Zoom ready' : 'Zoom OAuth missing'}
          sx={{
            mb: 1.5,
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            bgcolor: zoomOk ? 'rgba(46, 160, 100, 0.2)' : 'rgba(245, 158, 11, 0.2)',
            color: zoomOk ? '#86EFAC' : '#FCD34D',
            border: 'none',
            height: 'auto',
            '& .MuiChip-label': {
              py: 0.75,
              px: 0.5,
              lineHeight: 1.4,
              whiteSpace: 'normal',
              overflow: 'visible',
              fontFamily: 'Inter, Arial, sans-serif',
            },
          }}
        />
      )}
      <Button
        onClick={onLogout}
        fullWidth
        title="Log out"
        sx={{
          ...navBtnSx(expanded, false),
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
        }}
      >
        {expanded ? 'Log out' : 'Exit'}
      </Button>
    </Box>
  );
}

export default function OpsSidebar({ open, zoomOk, onLogout, mobileOpen, onCloseMobile }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const expanded = isMobile ? true : open;
  const width = expanded ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED;

  if (isMobile) {
    return (
      <Drawer open={mobileOpen} onClose={onCloseMobile} ModalProps={{ keepMounted: true }}>
        <NavBody expanded zoomOk={zoomOk} onLogout={onLogout} onNavigate={onCloseMobile} />
      </Drawer>
    );
  }

  return (
    <Box
      component="aside"
      sx={{
        width,
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        transition: 'width 0.2s ease',
      }}
    >
      <NavBody expanded={expanded} zoomOk={zoomOk} onLogout={onLogout} />
    </Box>
  );
}
