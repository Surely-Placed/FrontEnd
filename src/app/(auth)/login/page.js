import { Box, Typography } from '@mui/material';
import AuthLayout from '@/components/layout/AuthLayout';
import { WebLogo } from '../../../../public/images';
import LoginForm from '@/components/Auth/LoginForm';

export default function Login() {
  return (
    <AuthLayout>
      <Box maxWidth="33rem" width="100%">
        <Box display={{ xs: 'block', md: 'none' }}>
          <WebLogo width={72} height={24} />
        </Box>
        <Typography
          fontFamily={'var(--font-avantgarde), sans-serif'}
          fontSize={{ xs: '1.5rem', md: '2.5rem' }}
          fontWeight={500}
          component={'h3'}
          lineHeight={'normal'}
          color="text"
          mb={'0.75rem'}
          mt={'1.88rem'}
        >
         Welcome Back👋
        </Typography>
        <Typography
          fontFamily={'var(--font-nexa), Arial, sans-serif'}
          fontSize={{ xs: '0.875rem', md: '1.125rem' }}
          fontWeight={400}
          color="text.subText"
          lineHeight={'normal'}
          mb={'2rem'}
        >
          Happy to see you back again!
        </Typography>
        <LoginForm />
      </Box>
    </AuthLayout>
  );
}
