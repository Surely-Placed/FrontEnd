'use client';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FilterIcon } from '../../../public/images';
import CommonCardItem from '@/common/CommonCardItem';
import { HomeManager } from '@/services/home/api';
import FilterModal from './FilterModal';
import { debounce } from 'lodash';

const AllCohorts = () => {
  const [allCohorts, setAllCohorts] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParam, setSearchParam] = useState('');
  const [filters, setFilters] = useState([]);
  const filterRef = useRef(null);
  const didFetchRef = useRef(false);

  const handleOpen = () => {
    setAnchorEl(filterRef.current);
    setOpen(true);
  };

  const fetchCohorts = async (search = '', interest_uuid = []) => {
    try {
      const query = {};
      if (search) query.search = search;
      if (Array.isArray(interest_uuid) && interest_uuid.length > 0) {
        query.interest_uuid = interest_uuid.join(',');
      }
      const res = await HomeManager.getCohorts(query);
      const dataArray = Array.isArray(res?.data) ? res.data : [];
      setAllCohorts(dataArray);
    } catch (error) {
      console.error('Error fetching cohorts:', error);
    }
  };

  const debouncedFetch = useMemo(
    () =>
      debounce((searchValue, currentFilters) => {
        const interestUUIDs = Array.isArray(currentFilters) ? currentFilters : [];
        fetchCohorts(searchValue, interestUUIDs);
      }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchParam(value);
    debouncedFetch(value, filters);
  };

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    (async () => {
      const cohorts = await HomeManager.getCohorts();
      const dataArray = Array.isArray(cohorts?.data) ? cohorts?.data : [];
      setAllCohorts(dataArray);
    })();
  }, []);

  return (
    <Box px={{ xs: '1.5rem', sm: '3rem', md: '5rem' }} mb={14}>
      <Grid container spacing={2} mb={9}>
        <Grid size={{ xs: 10, sm: 11, lg: 11.25, xl: 11.5 }}>
          <TextField
            placeholder="Search"
            onChange={(e) => handleChange(e)}
            sx={{
              width: '100%',
              '& .MuiInputBase-input.MuiOutlinedInput-input': {
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
              },
              '& .MuiInputBase-input::placeholder': {
                fontSize: '0.875rem',
                padding: '0.75rem 0',
                color: 'text.placeholder',
                opacity: 1,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '12px',
                  border: '1px solid #D6D6D6',
                },
                '&:hover fieldset': {
                  border: '1px solid #D6D6D6',
                },

                '&.Mui-focused fieldset': {
                  border: '1px solid #D6D6D6',
                },
              },
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 2, sm: 1, lg: 0.75, xl: 0.5 }}
          borderRadius={'0.75rem'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            backgroundColor: 'customBlue.secondary',
          }}
        >
          <IconButton ref={filterRef} onClick={handleOpen} aria-label="Open cohort filters">
            <FilterIcon />
          </IconButton>
          <FilterModal
            open={open}
            setOpen={setOpen}
            anchorEl={anchorEl}
            fetchCohorts={fetchCohorts}
            searchParam={searchParam}
            setFilters={setFilters}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {allCohorts.length === 0 ? (
          <Grid size={12}>
            <Typography component={'p'} color="text.subText" textAlign={'center'}>
              No Cohorts available.
            </Typography>
          </Grid>
        ) : (
          allCohorts.map((item, i) => (
            <Grid
              key={i}
              size={{ xs: 12, md: 6, lg: 4 }}
              display={{ xs: i < 5 ? 'block' : 'none', md: i < 6 ? 'block' : 'none', lg: 'block' }}
            >
              <CommonCardItem
                uuid={item?.uuid}
                img={item?.image}
                job={item?.name}
                points={item?.cohort_description}
                ratings={item?.rating}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default AllCohorts;
