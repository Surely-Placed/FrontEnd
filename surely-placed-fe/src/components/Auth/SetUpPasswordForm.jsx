'use client';
import React from 'react';
import { Box, Button, Stack, Typography, CircularProgress, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextField from '@/common/CustomTextField';
import { setupPasswordSchema } from '@/validationSchema/auth/setupPassword.schema';
import TermsAndUse from '@/common/TermsAndUse';
import { EditIcon } from '../../../public/images';
import LoadingButton from '@/common/LoadingButton';

const SetUpPasswordForm = ({ onSubmit: onSubmitProp, email, onEditEmail }) => {
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
  
  const onSubmit = async (data) => {
    if (onSubmitProp) {
      await onSubmitProp(data);
      return;
    }
  };
  return (
    <Box>
      {email ? (
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={'0.5rem'}>
          <Typography variant="body1" color="text.subText">
            Email:{' '}
            <Typography component="span" color="text">
              {email}
            </Typography>
          </Typography>
          {onEditEmail ? (
            <IconButton aria-label="edit email" size="small" onClick={onEditEmail}>
              <EditIcon />
            </IconButton>
          ) : null}
        </Box>
      ) : null}
      <Typography variant="h6_bold" color="text" lineHeight={'normal'}>
        Set Up you Password
      </Typography>
      <Box mb={'1.5rem'} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={'1.5rem'} sx={{ pb: { xs: '5.5rem', sm: 0 } }}>
          <CustomTextField
            name="password"
            control={control}
            label="Password*"
            placeholder="Enter Password"
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

          <LoadingButton label="Sign Up" loadingKey="verifyEmail" type="submit" />
          <TermsAndUse />
        </Stack>
      </Box>
    </Box>
  );
};

export default SetUpPasswordForm;
