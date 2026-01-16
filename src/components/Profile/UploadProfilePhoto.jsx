import MediaUpload from '@/common/MediaUpload';
import { ProfileManager } from '@/services/profile/api';
import { setUserData } from '@/store/user/user.reducer';
import { uploadProfile } from '@/validationSchema/profile/uploadProfile.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const UploadProfilePhoto = ({ user, setUser, setEditable, setLoading }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(uploadProfile),
    defaultValues: {
      image: '',
    },
  });

  const handleClose = () => {
    setEditable((prev) => ({
      ...prev,
      profile: !prev.profile,
    }));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('student.image', data.image);

    try {
      setLoading(true);
      const { data, variant, msg } = await ProfileManager.patchUserProfileImg(user?.id, formData);
      if (variant === 'success') {
        if (data) {
          dispatch(setUserData(data));
        }
        setUser(data);
        handleClose();
      }
    } catch (error) {
      console.error(error);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <MediaUpload
        control={control}
        label={'Upload Profile Photo'}
        name={'image'}
        error={errors?.image}
        type="image"
        acceptedType=".jpg,.jpeg,.png,.webp"
      />
      <Box display={'flex'} gap={2} mt={2} justifyContent={'flex-end'}>
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
      </Box>
    </Box>
  );
};

export default UploadProfilePhoto;
