import localFont from 'next/font/local';
import '../../styles/index.scss';
import ThemeRegistry from './theme-registry';
import { Box } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Homepage/Footer';
import ClientToastContainer from '@/components/ClientToastContainer';
import { Providers } from './providers';

const avantGarde = localFont({
  src: [
    {
      path: '../../public/fonts/AvantGarde-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/avantgarde_demi.ttf',
      weight: '600',
      style: 'normal',
    },
    { path: '../../public/fonts/ITC_MEDIUM.otf', weight: '500', style: 'normal' },
  ],
  variable: '--font-avantgarde',
});

const nexa = localFont({
  src: [
    {
      path: '../../public/fonts/NexaBook.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NexaBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NexaLight.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-nexa',
});

export const metadata = {
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${avantGarde.variable} ${nexa.variable}`}>
      <body>
        <Providers>
          <ThemeRegistry>
            <ClientToastContainer />
            <Box className="limit-container">
              <Navbar />
              {children}
              <Footer />
            </Box>
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
