'use client';
import React, { useCallback, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/validationSchema/auth/signup.schema';
import CustomTextField from '@/common/CustomTextField';
import TermsAndUse from '@/common/TermsAndUse';
import SetUpPasswordForm from '@/components/Auth/SetUpPasswordForm';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/loading/loading.reducer';
import { AuthManager } from '@/services/auth';
import { showToast } from '@/hooks/showToast';
import { useRouter } from 'next/navigation';
import { PAGE_URLS } from '../../../utils/constants';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => {
    setUserDetails({ name: data.name, email: data.email });
    setShowPasswordStep(true);
  };

  const handleFinalSubmit = useCallback(
    async (passwordPayload) => {
      const payload = { ...userDetails, ...passwordPayload };
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('signupPayload', JSON.stringify(payload));
        }
      } catch (_) {}
      dispatch(setLoading({ key: 'verifyEmail', value: true }));
      try {
        await AuthManager.verifyEmail({ email: userDetails.email }).then(
          ({ variant, msg = '' }) => {
            if (variant === 'success') {
              if (msg) showToast(msg, 'success');
              router.push(PAGE_URLS.VERIFY_EMAIL);
            } else {
              showToast(msg || 'Unable to verify email', 'error');
            }
          }
        );
      } finally {
        dispatch(setLoading({ key: 'verifyEmail', value: false }));
      }
    },
    [dispatch, userDetails, router]
  );
  return (
    <Box>
      {showPasswordStep ? (
        <SetUpPasswordForm
          onSubmit={handleFinalSubmit}
          loadingKey="signup"
          email={userDetails.email}
          onEditEmail={() => setShowPasswordStep(false)}
        />
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6_bold" color="text" lineHeight={'normal'}>
            Some personal Details
          </Typography>
          <Box mb={'1.5rem'} />
          <Stack spacing={'1.5rem'} sx={{ pb: { xs: '5.5rem', sm: 0 } }}>
            <CustomTextField
              name="name"
              control={control}
              label="Name*"
              placeholder="Enter Name"
              fullWidth
              error={errors.name}
            />
            <CustomTextField
              name="email"
              control={control}
              label="Email Address*"
              placeholder="Enter Email Address"
              fullWidth
              error={errors.email}
            />

            <Button
              type="submit"
              variant="filled"
              fullWidth
              sx={{
                mt: 1,
                color: '#fff',
                position: 'relative',
                height: 48,
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            >
              Set Password
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
                type="submit"
                variant="filled"
                fullWidth
                sx={{
                  color: '#fff',
                  height: 48,
                }}
              >
                Set password
              </Button>
            </Box>
            <TermsAndUse />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;
