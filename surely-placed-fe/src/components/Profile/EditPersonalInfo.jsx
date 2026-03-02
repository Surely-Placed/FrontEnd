'use client';
import CustomPhoneInputField from '@/common/CustomPhoneInputField';
import CustomTextField from '@/common/CustomTextField';
import { showToast } from '@/hooks/showToast';
import { ProfileManager } from '@/services/profile/api';
import { setUserData } from '@/store/user/user.reducer';
import { editPersonalInfoSchema } from '@/validationSchema/profile/editPersonalInfo.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const EditPersonalInfo = ({ user, setUser, setEditable, setLoading }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editPersonalInfoSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
    },
  });

  const onSubmit = async (data) => {
    let {first_name, last_name, ...payload} = data;
    payload = {
      ...payload,
      name: data.first_name + " " + data?.last_name,
    }
    try {
      setLoading(true);
      const { data, variant, msg } = await ProfileManager.patchUserDetails(user?.id, payload);
      if (variant === 'success') {
        if (data) {
          dispatch(setUserData(data));
        }
        setUser(data);
        handleClose();
      }
    } catch (error) {
      console.error(err);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEditable((prev) => ({
      ...prev,
      personalInfo: !prev.personalInfo,
    }));
  };

  return (
    <Grid container spacing={2} mt={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          name="first_name"
          control={control}
          label="First Name*"
          placeholder="Enter First Name"
          fullWidth
          error={errors?.first_name}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          name="last_name"
          control={control}
          label="Last Name"
          placeholder="Enter Last Name"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          name="email"
          control={control}
          label="Email Address"
          placeholder="Enter Email Address"
          fullWidth
          error={errors?.email}
          disabled={true}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomPhoneInputField
          name="mobile"
          control={control}
          label="Phone Number"
          placeholder="Enter Phone Number"
          type="text"
          inputTextColor="#fff"
          dd={true}
          error={errors?.mobile}
        />
      </Grid>
      <Grid size={12} display={'flex'} justifyContent={'flex-end'} gap={2}>
        <Button
          variant="contained"
          sx={{ mb: 2, width: { xs: '50%', md: 'unset' } }}
          onClick={handleClose}
        >
          <Typography variant="subtitle2_bold" color="primary" mt={0.25}>
            Cancel
          </Typography>
        </Button>
        <Button
          type="submit"
          variant="filled"
          sx={{
            bgcolor: 'primary.main',
            color: 'extremes.light',
            mb: 2,
            width: { xs: '50%', md: 'unset' },
          }}
        >
          <Typography variant="subtitle2_bold" color="extremes.light" mt={0.25}>
            Save
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditPersonalInfo;
