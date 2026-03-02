import { Button, CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const LoadingButton = ({ label, loadingKey, ...props }) => {
  const isLoading = useSelector((state) => state.loading[loadingKey]);
  const isDisabled = isLoading || !!props.disabled;
  return (
    <>
      <Button
        variant="filled"
        fullWidth
        disabled={isDisabled}
        sx={{
          mt: 1,
          color: '#fff',
          position: 'relative',
          height: 48,
          display: { xs: 'none', sm: 'inline-flex' },
        }}
        {...props}
      >
        {isLoading ? (
          <CircularProgress
            size={24}
            sx={{
              color: '#fff',
            }}
          />
        ) : (
          label
        )}
      </Button>
      {/* Fixed bottom action bar for small screens */}
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: '#fff',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
          p: '0.75rem 1rem',
          pb: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)',
          zIndex: 2000,
        }}
      >
        <Button
          variant="filled"
          fullWidth
          disabled={isDisabled}
          sx={{
            color: '#fff',
            height: 48,
          }}
          {...props}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : label}
        </Button>
      </Box>
    </>
  );
};

export default LoadingButton;
