import { Box } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Homepage/Footer';

export default function MainLayout({ children }) {
  return (
    <Box className="limit-container">
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
}
