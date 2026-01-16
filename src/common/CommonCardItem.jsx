import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const CommonCardItem = ({ uuid, img, job, points, ratings = '' }) => (
  <Box
    borderRadius={'1.25rem'}
    overflow={'hidden'}
    boxShadow={'0px 4px 14px 0px #00000026'}
    height={'100%'}
    display={'flex'}
    flexDirection={'column'}
  >
    <Box height={'300px'}>
      <Image
        src={img}
        alt="cohort-img"
        width={100}
        height={100}
        unoptimized
        className="w_100 h_100"
      />
    </Box>
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      p={{ xs: '1.25rem 0.75rem', sm: '1.5rem 1rem' }}
      flex={1}
    >
      <Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
          <Typography
            fontSize={{ xs: '1rem', sm: '1.5rem' }}
            fontWeight={500}
            fontFamily={'var(--font-avantgarde), sans-serif'}
            color="secondary.text"
          >
            {job}
          </Typography>
          {ratings && (
            <Box
              p={'0.1875rem 0.5625rem'}
              display={'flex'}
              alignItems={'center'}
              borderRadius={'0.5rem'}
              height={'fit-content'}
              sx={{ backgroundColor: 'customGreen.secondary' }}
            >
              <Typography variant="subtitle1" color="text" fontFamily={'sans-serif'}>
                {ratings}
              </Typography>
              <Typography variant="subtitle1" color="text" fontFamily={'sans-serif'}>
                ⭐️
              </Typography>
            </Box>
          )}
        </Box>
        <ul>
          {points?.map((text, ind) => (
            <li key={ind}>
              <Typography
                fontSize={{ xs: '0.875rem', sm: '1rem' }}
                fontWeight={400}
                color="customGray.dark"
                mb={1}
              >
                {text}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
      <Box display={'flex'} gap={2} px={'1rem'} pt={1.5}>
        <Link href={uuid ? `/cohorts/${uuid}` : '#'} className="link-styles" style={{ width: '50%' }}>
          <Button
            variant="contained"
            sx={{ width: '100%', padding: { xs: '0.625rem 0.5rem', md: '0.625rem 1.25rem' } }}
          >
            <Typography
              variant="subtitle2_bold"
              fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
              color="primary"
              mt={0.3}
            >
              View Cohort 
            </Typography>
          </Button>
        </Link>
        <AuthBuyNow uuid={uuid} />
      </Box>
    </Box>
  </Box>
);

export default CommonCardItem;

const AuthBuyNow = ({ uuid }) => {
  const { ensureAuthFromEvent } = useAuthRedirect();
  const targetUrl = uuid ? `/cohorts/${uuid}/checkout` : '#';
  return (
    <Link href={targetUrl} className="link-styles" style={{ width: '50%' }} onClick={(e) => ensureAuthFromEvent(e, targetUrl)}>
      <Button
        variant="filled"
        sx={{
          bgcolor: 'primary.main',
          color: 'extremes.light',
          width: '100%',
          padding: { xs: '0.625rem 0.5rem', md: '0.625rem 1.25rem' },
        }}
      >
        <Typography
          variant="subtitle2_bold"
          fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
          color="extremes.light"
          mt={0.1}
        >
          Buy Now
        </Typography>
      </Button>
    </Link>
  );
};
