'use client';
import { Box, Typography, CircularProgress } from '@mui/material';
import { GoogleIcon } from '../../../public/images';
import { useGoogleLogin } from '@react-oauth/google';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AuthManager } from '@/services/auth';
import { setUserData } from '@/store/user/user.reducer';
import { showToast } from '@/hooks/showToast';
import { PAGE_URLS } from '../../../utils/constants';
import { consumeReturnUrl } from '@/hooks/useAuthRedirect';

const GoogleSignIn = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSuccess = useCallback(
    async (response) => {
      try {
        setIsLoading(true);
        const credential = response?.access_token;
        const payload = { access_token: credential };
        if (!credential) {
          showToast('Google login failed. Try again.', 'error');
          return;
        }
        const {
          variant,
          msg = '',
          profile,
          is_preference_saved,
        } = await AuthManager.googleLogin(payload);
        if (variant === 'success') {
          if (profile) dispatch(setUserData(profile));
          showToast(msg, 'success');
          // If preferences are not saved, take user to preferences first.
          if (!is_preference_saved) {
            router.push(PAGE_URLS.PREFERENCES);
            return;
          }
          // Preferences already saved: respect stored return URL if present, otherwise go home
          const returnUrl = consumeReturnUrl();
          if (returnUrl) {
            router.push(returnUrl);
          } else {
            router.push(PAGE_URLS.HOME);
          }
        } else {
          showToast(msg, 'error');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, router]
  );

  const onError = useCallback(() => {
    showToast('Google login was cancelled or failed', 'error');
  }, []);

  const login = useGoogleLogin({
    onSuccess,
    onError,
    flow: 'implicit',
  });

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={'1rem'}
      sx={{
        mt: '2rem',
        borderRadius: '0.625rem',
        background: '#fff',
        boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.08), 0 2px 3px 0 rgba(0, 0, 0, 0.17)',
        cursor: 'pointer',
        p: { xs: '0.9375rem 6rem', sm: '0.9375rem 9.9375rem', md: '0.9375rem 9.9375rem' },
      }}
      onClick={() => !isLoading && login()}
    >
      <GoogleIcon />
      <Typography
        fontFamily={'var(--font-nexa), Arial, sans-serif'}
        fontSize={{ xs: '0.875rem', md: '1rem' }}
        fontWeight={400}
        color="text.subText"
        lineHeight={'normal'}
      >
        {isLoading ? 'Signing in…' : text}
      </Typography>
      {isLoading && <CircularProgress size={18} sx={{ ml: 'auto' }} />}
    </Box>
  );
};

export default GoogleSignIn;
