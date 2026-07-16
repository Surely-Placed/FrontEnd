'use client';

import { Button } from '@mui/material';

const btnBase = {
  textTransform: 'none',
  fontWeight: 600,
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: '0.9375rem',
  lineHeight: 1.5,
  letterSpacing: 0,
  overflow: 'visible',
  minHeight: 44,
  height: 'auto',
  px: 2.25,
  py: 1.125,
  borderRadius: '0.75rem',
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  '& .MuiButton-label, &': {
    overflow: 'visible',
  },
  '&:hover': { boxShadow: 'none' },
};

const tones = {
  primary: {
    ...btnBase,
    bgcolor: '#2857C4',
    color: '#FFFFFF',
    border: '1px solid #2857C4',
    '&:hover': { bgcolor: '#1E46A8', color: '#FFFFFF', boxShadow: 'none' },
    '&.Mui-disabled': { bgcolor: '#9E9E9E', color: '#FFFFFF', borderColor: '#9E9E9E' },
  },
  secondary: {
    ...btnBase,
    bgcolor: '#FFFFFF',
    color: '#2857C4',
    border: '1px solid #2857C4',
    '&:hover': { bgcolor: '#EEF3FC', color: '#2857C4', boxShadow: 'none' },
  },
  danger: {
    ...btnBase,
    bgcolor: '#FFFFFF',
    color: '#C62828',
    border: '1px solid #C62828',
    '&:hover': { bgcolor: '#FFEBEE', color: '#C62828', boxShadow: 'none' },
  },
};

export default function OpsButton({ tone = 'primary', sx, children, ...rest }) {
  return (
    <Button variant="text" disableElevation sx={{ ...tones[tone], ...sx }} {...rest}>
      {children}
    </Button>
  );
}
