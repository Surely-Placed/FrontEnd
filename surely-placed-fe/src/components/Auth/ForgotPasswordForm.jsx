'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextField from '@/common/CustomTextField';
import { forgotPasswordSchema } from '@/validationSchema/auth/forgotPassword.schema';
import LoadingButton from '@/common/LoadingButton';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/loading/loading.reducer';
import { AuthManager } from '@/services/auth';
import { showToast } from '@/hooks/showToast';

const ForgotPasswordForm = () => {
  const [isCooldown, setIsCooldown] = useState(false);
  const cooldownTimerRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const onSubmit = async (data) => {
    if (isCooldown) return;
    dispatch(setLoading({ key: 'forgotPassword', value: true }));

    try {
      await AuthManager.passwordRequest(data).then(({ variant, msg = '' }) => {
        if (variant === 'success') {
          showToast(msg, 'success');
          setIsCooldown(true);
          cooldownTimerRef.current = setTimeout(() => setIsCooldown(false), 30000);
        } else {
          showToast(msg, 'error');
        }
      });
    } finally {
      dispatch(setLoading({ key: 'forgotPassword', value: false }));
    }
  };
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
          <LoadingButton label="Send" loadingKey="forgotPassword" type="submit" disabled={isCooldown} />
        </Stack>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
