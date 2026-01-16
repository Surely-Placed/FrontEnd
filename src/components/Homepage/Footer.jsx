import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { WebLogo } from '../../../public/images';
import { navLinks } from '../../../mockData/navbar';
import Link from 'next/link';
import { contactInfo } from '../../../mockData/Profile';
import { footerInfo } from '../../../mockData/footer';

const Footer = () => {
  return (
    <Box px={{ xs: '2rem', md: '6rem' }}>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        mb={4}
        flexDirection={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 3, md: 0 }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <WebLogo />
          <Typography
            fontSize={{ xs: '0.875rem', md: '1rem' }}
            fontWeight={400}
            color="customGray"
            mt={2}
          >
            A career transformation platform combining mentorship, applications, and analytics for
            measurable outcomes.
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 5 }}
          display={'flex'}
          justifyContent={{ xs: 'space-between', md: 'flex-end' }}
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          gap={2}
        >
          {navLinks.map((item, i) => (
            <Link key={i} href={item.link} style={{ textDecoration: 'none' }}>
              <Typography
                fontSize={{ xs: '0.875rem', md: '1rem' }}
                fontWeight={400}
                color="text.contrastText"
              >
                {item.text}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        gap={{ xs: 1, sm: 3 }}
        mt={0.5}
        mb={2}
      >
        {footerInfo.map((item, i) => (
          <Box key={i} display={'flex'} gap={3} alignItems={'center'}>
            <Box display={'flex'} gap={1} alignItems={'center'}>
              {item.icon}
              <Typography variant="body1" color="text.subText" mt={0.5}>
                {item.text}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.subText"
              display={{ xs: 'none', sm: i !== contactInfo.length - 1 ? 'inline' : 'none' }}
              mt={0.5}
            >
              |
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={{ xs: 2, sm: 0 }}
        justifyContent={'space-between'}
        alignItems={'center'}
        my={4}
      >
        <Typography
          fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
          fontWeight={400}
          color="text.contrastText"
        >
          © 2025 Surely Placed. All rights reserved.
        </Typography>
        {/* <Box display={'flex'} gap={1}>
          <Link href={'/privacy-policy'} className="link-styles">
            <Typography variant="body2" color="text">
              Privacy Policy
            </Typography>
          </Link>
          <Link href={'/terms-and-conditions'} className="link-styles">
            <Typography variant="body2" color="text">
              Terms of Service
            </Typography>
          </Link>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Footer;
