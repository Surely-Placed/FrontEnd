'use client';
import { showToast } from '@/hooks/showToast';
import { ProfileManager } from '@/services/profile/api';
import { setUserData } from '@/store/user/user.reducer';
import { Button, Chip, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const EditPreferences = ({ user, setUser, setEditable, setLoading, preferences, domains }) => {
  const [selectedDomains, setSelectedDomains] = useState(preferences);
  const dispatch = useDispatch()

  const onSubmit = async () => {
    const selectedDomainIds = domains
      ?.filter((domain) => selectedDomains.includes(domain?.name))
      .map((domain) => domain?.uuid);

    const payload = {
      interests: selectedDomainIds,
    };

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
      console.error(error);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleDomain = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((item) => item !== domain) : [...prev, domain]
    );
  };

  const handleClose = () => {
    setEditable((prev) => ({
      ...prev,
      preferences: !prev.preferences,
    }));
  };

  return (
    <Grid
      container
      spacing={2}
      mt={2}
      component={'form'}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <Grid size={12} display={'flex'} gap={1} flexWrap={'wrap'}>
        {domains?.map((domain, i) => {
          const selected = selectedDomains.includes(domain?.name);
          return (
            <Chip
              key={domain?.id}
              label={domain?.name}
              clickable
              onClick={() => toggleDomain(domain?.name)}
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
      </Grid>
      <Grid size={12} display={'flex'} justifyContent={'flex-end'} gap={2} mt={{ xs: 2, md: 0 }}>
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

export default EditPreferences;
