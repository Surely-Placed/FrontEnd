'use client';
import React, { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextField from '@/common/CustomTextField';
import { setupPasswordSchema } from '@/validationSchema/auth/setupPassword.schema';
import LoadingButton from '@/common/LoadingButton';
import { useDispatch } from 'react-redux';
import { AuthManager } from '@/services/auth';
import { setLoading } from '@/store/loading/loading.reducer';
import { showToast } from '@/hooks/showToast';
import { useSearchParams, useRouter } from 'next/navigation';

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(setupPasswordSchema),
    defaultValues: {
      password: '',
      password_confirm: '',
    },
  });
  const dispatch = useDispatch();
  const token = searchParams?.get('token');
  const uuid = searchParams?.get('uuid');

  useEffect(() => {
    if (!token || !uuid) {
      showToast('No token found', 'error');
    }
  }, [token, uuid]);

  const onSubmit = async (data) => {
    if (!token || !uuid) {
      showToast('No token found', 'error');
      return;
    }
    dispatch(setLoading({ key: 'resetPassword', value: true }));

    try {
      await AuthManager.passwordVerify({ ...data, token, uuid }).then(({ variant, msg = '' }) => {
        if (variant === 'success') {
          showToast(msg, 'success');
          router.push('/login');
        } else {
          showToast(msg, 'error');
        }
      });
    } finally {
      dispatch(setLoading({ key: 'resetPassword', value: false }));
    }
  };
  return (
    <Box>
      <Box mb={'1.5rem'} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={'1.5rem'} sx={{ pb: { xs: '5.5rem', sm: 0 } }}>
          <CustomTextField
            name="password"
            control={control}
            label="New Password*"
            placeholder="Enter New Password"
            fullWidth
            type="password"
            error={errors.password}
            showPassword={true}
          />
          <CustomTextField
            name="password_confirm"
            control={control}
            label="Confirm Password*"
            placeholder="Enter Confirm Password"
            fullWidth
            type="password"
            error={errors.password_confirm}
            showPassword={true}
          />

          <LoadingButton label={'Reset Password'} loadingKey={'resetPassword'} type={'submit'} />
        </Stack>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
