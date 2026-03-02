// lib/theme.js
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
      xxl: 2200,
    },
  },
  palette: {
    primary: {
      main: '#2857C4',
      text: '#545454',
      secondary: '#ABABAB',
      background: '#3E68CA',
      placeholder: '#A5A5A5'
    },
    secondary: {
      main: '#38BDB1',
      text: '#0E0E0E',
      light: '#E4E4E4',
    },
    text: {
      main: '#292929',
      subText: '#737373',
      contrastText: '#09090B',
      variation: '#0B0B0B',
      dark: '#16161A',
      light: '#CACACA',
      placeholder: '#2B2B2B',
    },
    background: {
      main: '#EDF5FF',
      hover: '#4A9CFF',
      grey: '#4B5756',
    },
    extremes: {
      dark: '#000',
      light: '#fff',
    },
    customGreen: {
      main: '#D7F2EF',
      secondary: '#D5F1EF',
      light: '#C3FFFA',
      background: '#C3EBE8',
      bg: '#4AF9E9',
      link: '#39B147',
    },
    customGray: {
      main: '#4C4C4C',
      dark: '#2D2D2D',
      light: '#F0F0F0E5',
      disabled: '#9E9E9E',
      text: '#B0B0B0',
      desc: '#555A65',
    },
    customBlue: {
      main: '#F0F5FF',
      secondary: '#E9EEF9',
      light: '#B9D1FF',
    }
  },
  typography: {
    fontFamily: 'var(--font-nexa), Arial, sans-serif',
    heading: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '3.125rem',
      fontWeight: 500,
    },
    subHeading: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h1: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '3.75rem',
      fontWeight: 600,
    },
    h1_light: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '3.75rem',
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '3.5rem',
      fontWeight: 500,
    },
    h3_bold: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h4_bold: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4_light: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5_light: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h6_bold: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6_light: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h6_nexa: {
      fontFamily: 'var(--font-nexa), sans-serif',
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h7_bold: {
      fontSize: '1.125rem',
      fontWeight: '700',
    },
    h7: {
      fontFamily: 'var(--font-avantgarde), sans-serif',
      fontSize: '1.125rem',
      fontWeight: '500',
    },
    h7_light: {
      fontSize: '1.125rem',
      fontWeight: '400',
    },
    subtitle1_normal: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1_bold: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2_bold: {
      fontSize: '0.87rem',
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: '0.87rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: '1440px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#9E9E9E !important',
            color: '#FFFFFF !important',
            borderColor: '#9E9E9E !important',
            opacity: 1,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            border: '1px solid #2857C4',
            padding: '0.625rem 1.25rem',
            borderRadius: '0.75rem',
            boxShadow: 'none',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: '#fff',
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'filled' },
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2857C4',
            border: '1px solid #2857C4',
            padding: '0.625rem 1.25rem',
            borderRadius: '0.75rem',
            boxShadow: 'none',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: '#2857C4',
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'transparent' },
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: '1px solid #fff',
            padding: '0.625rem 1.25rem',
            borderRadius: '0.75rem',
            boxShadow: 'none',
            textTransform: 'capitalize',
            '&:hover': {
              background: 'transparent',
              boxShadow: 'none',
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          backgroundColor: '#fff',
          // '&:hover .MuiOutlinedInput-notchedOutline': {
          //   borderColor: '#612FFF',
          // },
          '&.Mui-disabled': {
            borderRadius: '0.5rem',
            background: 'var(--Gray-100, #F5F5F5) !important',
          },
          '&.Mui-disabled:hover': {
            background: 'var(--Gray-100, #F5F5F5) !important',
            boxShadow: 'none',
          },
        },
        input: {
          color: '#181D27',
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '1.5rem',
          '::placeholder': {
            color: '#A5A5A5',
            opacity: 1,
            fontSize: '0.875rem',
            fontWeight: 400,
          },
        },
      },
    },
  },
});
export default theme;
