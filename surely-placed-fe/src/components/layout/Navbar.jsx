'use client';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CloseIcon, LogoutIcon, MoreIcon, SupportIcon, WebLogo } from '../../../public/images';
import { navLinks } from '../../../mockData/navbar';
import Link from 'next/link';
import CustomDivider from '@/common/CustomDivider';
import { logoutAction, selectUserData } from '@/store/user/user.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthToken, removeRefreshToken, getAuthToken } from '@/hooks/CookiesUtils';
import { useRouter } from 'next/navigation';
import { showToast } from '@/hooks/showToast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.classList.add('no-doc-scroll');
    } else {
      document.body.classList.remove('no-doc-scroll');
    }
    return () => document.body.classList.remove('no-doc-scroll');
  }, [open]);

  useEffect(() => {
    // If auth cookie is gone but we still have user data (persisted), clear it
    const token = getAuthToken();
    if (!token && userData) {
      dispatch(logoutAction());
    }

    const handleFocus = () => {
      const t = getAuthToken();
      if (!t && userData) {
        dispatch(logoutAction());
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleFocus);
      // Also periodically check in case focus doesn't change
      const interval = setInterval(handleFocus, 60 * 1000);
      return () => {
        window.removeEventListener('focus', handleFocus);
        clearInterval(interval);
      };
    }
  }, [dispatch, userData]);

  const handleLogout = () => {
    // clear tokens and persisted user
    removeAuthToken();
    removeRefreshToken();
    dispatch(logoutAction());
    // Close any menus/overlays
    setMenuAnchor(null);
    setOpen(false);
    showToast('Logged out successfully', 'success');
    // redirect to home
    router.push('/');
  };

  return (
    <Box
      p={{ xs: '1.125rem', lg: '1.125rem 6.25rem' }}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      position={'fixed'}
      top={0}
      width={'100%'}
      maxWidth={'1650px'}
      sx={{ backgroundColor: '#fff', transform: 'translateZ(0)' }}
      zIndex={2}
    >
      {!open && (
        <Link href={'/'}>
          <WebLogo />
        </Link>
      )}
      <Box display={{ xs: 'none', lg: 'flex' }} gap={5}>
        {navLinks.map((item, i) => (
          <Link key={i} href={item.link} style={{ textDecoration: 'none' }}>
            <Typography component={'p'} variant="subtitle1" color="text.contrastText">
              {item.text}
            </Typography>
          </Link>
        ))}
      </Box>
      {!open && (
        <Box display={{ lg: 'none' }}>
          <IconButton onClick={() => setOpen(true)}>
            <MoreIcon />
          </IconButton>
        </Box>
      )}
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100vh"
        zIndex={0} // lower than the menu
        sx={{
          display: open ? 'block' : 'none',
          backgroundColor: 'rgba(0,0,0,0.5)',
          transform: open ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={() => setOpen(false)}
      />
      <Box
        position="fixed"
        top={0}
        left={0}
        width={'100%'}
        zIndex={1}
        p={'1rem'}
        display={{ lg: 'none' }}
        sx={{
          opacity: open ? 1 : 0,
          transform: open ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <Box borderRadius={'0.875rem'} p={2} sx={{ backgroundColor: 'customGray.light' }}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Link href={'/'} onClick={() => setOpen(false)}>
              <WebLogo />
            </Link>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {userData ? (
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              mt={'1.875rem'}
              mb={'2rem'}
              onClick={() => setOpen(false)}
            >
              <Link href={'/profile?tabValue=0'} className="link-styles">
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <Avatar
                    src={userData?.student_details?.image}
                    sx={{ width: '3rem', height: '3rem' }}
                  />
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant="subtitle1" color="text.subText">
                      Hi, Welcome
                    </Typography>
                    <Typography fontSize={'1.5rem'} fontWeight={400} color="text">
                      {userData?.full_name || userData?.name || userData?.email}
                    </Typography>
                  </Box>
                </Box>
              </Link>
              <Box
                sx={{ cursor: 'pointer', borderRadius: '0.75rem', border: '1px solid #A5A5A5' }}
                p={'0.5rem'}
              >
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <CustomDivider text={'Find What You Need'} />
          )}
          <Box display={'flex'} flexDirection={'column'} gap={3} my={3}>
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                style={{ textDecoration: 'none' }}
                onClick={() => setOpen(false)}
              >
                <Typography component={'p'} variant="h4" fontWeight={400} color="text">
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
          <Box display={'flex'} gap={1}>
            {/* {!userData && (
              <Link href={'/login'} className="link-styles" style={{ width: '50%' }}>
                <Button
                  variant="contained"
                  sx={{ mb: 2, width: '100%' }}
                  onClick={() => setOpen(false)}
                >
                  <Typography variant="subtitle2_bold" color="primary" mt={0.1}>
                    Login
                  </Typography>
                </Button>
              </Link>
            )} */}
            <Link href={'/book-a-call'} className="link-styles" style={{ width: '50%' }}>
              <Button
                variant="filled"
                sx={{ bgcolor: 'primary.main', color: 'extremes.light', mb: 2, width: '100%' }}
                onClick={() => setOpen(false)}
              >
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Book a Call
                </Typography>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box display={{ xs: 'none', lg: 'flex' }} alignItems={'center'} gap={2}>
        {userData ? (
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Link href={'/profile?tabValue=1'} className="link-styles">
              <Button
                variant="filled"
                sx={{ bgcolor: 'primary.main', color: 'extremes.light', textTransform: 'none' }}
              >
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Find my cohort
                </Typography>
              </Button>
            </Link>
            <Link href={'/profile?tabValue=2'} className="link-styles flex">
              <SupportIcon fill={'#E9EEF9'} color={'#2857C4'} width={40} height={40} />
            </Link>
            <Link href={'/profile?tabValue=0'} className="link-styles">
              <Avatar
                src={userData?.student?.image || userData?.student_details?.image}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Link>
          </Box>
        ) : (
          <>
            {/* <Link href={'/login'} className="link-styles">
              <Button variant="contained">
                <Typography variant="subtitle2_bold" color="primary" mt={0.1}>
                  Login
                </Typography>
              </Button>
            </Link> */}
            <Link href={'/book-a-call'} className="link-styles">
              <Button variant="filled" sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Book a Call
                </Typography>
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
