import { Grid, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <Grid
      container
      justifyContent={'space-between'}
      px={{ xs: '1.5rem', sm: '3rem', md: '5rem' }}
      m={{ xs: '6rem 0 2rem', md: '8rem 0 2rem', lg: '10rem 0 2rem' }}
      spacing={{ xs: 2, md: 0 }}
    >
      <Grid size={{ xs: 12, md: 5, xl: 4 }}>
        <Typography
          variant="h3_bold"
          fontSize={{ xs: '1.5rem', sm: '2.5rem', md: '2rem', lg: '2.5rem' }}
          color="text"
        >
          Explore Our Cohorts
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6, xl: 5 }}>
        <Typography
          variant="subtitle1"
          fontSize={{ xs: '0.875rem', sm: '1rem' }}
          color="text.subText"
        >
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit
          aliquam sit nullam neque ultrices.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
