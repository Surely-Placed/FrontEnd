import MediaUpload from '@/common/MediaUpload';
import { showToast } from '@/hooks/showToast';
import { CoachFormAPI } from '@/services/coach-form/api';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

const ResumeUpload = ({ setActiveStep, payload, setPayload, setOpen, setLoading, formMethods }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (data) => {
    const finalPayload = { ...payload, ...data };
    setPayload(finalPayload);
    const formData = new FormData();
    Object.entries(finalPayload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'cv' && value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      }
    });
    try {
      setLoading(true);
      const { variant, msg } = await CoachFormAPI.addCoach(formData);
      if (variant === 'success') {
        reset();
        showToast(msg, variant);
        setActiveStep(3);
        setOpen(true);
      } else {
        showToast(msg, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors) => {
    showToast('Please Fill all the required fields', 'error');
  };

  return (
    <Grid container justifyContent={'space-between'} spacing={{ xs: 3, md: 0 }}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography
          component={'h2'}
          variant="h4_light"
          color="text"
          fontSize={{ xs: '1.25rem', sm: '2rem', md: '1.45rem', lg: '2rem' }}
        >
          Upload Your Resume
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} component={'form'} onSubmit={handleSubmit(onSubmit, onError)}>
        <MediaUpload
          control={control}
          label={'Upload Resume / CV'}
          name={'cv'}
          error={errors?.cv}
          acceptedType=".pdf,.doc,.docx"
        />
        <Button
          type="submit"
          variant="filled"
          sx={{
            bgcolor: 'primary.main',
            color: 'extremes.light',
            width: '100%',
            mt: 6,
          }}
        >
          <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
            Submit
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ResumeUpload;
