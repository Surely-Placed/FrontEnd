import { Box, Typography } from '@mui/material';
import React from 'react';
import { sideBarLinks } from '../../../mockData/Profile';
import { LogoutIcon } from '../../../public/images';

const Sidebar = ({ activeEle, handleTabChange, handleLogout }) => {
  return (
    <Box
      borderRight={'1px solid #E2E2E2'}
      pr={3}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      minHeight={{ lg: '80vh', xxl: '40vh' }}
      height={'100%'}
    >
      <Box>
        {sideBarLinks.map((item, i) => {
          const IconComponent = item.icon;
          return (
            <Box
              key={i}
              display={'flex'}
              alignItems={'center'}
              gap={1}
              p={'0.875rem'}
              borderRadius={'2.5rem'}
              sx={{
                cursor: 'pointer',
                backgroundColor: activeEle === i ? 'customBlue.secondary' : 'extremes.light',
              }}
              onClick={() => handleTabChange(i)}
            >
              <IconComponent
                fill={activeEle === i ? '#fff' : '#F1F1F1'}
                color={activeEle === i ? '#2857C4' : '#737373'}
              />
              <Typography variant="subtitle1" color={activeEle === i ? 'primary' : 'text.subText'}>
                {item.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        p={'0.875rem'}
        display={'flex'}
        alignItems={'center'}
        gap={1}
        sx={{ cursor: 'pointer' }}
        onClick={handleLogout}
      >
        <LogoutIcon />
        <Typography variant="subtitle1" color="text">
          Log out
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
