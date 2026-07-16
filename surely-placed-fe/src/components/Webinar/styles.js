const ctaKeyframes = {
  '@keyframes ctaShimmer': {
    '0%': { transform: 'translateX(-200%) skewX(-25deg)', opacity: 0 },
    '10%': { opacity: 1 },
    '45%': { transform: 'translateX(220%) skewX(-25deg)', opacity: 1 },
    '55%': { opacity: 0 },
    '100%': { transform: 'translateX(220%) skewX(-25deg)', opacity: 0 },
  },
};

const withCtaShimmer = (gradient) => ({
  ...ctaKeyframes,
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-15%',
    left: 0,
    width: '65%',
    height: '130%',
    background: gradient,
    transform: 'translateX(-200%) skewX(-25deg)',
    animation: 'ctaShimmer 5s ease-in-out infinite',
    pointerEvents: 'none',
    zIndex: 0,
    filter: 'blur(0.5px)',
  },
});

const primaryShimmerGradient =
  'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.2) 18%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.95) 52%, rgba(255,255,255,0.2) 82%, transparent 100%)';

const secondaryShimmerGradient =
  'linear-gradient(105deg, transparent 0%, rgba(40,87,196,0.15) 18%, rgba(255,255,255,0.95) 48%, rgba(120,160,255,0.85) 50%, rgba(255,255,255,0.95) 52%, rgba(40,87,196,0.2) 82%, transparent 100%)';

export const sectionSx = {
  maxWidth: 1200,
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
  py: { xs: 4, md: 6 },
};

export const headingSx = {
  fontFamily: 'var(--font-avantgarde), sans-serif',
  fontWeight: 500,
  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
  color: 'text',
  lineHeight: 'normal',
  textAlign: 'left',
};

export const heroHeadingSx = {
  fontFamily: 'var(--font-avantgarde), sans-serif',
  fontWeight: 500,
  color: 'text',
  lineHeight: 1.15,
  textAlign: 'center',
  fontSize: 'clamp(1.125rem, 4.2vw, 3.5rem)',
  whiteSpace: 'nowrap',
};

export const bodySx = {
  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
  lineHeight: 1.6,
};

export const primaryCtaSx = {
  ...withCtaShimmer(primaryShimmerGradient),
  bgcolor: 'primary.main',
  color: '#fff !important',
  px: { xs: 3, md: 4 },
  py: 1.5,
  borderRadius: '0.75rem',
  boxShadow: '0 8px 28px rgba(40, 87, 196, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
  fontFamily: 'var(--font-avantgarde), sans-serif',
  fontWeight: 700,
  fontSize: { xs: '0.95rem', sm: '1.05rem' },
  letterSpacing: '0.02em',
  textTransform: 'none',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    bgcolor: 'primary.main',
    color: '#fff !important',
    boxShadow: '0 12px 28px rgba(40, 87, 196, 0.45)',
    transform: 'translateY(-2px)',
  },
};

export const secondaryCtaSx = {
  ...withCtaShimmer(secondaryShimmerGradient),
  minWidth: { xs: '100%', sm: 220 },
  px: { xs: 3, md: 4 },
  py: 1.5,
  borderRadius: '0.75rem',
  bgcolor: '#fff !important',
  color: '#292929 !important',
  border: '2px solid',
  borderColor: 'primary.main',
  boxShadow: '0 6px 22px rgba(40, 87, 196, 0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
  fontFamily: 'var(--font-avantgarde), sans-serif',
  fontWeight: 700,
  fontSize: { xs: '0.95rem', sm: '1.05rem' },
  letterSpacing: '0.02em',
  textTransform: 'none',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    bgcolor: '#fff !important',
    color: '#292929 !important',
    boxShadow: '0 8px 20px rgba(40, 87, 196, 0.2)',
    transform: 'translateY(-2px)',
  },
};

export const sectionMotion = {
  initial: { y: 80, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: 'easeOut' },
};
