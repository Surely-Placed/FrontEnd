'use client';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import MyCohorts from './MyCohorts';
import Support from './Support';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileResponsive from './ProfileResponsive';
import { logoutAction } from '@/store/user/user.reducer';
import { useDispatch } from 'react-redux';
import { removeAuthToken, removeRefreshToken } from '@/hooks/CookiesUtils';
import { showToast } from '@/hooks/showToast';

const ProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeAuthToken();
    removeRefreshToken();
    dispatch(logoutAction());
    showToast('Logged out successfully', 'success');
    router.push('/');
  };

  const initialTab = Number(searchParams.get('tabValue')) || 0;
  const [activeEle, setActiveEle] = useState(initialTab);

  const handleTabChange = (index) => {
    setActiveEle(index);

    const params = new URLSearchParams(searchParams);
    params.set('tabValue', index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const tabValue = Number(searchParams.get('tabValue'));
    if (!isNaN(tabValue) && tabValue !== activeEle) {
      setActiveEle(tabValue);
    }
  }, [searchParams]);

  const handleToggle = () => {
    switch (activeEle) {
      case 0:
        return <Profile />;
      case 1:
        return <MyCohorts />;
      case 2:
        return <Support />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Grid
        container
        justifyContent={'space-between'}
        p={'14rem 10rem 8rem'}
        display={{ xs: 'none', lg: 'flex' }}
      >
        <Grid size={{ xs: 12, lg: 2.5 }}>
          <Sidebar
            activeEle={activeEle}
            handleTabChange={handleTabChange}
            handleLogout={handleLogout}
          />
        </Grid>
        <Grid size={8.5}>{handleToggle()}</Grid>
      </Grid>
      <Box p={{ xs: '6rem 1.25rem', sm: '6rem 2rem' }} display={{ xs: 'block', lg: 'none' }}>
        <ProfileResponsive activeEle={activeEle} setActiveEle={setActiveEle} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
