'use client';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Radio,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckedRadioButtonIcon,
  CorrectIcon,
  RadioButtonIcon,
  StepCheckIcon,
} from '../../../public/images';
import PersonalInfo from './PersonalInfo';
import ProfessionalBG from './ProfessionalBG';
import ResumeUpload from './ResumeUpload';
import Link from 'next/link';
import { personalInfoSchema } from '@/validationSchema/coach-form/personalInfo.schema';
import { professionalBgSchema } from '@/validationSchema/coach-form/professionalBg.schema';
import { resumeUploadSchema } from '@/validationSchema/coach-form/resumeUpload.schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues } from '../../../mockData/CoachForm';
import { CoachFormAPI } from '@/services/coach-form/api';

const combinedCoachFormSchema = personalInfoSchema
  .concat(professionalBgSchema)
  .concat(resumeUploadSchema);

const CoachForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [payload, setPayload] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState(null);
  const [cohorts, setCohorts] = useState(null);

  const steps = ['Personal Info', 'Professional Background', 'Resume Upload'];

  const currentSchema = useMemo(() => {
    switch (activeStep) {
      case 0:
        return personalInfoSchema;
      case 1:
        return professionalBgSchema;
      case 2:
        return combinedCoachFormSchema;
      default:
        return null;
    }
  }, [activeStep]);

  const formMethods = useForm({
    resolver: yupResolver(currentSchema),
    mode: 'onChange',
    defaultValues: payload,
  });

  const handleActiveStepComponent = () => {
    const commonProps = {
      setActiveStep,
      setPayload,
      payload,
      formMethods,
      setOpen,
      setLoading,
      domains,
      cohorts,
    };

    switch (activeStep) {
      case 0:
        return <PersonalInfo {...commonProps} />;
      case 1:
        return <ProfessionalBG {...commonProps} />;
      case 2:
        return <ResumeUpload {...commonProps} />;
      default:
        return null;
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setActiveStep(2);
  };

  const fetchDomainsOptions = async () => {
    try {
      const { data, variant } = await CoachFormAPI.fetchDomains();
      if (variant === 'success') {
        let domainOptions = data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setDomains(domainOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCohortsOptions = async () => {
    try {
      const { data, variant } = await CoachFormAPI.fetchCohorts();
      if (variant === 'success') {
        let cohortsOptions = data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setCohorts(cohortsOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDomainsOptions();
    fetchCohortsOptions();
  }, []);

  return (
    <Box p={{ xs: '4rem 1rem', sm: '4rem 2rem', md: '6rem 4rem', xl: '8rem 6rem' }}>
      <Box display={'flex'} justifyContent={'center'}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, i) => {
            const isCompleted = i < activeStep;

            return (
              <Step key={label} completed={isCompleted} sx={{ p: { xs: 0, sm: 0.5 } }}>
                <Button
                  sx={{
                    cursor: 'pointer',
                    padding: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  disableRipple
                  onClick={() => setActiveStep(i)}
                >
                  <StepLabel StepIconComponent={() => null}>
                    <Box
                      display="flex"
                      flexDirection={{ xs: 'column', sm: 'row' }}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      gap={{ xs: 0, sm: 1 }}
                    >
                      <Radio
                        checked={isCompleted || activeStep === i}
                        checkedIcon={isCompleted ? <StepCheckIcon /> : <CheckedRadioButtonIcon />}
                        icon={isCompleted ? <StepCheckIcon /> : <RadioButtonIcon />}
                        sx={{ padding: 0, margin: 0 }}
                      />
                      <Box display={'flex'} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                        <Typography
                          variant="subtitle1"
                          fontSize={{ xs: '0.75rem', sm: '1rem' }}
                          mt={0.5}
                          color={
                            isCompleted
                              ? 'text'
                              : activeStep === i
                                ? 'primary'
                                : 'primary.placeholder'
                          }
                          textTransform={'capitalize'}
                          fontWeight={isCompleted ? 700 : 400}
                          width={{ xs: 'unset', sm: 'min-content', md: 'unset' }}
                          sx={{ cursor: 'pointer', textAlign: 'left' }}
                        >
                          {label}
                        </Typography>
                        {i !== steps.length - 1 && (
                          <Divider
                            sx={{
                              width: { xs: '50px', md: '100px' },
                              backgroundColor: '#CFD6DC',
                              ml: 1,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </StepLabel>
                </Button>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box mt={10}>{handleActiveStepComponent()}</Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0,0,0,0.12)',
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: '0.625rem',
            width: { xs: '95%', md: '60%' },
            margin: 0,
            maxWidth: { xs: 'unset', sm: '600px' },
          },
        }}
      >
        <Box padding={{ xs: '2.75rem 1rem 1.5rem', sm: '3.375rem 1.25rem 2.125rem' }}>
          <DialogContent sx={{ p: 0 }}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <CorrectIcon />
              <Typography
                variant="subtitle1"
                fontWeight={'600'}
                fontFamily={'var(--font-avantgarde), sans-serif'}
                mt={4}
                mb={2}
                color="text"
              >
                You’re One Step Closer!
              </Typography>
              <Typography variant="body1" color="text.subText" textAlign={'center'} mb={2}>
                Our team will review your profile soon. You’ll hear from us once we match you with
                the right cohort and learners.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Link href={'/'} className="link-styles">
              <Button variant="filled" sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Go to Homepage
                </Typography>
              </Button>
            </Link>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CoachForm;
