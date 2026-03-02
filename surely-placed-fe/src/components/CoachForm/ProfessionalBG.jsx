import CustomRadioGroup from '@/common/CustomRadioGroup';
import CustomSelect from '@/common/CustomSelect';
import CustomTextField from '@/common/CustomTextField';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

const ProfessionalBG = ({ setActiveStep, setPayload, formMethods, domains, cohorts }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = (data) => {
    data.is_currently_working = data.is_currently_working === 'Yes' ? true : false;
    data.years_experience = parseInt(data.years_experience, 10);
    setPayload((prev) => ({
      ...prev,
      ...data,
    }));
    setActiveStep(2);
  };

  return (
    <Grid container justifyContent={'space-between'} spacing={{ xs: 3, md: 0 }}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography
          component={'h2'}
          variant="h4_light"
          fontSize={{ xs: '1.25rem', sm: '2rem', md: '1.45rem', lg: '2rem' }}
          color="text"
        >
          Professional Background 🚀
        </Typography>
        <Typography component={'p'} variant="body1" color="text.subText">
          If you’re not currently employed, please provide the details of your most recent job.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <CustomRadioGroup
          label={'Are you currently Working?'}
          control={control}
          name={'is_currently_working'}
          error={errors?.is_currently_working}
        />
        <CustomTextField
          name="current_role"
          control={control}
          label="Role"
          placeholder="Role"
          fullWidth
          error={errors?.current_role}
          marginBottom={'1rem'}
          marginTop={'1rem'}
        />
        <CustomTextField
          name="company"
          control={control}
          label="Company"
          placeholder="Company"
          fullWidth
          error={errors?.company}
          marginBottom={'1rem'}
        />
        <CustomTextField
          name="years_experience"
          control={control}
          label="Years of Experience"
          placeholder="2 years"
          fullWidth
          error={errors?.years_experience}
          marginBottom={'1rem'}
        />
        <CustomTextField
          name="work_email"
          control={control}
          label="If you're currently working , then current email if not last working email."
          placeholder="Enter Email"
          fullWidth
          marginBottom={'1rem'}
        />
        <CustomTextField
          name="linkedin_url"
          control={control}
          label="LinkedIn Profile / Portfolio Link"
          placeholder="k.p.allen@aol.com"
          fullWidth
          error={errors?.linkedin_url}
          marginBottom={'1rem'}
        />
        <CustomSelect
          name={'interests'}
          control={control}
          label="Domain Expertise (Tech, Design, Management, Aptitude, Communication, etc.)"
          placeholder="Domain Expertise"
          error={errors?.interests}
          options={domains}
          marginBottom="1.5rem"
          multiselect={true}
        />
        <CustomSelect
          name={'preferred_cohorts'}
          control={control}
          label="Preferred Cohorts to Coach (multi-select: Placement Prep, Mock Interviews, Aptitude, Soft Skills, Domain-specific, etc."
          placeholder="Preferred Cohorts to Coach"
          error={errors?.preferred_cohorts}
          options={cohorts}
          multiselect={true}
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

export default ProfessionalBG;
