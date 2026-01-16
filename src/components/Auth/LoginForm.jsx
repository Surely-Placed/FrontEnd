'use client';
import React, { useCallback } from 'react';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextField from '@/common/CustomTextField';
import { loginSchema } from '@/validationSchema/auth/login.schema';
import CustomCheckbox from '@/common/CustomCheckbox';
import Link from 'next/link';
import Divider from '@/common/Divider';
import { PAGE_URLS } from '../../../utils/constants';
import { showToast } from '@/hooks/showToast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setLoading } from '@/store/loading/loading.reducer';
import { AuthManager } from '@/services/auth';
import { setUserData } from '@/store/user/user.reducer';
import LoginTerms from '@/common/LoginTerms';
import GoogleSignIn from '@/components/Auth/GoogleSignIn';
import LoadingButton from '@/common/LoadingButton';
import { consumeReturnUrl } from '@/hooks/useAuthRedirect';

const LoginForm = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = useCallback(
    async (data) => {
      dispatch(setLoading({ key: 'login', value: true }));
      try {
        await AuthManager.login(data).then(
          ({ variant, msg = '', profile, is_preference_saved }) => {
            if (variant === 'success') {
              dispatch(setUserData(profile));
              showToast(msg, 'success');
              // If preferences are not saved, take user to preferences first.
              // After preferences, we'll redirect to the stored return URL if any.
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
          }
        );
      } finally {
        dispatch(setLoading({ key: 'login', value: false }));
      }
    },
    [dispatch, router]
  );
  return (
    <Box>
      <Box mb={'1.5rem'} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={'1.5rem'} sx={{ pb: { xs: '5.5rem', sm: 0 } }}>
          <CustomTextField
            name="email"
            control={control}
            label="Email*"
            placeholder="Enter Email Address"
            fullWidth
            error={errors.email}
          />
          <CustomTextField
            name="password"
            control={control}
            label="Password*"
            placeholder="Enter Password"
            fullWidth
            error={errors.password}
            showPassword={true}
            type="password"
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CustomCheckbox
              control={control}
              error={errors.rememberMe}
              checked={!!watch('rememberMe')}
              onChange={(event, isChecked) => {
                setValue('rememberMe', !!isChecked, { shouldDirty: true, shouldTouch: true });
              }}
              name={'rememberMe'}
              label={'Remember Me'}
              marginLeft={'0rem'}
            />
            <Link
              href={'/forgot-password'}
              style={{
                color: '#2857C4',
                fontFamily: 'var(--font-nexa), Arial, sans-serif',
                fontSize: '0.875rem',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                textDecoration: 'none',
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <LoadingButton label="Login" loadingKey="login" type="submit" />
          <LoginTerms />

          <Divider />

          <GoogleSignIn text="Continue with Google" />
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginForm;
