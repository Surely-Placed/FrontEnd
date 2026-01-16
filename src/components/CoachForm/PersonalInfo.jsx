import CustomPhoneInputField from '@/common/CustomPhoneInputField';
import CustomTextField from '@/common/CustomTextField';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

const PersonalInfo = ({ setActiveStep, setPayload, formMethods }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = (data) => {
    const { name, ...filteredData } = data;
    let payload = {
      first_name: '',
      last_name: '',
      ...filteredData,
    };
    payload.first_name = data.name.split(' ')[0];
    payload.last_name = data.name.split(' ')[1];
    setPayload(payload);
    setActiveStep(1);
  };

  return (
    <Grid container justifyContent={'space-between'} spacing={{ xs: 3, md: 0 }}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography
          variant="h4_light"
          fontSize={{ xs: '1.25rem', sm: '2rem', md: '1.65rem', lg: '2rem' }}
          color="text"
        >
          Tell Us About You 👋
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <CustomTextField
          name="name"
          control={control}
          label="Name"
          placeholder="John Doe"
          fullWidth
          error={errors?.name}
          marginBottom={'1rem'}
        />
        <CustomTextField
          name="personal_email"
          control={control}
          label="Email Address"
          placeholder="k.p.allen@aol.com"
          fullWidth
          error={errors?.personal_email}
          marginBottom={'1rem'}
        />
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
            Next
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default PersonalInfo;
