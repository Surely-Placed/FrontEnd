'use client';
import { Box, Button, Grid, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomSelect from '@/common/CustomSelect';
import { CoachFormAPI } from '@/services/coach-form/api';

const FilterModal = ({ open, setOpen, anchorEl, fetchCohorts, searchParam, setFilters }) => {
  const [domains, setDomains] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      interests: '',
    },
  });

  const fetchDomainsOptions = async () => {
    try {
      const { data, variant } = await CoachFormAPI.fetchDomains();
      if (variant === 'success') {
        let domainOptions = data.map((item) => ({
          label: item.name,
          value: item.uuid,
        }));
        setDomains(domainOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    setFilters(data.interests)
    fetchCohorts(searchParam,data.interests)
    setOpen(false);
  };

  useEffect(() => {
    fetchDomainsOptions();
  }, []);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        width: '80%',
      }}
      PaperProps={{
        sx: {
          width: { md: '50%', lg: '40%', xl: '35%' },
          mt: 2,
          borderRadius: '1.25rem',
          boxShadow: '8px 12px 20px 0 rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box p={'1.25rem'} component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h7" component={'p'} color="text" mb={2}>
          Filters
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <CustomSelect
              name={'interests'}
              control={control}
              label="Domain Expertise"
              placeholder="Domain Expertise"
              options={domains}
              marginBottom="1.5rem"
              multiselect={true}
            />
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
          <Button variant="contained" onClick={() => reset()}>
            <Typography variant="subtitle2_bold" color="primary" mt={0.1}>
              Clear
            </Typography>
          </Button>
          <Button
            type="submit"
            variant="filled"
            sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}
          >
            <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
              Apply
            </Typography>
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default FilterModal;
