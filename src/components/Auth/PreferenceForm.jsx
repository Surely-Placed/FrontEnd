'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Box, Stack, Typography, Chip } from '@mui/material';
import { showToast } from '@/hooks/showToast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/store/loading/loading.reducer';
import { useRouter } from 'next/navigation';
import { AuthManager } from '@/services/auth';
import { setUserData } from '@/store/user/user.reducer';
import { PAGE_URLS } from '../../../utils/constants';
import { consumeReturnUrl } from '@/hooks/useAuthRedirect';
import LoadingButton from '@/common/LoadingButton';

const PreferenceForm = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interests, setInterests] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const fetchInterest = async () => {
    try {
      const { variant, msg = '', data } = await AuthManager.getInterest();
      if (variant === 'success') {
        setInterests(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchInterest();
  }, []);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!selectedInterests || selectedInterests.length === 0) {
        showToast('Please select at least one interest', 'error');
        return false; // Stop execution completely
      }

      const payload = { interest_ids: selectedInterests.map((i) => i.id) };

      try {
        dispatch(setLoading({ key: 'interest', value: true }));

        const { variant, msg = '', user } = await AuthManager.userInterests(payload);

        if (variant === 'success') {
          showToast(msg || 'Preferences saved successfully', 'success');
          dispatch(setUserData(user));
          // After saving preferences, check for stored return URL first
          const returnUrl = consumeReturnUrl();
          if (returnUrl) {
            router.push(returnUrl);
          } else {
            router.push(PAGE_URLS.HOME);
          }
        } else {
          showToast(msg || 'Failed to save preferences', 'error');
        }
      } catch (err) {
        console.error('Error saving interests:', err);
        showToast('Failed to save preferences', 'error');
      } finally {
        dispatch(setLoading({ key: 'interest', value: false }));
      }
    },
    [dispatch, router, selectedInterests]
  );

  return (
    <Box>
      <Box mb={'1.5rem'} />
      <Typography variant="h6_bold" color="text" lineHeight={'normal'}>
        Your Interests
      </Typography>
      <Box mb={'1.5rem'} />

      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={'1.5rem'} sx={{ pb: { xs: '5.5rem', sm: 0 } }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: '0.75rem', sm: '1rem' },
              mt: '1rem',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              width: '100%',
            }}
          >
            {interests.map((interest) => {
              const selected = selectedInterests.includes(interest);
              return (
                <Chip
                  key={interest.id}
                  label={interest.name}
                  clickable
                  onClick={() => toggleInterest(interest)}
                  variant={selected ? 'filled' : 'outlined'}
                  sx={{
                    p: { xs: '1.25rem', sm: '1.5rem' },
                    borderRadius: '2.5rem',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: selected ? '#38BDB1' : '#DFDFDF',
                    bgcolor: selected ? '#E6FFFD' : '#fff',
                    color: '#1F1F1F',
                    '& .MuiChip-label': {
                      fontFamily: 'var(--font-nexa)',
                      fontWeight: 700,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      lineHeight: 'normal',
                    },
                    '&:hover': {
                      borderColor: '#38BDB1',
                      bgcolor: selected ? '#E6FFFD' : 'rgba(56,189,177,0.06)',
                    },
                  }}
                />
              );
            })}
          </Box>

          <LoadingButton label={'Submit'} loadingKey={'interest'} type={'submit'} />
        </Stack>
      </Box>
    </Box>
  );
};

export default PreferenceForm;
