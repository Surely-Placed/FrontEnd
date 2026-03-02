'use client';
import { showToast } from '@/hooks/showToast';
import { ProfileManager } from '@/services/profile/api';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { EditIcon } from '../../../public/images';
import EditPersonalInfo from './EditPersonalInfo';
import EditPreferences from './EditPreferences';
import { CoachFormAPI } from '@/services/coach-form/api';
import UploadProfilePhoto from './UploadProfilePhoto';
import { selectUserData } from '@/store/user/user.reducer';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState(null);
  const userData = useSelector(selectUserData);
  const [editable, setEditable] = useState({
    profile: false,
    personalInfo: false,
    preferences: false,
  });

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const { data, variant } = await ProfileManager.fetchUserDetails();
      if (variant === 'success') {
        setUser(data);
      }
    } catch (error) {
      console.error(err);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchDomainsOptions = async () => {
    try {
      const { data, variant } = await CoachFormAPI.fetchDomains();
      if (variant === 'success') {
        // let domainOptions = data.map((item) => item.name);
        setDomains(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userDetails = [
    {
      label: 'First Name',
      value: userData?.first_name || user?.first_name,
    },
    {
      label: 'Last Name',
      value: userData?.last_name || user?.last_name,
    },
    {
      label: 'Email Address',
      value: userData?.email,
    },
    {
      label: 'Phone Number',
      value: userData?.mobile || user?.mobile || '-',
    },
  ];

  const preferences = userData?.preferences?.map((item) => item?.name);

  useEffect(() => {
    fetchUserDetails();
    fetchDomainsOptions();
  }, []);

  return (
    <Box>
      <Typography variant="h6_bold" color="text" display={{ xs: 'none', lg: 'block' }}>
        My Profile
      </Typography>
      {!editable?.profile ? (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          border={'1px solid #E2E2E2'}
          borderRadius={'1.25rem'}
          p={{ xs: '1rem', sm: '1.25rem' }}
          mt={{ xs: 0, lg: 3 }}
          mb={3}
        >
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Box
              width={{ xs: '60px', sm: '80px' }}
              height={{ xs: '60px', sm: '80px' }}
              position={'relative'}
              borderRadius={'50%'}
              overflow={'hidden'}
            >
              {userData?.student_details?.image || user?.student_details?.image ? (
                <Image
                  src={userData?.student_details?.image || user?.student_details?.image}
                  alt="avatar"
                  fill
                  unoptimized
                  className="cover"
                />
              ) : (
                <Avatar src={userData?.avatar} sx={{ width: '100%', height: '100%' }} />
              )}
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={0.5}>
              <Typography
                variant="subtitle1_bold"
                fontSize={{ xs: '0.875rem', sm: '1rem' }}
                color="text"
              >
                {userData?.first_name || user?.first_name} {userData?.last_name || user?.last_name}
              </Typography>
              <Typography
                variant="subtitle1"
                fontSize={{ xs: '0.875rem', sm: '1rem' }}
                color="text.subText"
              >
                {userData?.email}
              </Typography>
            </Box>
          </Box>
          <Box
            border={'1px solid #DCDCDC'}
            p={{ xs: '0.625rem', md: '0.625rem 0.875rem' }}
            borderRadius={{ xs: '50%', md: '2.5rem' }}
            display={'flex'}
            alignItems={'center'}
            gap={1}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setEditable((prev) => ({
                ...prev,
                profile: !prev.profile,
              }))
            }
          >
            <Typography
              variant="subtitle1"
              color="text.subText"
              mt={0.25}
              display={{ xs: 'none', md: 'inline-block' }}
            >
              Edit
            </Typography>
            <EditIcon />
          </Box>
        </Box>
      ) : (
        <Box
          border={'1px solid #E2E2E2'}
          borderRadius={'1.25rem'}
          p={{ xs: '1rem', sm: '1.25rem' }}
          mt={{ xs: 0, lg: 3 }}
          mb={3}
        >
          <UploadProfilePhoto
            setEditable={setEditable}
            setUser={setUser}
            setLoading={setLoading}
            user={userData}
          />
        </Box>
      )}

      <Box border={'1px solid #E2E2E2'} borderRadius={'1.25rem'} p={'1rem 1.25rem 1.25rem'} mb={3}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="subtitle1_bold" color="text">
            Personal Information
          </Typography>
          {!editable?.personalInfo && (
            <Box
              border={'1px solid #DCDCDC'}
              p={{ xs: '0.625rem', md: '0.625rem 0.875rem' }}
              borderRadius={{ xs: '50%', md: '2.5rem' }}
              display={'flex'}
              alignItems={'center'}
              gap={1}
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setEditable((prev) => ({
                  ...prev,
                  personalInfo: !prev.personalInfo,
                }))
              }
            >
              <Typography
                variant="subtitle1"
                color="text.subText"
                mt={0.25}
                display={{ xs: 'none', md: 'inline-block' }}
              >
                Edit
              </Typography>
              <EditIcon />
            </Box>
          )}
        </Box>
        {!editable?.personalInfo ? (
          <Grid container width={{ xs: '100%', md: '85%', xl: '75%' }} spacing={2} mt={2}>
            {userDetails.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Typography variant="body1" color="text.subText" mb={0.5}>
                  {item.label}
                </Typography>
                <Typography variant="subtitle1_bold" color="text">
                  {item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <EditPersonalInfo
            user={user}
            setUser={setUser}
            setEditable={setEditable}
            setLoading={setLoading}
          />
        )}
      </Box>
      <Box border={'1px solid #E2E2E2'} borderRadius={'1.25rem'} p={'1rem 1.25rem 1.25rem'} mb={3}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="subtitle1_bold" color="text">
            Your preferences
          </Typography>
          {!editable.preferences && (
            <Box
              border={'1px solid #DCDCDC'}
              p={{ xs: '0.625rem', md: '0.625rem 0.875rem' }}
              borderRadius={{ xs: '50%', md: '2.5rem' }}
              display={'flex'}
              alignItems={'center'}
              gap={1}
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setEditable((prev) => ({
                  ...prev,
                  preferences: !prev.preferences,
                }))
              }
            >
              <Typography
                variant="subtitle1"
                color="text.subText"
                mt={0.25}
                display={{ xs: 'none', md: 'inline-block' }}
              >
                Edit
              </Typography>
              <EditIcon />
            </Box>
          )}
        </Box>
        {!editable.preferences ? (
          <Grid container mt={2}>
            <Grid size={12}>
              <Typography variant="body1" color="text.subText" mb={0.5}>
                Your interests
              </Typography>
              <Typography variant="subtitle1_bold" color="text">
                {preferences?.join(', ')}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <EditPreferences
            user={userData}
            setUser={setUser}
            setEditable={setEditable}
            setLoading={setLoading}
            preferences={preferences}
            domains={domains}
          />
        )}
      </Box>
    </Box>
  );
};

export default Profile;
