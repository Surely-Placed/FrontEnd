'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';

const TermsAndCondition = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 1 },
        py: { xs: 2, sm: '6rem' },
        mt: { xs: 10, sm: 10, md: 10 },
      }}
    >
      {/* Main Heading */}
      <Typography
        variant="h4"
        fontWeight={500}
        fontFamily={'var(--font-avantgarde), sans-serif'}
        lineHeight={'normal'}
        sx={{
          mb: '0.75rem',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Terms And Conditions
      </Typography>

      <Typography
        variant="subtitle1"
        fontFamily={'var(--font-avantgarde), sans-serif'}
        lineHeight={'normal'}
        sx={{
          mb: { xs: 3, sm: '2.81rem' },
        }}
      >
        Last updated: January 1, 2024
      </Typography>

      {/* First Paragraph */}
      <Typography
        variant="body1"
        lineHeight={'1.25rem'}
        color="text"
        sx={{
          mb: '1.125rem',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>

      {/* First Bullet Point */}
      <Typography
        component="div"
        variant="body1"
        lineHeight={'1.25rem'}
        sx={{
          mb: '1.125rem',
          color: 'text',
          '&::before': {
            content: '"• "',
            display: 'inline-block',
            width: '0.5em',
          },
        }}
      >
        Suspendisse potenti. Donec dictum lorem ut metus aliquam, eget facilisis lacus suscipit. In
        hac habitasse platea dictumst. Vivamus efficitur sapien a magna fermentum, ac malesuada
        nulla tempus.
      </Typography>

      {/* Second Bullet Point with Sub-paragraph */}
      <Typography
        component="div"
        lineHeight={'1.25rem'}
        variant="body1"
        sx={{
          mb: '1.125rem',
          color: 'text',
          '&::before': {
            content: '"• "',
            display: 'inline-block',
            width: '0.5em',
          },
        }}
      >
        Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius
        eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor. In vulputate lorem quis
        dui vestibulum
      </Typography>

      {/* Third Bullet Point */}
      <Typography
        component="div"
        lineHeight={'1.25rem'}
        variant="body1"
        sx={{
          mb: '1.125rem',
          color: 'text',
          '&::before': {
            content: '"• "',
            display: 'inline-block',
            width: '0.5rem',
          },
        }}
      >
        Maecenas convallis nisi vitae efficitur finibus. Praesent luctus mi eget diam mollis
        vehicula. Sed malesuada risus sed vehicula eleifend. Integer condimentum mauris a dapibus
        ullamcorper.
      </Typography>

      {/* Large Text Block 1 */}
      <Typography
        lineHeight={'1.25rem'}
        variant="body1"
        sx={{
          mb: '1.125rem',
          color: 'text',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo.
      </Typography>

      {/* Large Text Block 2 */}
      <Typography
        lineHeight={'1.25rem'}
        variant="body1"
        sx={{
          mb: '1.125rem',
          color: 'text',
        }}
      >
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
        est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
        numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
        enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi
        ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea
        voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur.
      </Typography>

      {/* Large Text Block 3 */}
      <Typography
        lineHeight={'1.25rem'}
        variant="body1"
        sx={{
          mb: '1.125rem',
          color: 'text',
        }}
      >
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
        voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
        est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
        libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
        maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
        et voluptates repudiandae sint et molestiae non recusandae.
      </Typography>

      {/* Large Text Block 4 */}
      <Typography
        lineHeight={'1.25rem'}
        variant="body1"
        sx={{
          color: 'text',
          mb: '1.125rem',
        }}
      >
        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores
        alias consequatur aut perferendis doloribus asperiores repellat. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
    </Box>
  );
};

export default TermsAndCondition;
