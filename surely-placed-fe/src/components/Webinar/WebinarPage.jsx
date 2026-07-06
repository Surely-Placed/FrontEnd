'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CustomDivider from '@/common/CustomDivider';
import { showToast } from '@/hooks/showToast';
import { useRazorpayCheckout } from '@/hooks/useRazorpayCheckout';
import { ExpandIcon } from '../../../public/images';
import {
  WEBINAR_FAQS,
  WEBINAR_TESTIMONIALS,
  WEBINAR_MODULES,
  WEBINAR_AUDIENCE_PILLS,
  WEBINAR_COUNTRY_OPTIONS,
  WEBINAR_STATUS_OPTIONS,
  WEBINAR_VISA_OPTIONS,
  WEBINAR_EXP_OPTIONS,
  WEBINAR_DEFAULTS,
  WEBINAR_PLAN_SLUG,
  WEBINAR_DATETIME_LABEL,
  EMPTY_WEBINAR_FORM,
} from '../../../mockData/Webinar';

const sectionSx = {
  maxWidth: 1200,
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
  py: { xs: 4, md: 6 },
};

const headingSx = {
  fontFamily: 'var(--font-avantgarde), sans-serif',
  fontWeight: 500,
  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
  color: 'text',
  lineHeight: 'normal',
  textAlign: 'left',
};

const heroHeadingSx = {
  fontFamily: 'var(--font-avantgarde), sans-serif',
  fontWeight: 500,
  color: 'text',
  lineHeight: 1.15,
  textAlign: 'center',
  fontSize: 'clamp(1.125rem, 4.2vw, 3.5rem)',
  whiteSpace: 'nowrap',
};

const bodySx = {
  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
  lineHeight: 1.6,
};

const sectionMotion = {
  initial: { y: 80, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const AnimatedSection = ({ children, sx, ...props }) => (
  <motion.div {...sectionMotion} {...props}>
    <Box sx={sx}>{children}</Box>
  </motion.div>
);

const AnimatedItem = ({ children, delay = 0, sx }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
  >
    <Box sx={sx}>{children}</Box>
  </motion.div>
);

function useCountdown(targetIso) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const diff = Math.max(0, target - now);
  const pad = (n) => String(n).padStart(2, '0');

  return {
    d: pad(Math.floor(diff / 86_400_000)),
    h: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    m: pad(Math.floor((diff % 3_600_000) / 60_000)),
    s: pad(Math.floor((diff % 60_000) / 1000)),
  };
}

function useExitIntent(enabled, onFire, armDelayMs = 6000) {
  useEffect(() => {
    if (!enabled) return;
    let fired = false;
    let handler = null;
    const arm = window.setTimeout(() => {
      handler = (e) => {
        if (fired || e.relatedTarget || e.clientY > 12) return;
        fired = true;
        onFire();
      };
      document.addEventListener('mouseout', handler);
    }, armDelayMs);
    return () => {
      window.clearTimeout(arm);
      if (handler) document.removeEventListener('mouseout', handler);
    };
  }, [enabled, onFire, armDelayMs]);
}

const CountdownBlock = ({ label, value }) => (
  <Box
    sx={{
      minWidth: { xs: 64, sm: 88 },
      p: '14px 0',
      borderRadius: '0.875rem',
      bgcolor: 'extremes.light',
      border: '1px solid',
      borderColor: 'customBlue.light',
      textAlign: 'center',
    }}
  >
    <Typography
      fontFamily={'var(--font-avantgarde), sans-serif'}
      fontSize={{ xs: '1.75rem', sm: '2.25rem' }}
      fontWeight={700}
      color="primary.main"
    >
      {value}
    </Typography>
    <Typography variant="body2" color="text.subText" textTransform="uppercase" fontSize={{ xs: '0.75rem', sm: '0.875rem' }}>
      {label}
    </Typography>
  </Box>
);

const WebinarPage = ({
  price = WEBINAR_DEFAULTS.price,
  seatsLeft = WEBINAR_DEFAULTS.seatsLeft,
  seatsTotal = WEBINAR_DEFAULTS.seatsTotal,
  exitPopup = true,
  webinarDate = WEBINAR_DEFAULTS.webinarDate,
  videoEmbedUrl = WEBINAR_DEFAULTS.videoEmbedUrl,
  onLeadCapture,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTabScreen = useMediaQuery(theme.breakpoints.down('md'));
  const priceLabel = `$${price}`;
  const cd = useCountdown(webinarDate);

  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_WEBINAR_FORM);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [exitOpen, setExitOpen] = useState(false);
  const [exitName, setExitName] = useState('');
  const [exitEmail, setExitEmail] = useState('');
  const [exitSent, setExitSent] = useState(false);

  const { startCheckout, loading: checkoutLoading } = useRazorpayCheckout({
    onSuccess: () => {
      setRegistrationOpen(false);
      setSuccess(true);
      showToast('Payment successful! Check your email for confirmation.', 'success');
    },
    onFailure: (err) => {
      if (err?.message === 'Checkout dismissed') {
        setRegistrationOpen(true);
        return;
      }
      setFormError(err?.message || 'Payment failed. Please try again.');
      setRegistrationOpen(true);
      showToast(err?.message || 'Payment failed. Please try again.', 'error');
    },
  });

  useExitIntent(
    exitPopup && !registrationOpen && !success,
    useCallback(() => setExitOpen(true), [])
  );

  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const openCheckout = () => {
    setRegistrationOpen(true);
    setFormError('');
  };

  const validateRegistration = () => {
    if (!form.first.trim() || !form.last.trim()) {
      return 'Please enter your first and last name.';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      return 'Please enter a valid email address.';
    }
    if (!form.phone.trim()) {
      return 'Please enter your phone number.';
    }
    if (!form.country) return 'Please select your country.';
    if (!form.status) return 'Please select your current status.';
    if (!form.visa) return 'Please select your visa status.';
    if (!form.exp) return 'Please select your years of experience.';
    return '';
  };

  const submitRegistration = async () => {
    const validationError = validateRegistration();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError('');
    setRegistrationOpen(false);

    try {
      await startCheckout({
        planSlug: WEBINAR_PLAN_SLUG,
        name: `${form.first.trim()} ${form.last.trim()}`,
        email: form.email.trim(),
        contact: form.phone.trim(),
        registration: {
          country: form.country,
          status: form.status,
          visa: form.visa,
          experience: form.exp,
        },
      });
    } catch (err) {
      setRegistrationOpen(true);
      setFormError(err?.message || 'Unable to start payment. Please try again.');
      showToast(err?.message || 'Unable to start payment.', 'error');
    }
  };

  const sendExit = () => {
    if (!exitName.trim() || !exitEmail.trim()) return;
    onLeadCapture?.({ name: exitName.trim(), email: exitEmail.trim() });
    setExitSent(true);
  };

  const reserveButton = (fullWidth = false) => (
    <Button
      variant="filled"
      onClick={openCheckout}
      sx={{ bgcolor: 'primary.main', color: 'extremes.light', width: fullWidth ? '100%' : 'auto' }}
    >
      <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
        Reserve My Seat for {priceLabel}
      </Typography>
    </Button>
  );

  const seatsProgress = Math.round((seatsLeft / seatsTotal) * 100);

  return (
    <>
      {/* Hero */}
      <Box sx={{ bgcolor: 'extremes.light', pt: { xs: '6rem', lg: '6.5rem' } }}>
        <AnimatedSection sx={{ ...sectionSx, textAlign: 'center' }}>
          <Chip
            label="Live Webinar · Sunday, July 20, 2026 · 8 PM ET"
            sx={{
              mb: 2,
              bgcolor: 'customGreen.main',
              color: 'secondary.main',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              height: 'auto',
              py: 0.75,
              px: 1.5,
            }}
          />
          <Typography component="h1" sx={{ ...heroHeadingSx, mb: 2 }}>
            Stop mass-applying. Start getting interviews.
          </Typography>
          <Typography
            color="text.subText"
            sx={{ ...bodySx, maxWidth: 720, mx: 'auto', mb: 3 }}
          >
            200 applications and silence isn&apos;t a work-ethic problem. It&apos;s a system problem.
            In one live session, learn the exact system engineers now at Amazon, Google, and Microsoft
            used to get shortlisted, crack interviews, and stay ahead of AI-driven hiring.
          </Typography>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.5} mb={3}>
            {['Live, instructor-led', 'Career Playbook included', 'Recording included', 'Live Q&A'].map(
              (item) => (
                <Chip
                  key={item}
                  label={item}
                  variant="outlined"
                  sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, height: 'auto', py: 0.75, px: 0.5 }}
                />
              )
            )}
          </Stack>

          <Stack direction="row" justifyContent="center" gap={1.5} flexWrap="wrap" mb={3}>
            <CountdownBlock label="Days" value={cd.d} />
            <CountdownBlock label="Hours" value={cd.h} />
            <CountdownBlock label="Min" value={cd.m} />
            <CountdownBlock label="Sec" value={cd.s} />
          </Stack>

          <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
            {reserveButton()}
            <Box width={{ xs: '80%', sm: 240 }}>
              <LinearProgress
                variant="determinate"
                value={seatsProgress}
                sx={{ height: 6, borderRadius: 999, bgcolor: 'customBlue.light' }}
              />
              <Typography variant="body1" color="text.subText" mt={1} fontSize={{ xs: '1rem', sm: '1.125rem' }}>
                Only{' '}
                <Typography component="span" color="secondary.main" fontWeight={600}>
                  {seatsLeft} of {seatsTotal} seats
                </Typography>{' '}
                remaining
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={{ xs: 2, md: 4 }}
            mt={4}
            pt={3}
            borderTop="1px solid"
            borderColor="customBlue.light"
          >
            {[
              ['890+', 'students placed'],
              ['1,400+', 'registrations'],
              ['4.9/5', 'attendee rating'],
            ].map(([n, label]) => (
              <Typography key={label} variant="body1" color="text.subText" fontSize={{ xs: '1rem', sm: '1.125rem' }}>
                <Typography component="span" fontWeight={700} fontSize={{ xs: '1.375rem', sm: '1.5rem' }} color="text">
                  {n}
                </Typography>{' '}
                {label}
              </Typography>
            ))}
          </Stack>
        </AnimatedSection>
      </Box>

      {/* Problem */}
      <AnimatedSection sx={sectionSx}>
        <CustomDivider text={"Why You're Not Hearing Back"} />
        <Typography component="h2" sx={{ ...headingSx, mt: 2, mb: 2 }}>
          Knowing Java or Python isn&apos;t enough anymore.
        </Typography>
        <Typography
          color="text.subText"
          sx={{ ...bodySx, maxWidth: 720, mb: 3 }}
        >
          Companies now screen for ATS-ready resumes, GitHub portfolios, LinkedIn branding, system
          design, and AI-assisted development. Most candidates never learn this. So they apply
          hundreds of times and hear nothing back. This webinar teaches all of it, in one evening.
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={1} mb={3}>
          {WEBINAR_AUDIENCE_PILLS.map((pill) => (
            <Chip
              key={pill}
              label={pill}
              sx={{
                bgcolor: 'customBlue.main',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                height: 'auto',
                py: 0.5,
              }}
            />
          ))}
        </Box>
        <Box>{reserveButton()}</Box>
      </AnimatedSection>

      {/* Video */}
      <AnimatedSection sx={{ ...sectionSx, bgcolor: 'extremes.light' }}>
        <CustomDivider text="2-Minute Preview" />
        <Typography component="h2" sx={{ ...headingSx, mt: 2, mb: 3 }}>
          Watch what you&apos;ll learn
        </Typography>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: 2,
            mb: 3,
          }}
        >
          <Box
            component="iframe"
            src={videoEmbedUrl}
            title="Webinar preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        </Box>
        <Box>{reserveButton()}</Box>
      </AnimatedSection>

      {/* Modules */}
      <AnimatedSection sx={sectionSx}>
        <CustomDivider text={"What You'll Learn"} />
        <Typography component="h2" sx={{ ...headingSx, mt: 2, mb: 4 }}>
          Four modules. One clear system.
        </Typography>
        <Grid container spacing={2.5}>
          {WEBINAR_MODULES.map((mod, index) => (
            <Grid key={mod.n} size={{ xs: 12, sm: 6, md: 3 }}>
              <AnimatedItem delay={index * 0.1}>
                <Box
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '1rem',
                    border: '1px solid',
                    borderColor: '#D8E1F4',
                    bgcolor: '#fff',
                  }}
                >
                  <Typography variant="subtitle2_bold" color="secondary.main" mb={1}>
                    {mod.n}
                  </Typography>
                  <Typography component="h3" variant="h6" mb={1.5}>
                    {mod.title}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                    {mod.items.map((item) => (
                      <Typography component="li" key={item} variant="body2" color="text.subText" mb={0.5}>
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </AnimatedItem>
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>{reserveButton()}</Box>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection sx={{ ...sectionSx, bgcolor: 'extremes.light' }}>
        <Typography component="h2" sx={{ ...headingSx, mb: 3 }}>
          Everything you need to land more interviews.
        </Typography>
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
            p: { xs: 2.5, md: 4 },
            borderRadius: '1.25rem',
            border: '2px solid',
            borderColor: 'primary.main',
            bgcolor: 'extremes.light',
          }}
        >
          {[
            ['Live webinar + recording + Q&A', '$99'],
            ['Software Career Playbook: resume, ATS template, LinkedIn & GitHub', '$39'],
            ['30/60/90-day roadmap + application tracker', '$29'],
            ['Curated resource library: DSA, system design, AI', '$49'],
          ].map(([item, val]) => (
            <Box key={item} display="flex" justifyContent="space-between" gap={2} mb={1.5}>
              <Typography variant="body2" color="text">
                ✓ {item}
              </Typography>
              <Typography variant="body2" color="text.subText">
                {val}
              </Typography>
            </Box>
          ))}
          <Box
            display="flex"
            alignItems="baseline"
            gap={2}
            flexWrap="wrap"
            borderTop="1px solid"
            borderColor="customBlue.light"
            pt={2.5}
            mt={2}
            mb={2.5}
          >
            <Typography variant="body1" color="text.subText">
              Total value
            </Typography>
            <Typography sx={{ textDecoration: 'line-through', color: 'text.subText' }}>$216</Typography>
            <Typography
              fontFamily={'var(--font-avantgarde), sans-serif'}
              fontSize="2.75rem"
              fontWeight={700}
              color="primary.main"
            >
              {priceLabel}
            </Typography>
            <Typography variant="body2" color="text.subText">
              today, one-time
            </Typography>
          </Box>
          {reserveButton(true)}
          <Typography variant="caption" color="text.subText" display="block" textAlign="center" mt={1.5}>
            Secure checkout · Instant email confirmation · Only {seatsLeft} of {seatsTotal} seats left
          </Typography>
        </Box>
      </AnimatedSection>

      {/* Instructor */}
      <AnimatedSection sx={sectionSx}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }} display="flex" justifyContent="center">
            <Image
              src="/webinar/instructor.svg"
              alt="Dhiraj Kumar Jain"
              width={260}
              height={300}
              unoptimized
              className="h_auto w_100"
              style={{ maxWidth: 260, borderRadius: '1rem' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <CustomDivider text="Meet Your Instructor" />
            <Typography component="h2" sx={{ ...headingSx, mt: 2, mb: 1 }}>
              Dhiraj Kumar Jain
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} color="text.subText" mb={2}>
              Software Engineer, AWS · Distributed storage &amp; search systems · OpenSearch
              contributor
            </Typography>
            <Typography variant="body1" color="text.subText" mb={2}>
              Dhiraj builds large-scale distributed systems at AWS and contributes to open source. He
              teaches the hiring process the way it works inside big tech: what gets a resume
              shortlisted, what interviewers actually score you on, and how AI is reshaping both.
            </Typography>
            <Typography variant="body1" color="text.subText" mb={3}>
              His approach: replace guesswork with a system.{' '}
              <Typography component="span" fontWeight={600} color="text">
                System beats luck. Every time.
              </Typography>
            </Typography>
            {reserveButton()}
          </Grid>
        </Grid>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection sx={{ ...sectionSx, bgcolor: 'extremes.light' }}>
        <Typography component="h2" sx={{ ...headingSx, mb: 3 }}>
          Success stories
        </Typography>
        <Grid container spacing={2}>
          {WEBINAR_TESTIMONIALS.map((t, index) => (
            <Grid key={t.name} size={{ xs: 12, md: 4 }}>
              <AnimatedItem delay={index * 0.12}>
                <Box
                  sx={{
                    p: 2.5,
                    height: '100%',
                    borderRadius: '0.5rem',
                    border: '1px solid #91E4DD',
                    bgcolor: 'customGreen.main',
                  }}
                >
                  <Typography variant="body2" color="text.dark" mb={2}>
                    {t.quote}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        bgcolor: t.tone === 'blue' ? 'customBlue.secondary' : 'customGreen.background',
                        color: t.tone === 'blue' ? 'primary.main' : 'secondary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {t.initials}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.dark">
                        {t.name}
                      </Typography>
                      <Typography variant="caption" color="text.dark">
                        {t.role}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </AnimatedItem>
            </Grid>
          ))}
        </Grid>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection sx={sectionSx}>
        <Typography component="h2" sx={{ ...headingSx, mb: 3 }}>
          Frequently asked questions
        </Typography>
        {WEBINAR_FAQS.map((faq, i) => (
          <Accordion
            key={faq.q}
            elevation={0}
            expanded={faqOpen === i}
            onChange={() => setFaqOpen(faqOpen === i ? -1 : i)}
            sx={{ borderBottom: '1px solid #E4E4E4', '&:before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={<ExpandIcon size={isTabScreen ? 24 : 32} />}>
              <Typography component="h3" variant="subtitle1" fontWeight={500}>
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.subText">
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            p: { xs: '3rem 2rem', sm: '4rem 3rem', md: '5rem 4rem' },
            borderRadius: { xs: '1rem', md: '1.5rem' },
            overflow: 'hidden',
            textAlign: 'center',
            backgroundImage: "url('/HomePage/Container.webp')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Typography
            component="h2"
            fontFamily={'var(--font-avantgarde), sans-serif'}
            fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.5rem' }}
            fontWeight={600}
            color="extremes.light"
            mb={1.5}
            maxWidth={720}
            mx="auto"
          >
            Your next offer starts with better preparation.
          </Typography>
          <Typography
            color="text.light"
            sx={{ ...bodySx, maxWidth: 640, mx: 'auto', mb: 3 }}
          >
            Don&apos;t spend another six months guessing. Reserve your seat for the live webinar, or book a
            call for personalized career guidance.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {reserveButton()}
            <Link href="/book-a-call" className="link-styles">
              <Button
                variant="contained"
                sx={{
                  minWidth: { xs: '100%', sm: 220 },
                  p: { xs: '0.75rem 1.5rem', sm: '0.75rem 2rem' },
                  bgcolor: 'extremes.light',
                  color: 'text',
                  '&:hover': { bgcolor: 'extremes.light', opacity: 0.92 },
                }}
              >
                <Typography variant="subtitle2_bold" color="text" mt={0.25}>
                  Book a Call
                </Typography>
              </Button>
            </Link>
          </Stack>
        </Box>
      </AnimatedSection>

      {/* Mobile sticky CTA */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            bgcolor: 'extremes.light',
            borderTop: '1px solid',
            borderColor: 'customBlue.light',
            p: '12px 16px calc(12px + env(safe-area-inset-bottom))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              July 20 · 8 PM ET
            </Typography>
            <Typography variant="caption" color="secondary.main">
              {seatsLeft} seats left
            </Typography>
          </Box>
          <Button variant="filled" onClick={openCheckout} sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
            <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
              Reserve · {priceLabel}
            </Typography>
          </Button>
        </Box>
      )}

      {/* Registration dialog */}
      <Dialog
        open={registrationOpen}
        onClose={() => !checkoutLoading && setRegistrationOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2}>
            <Typography component="h2" variant="h5" fontFamily={'var(--font-avantgarde), sans-serif'}>
              Register for the webinar
            </Typography>
            <Typography variant="body2" color="text.subText">
              Live webinar · {WEBINAR_DATETIME_LABEL} · {priceLabel}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="First name"
                  value={form.first}
                  onChange={setField('first')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Last name"
                  value={form.last}
                  onChange={setField('last')}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={form.email}
              onChange={setField('email')}
            />
            <TextField
              fullWidth
              required
              label="Phone"
              value={form.phone}
              onChange={setField('phone')}
              placeholder="+1 555 000 0000"
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Country"
                  value={form.country}
                  onChange={setField('country')}
                >
                  {WEBINAR_COUNTRY_OPTIONS.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Current status"
                  value={form.status}
                  onChange={setField('status')}
                >
                  {WEBINAR_STATUS_OPTIONS.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Visa status"
                  value={form.visa}
                  onChange={setField('visa')}
                >
                  {WEBINAR_VISA_OPTIONS.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Years of experience"
                  value={form.exp}
                  onChange={setField('exp')}
                >
                  {WEBINAR_EXP_OPTIONS.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            {formError && (
              <Typography variant="body2" color="error">
                {formError}
              </Typography>
            )}
            <Button
              variant="filled"
              fullWidth
              disabled={checkoutLoading}
              onClick={submitRegistration}
              sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}
            >
              {checkoutLoading ? (
                <CircularProgress size={24} sx={{ color: 'extremes.light' }} />
              ) : (
                <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
                  Continue to Payment · {priceLabel}
                </Typography>
              )}
            </Button>
            <Typography variant="caption" color="text.subText" textAlign="center">
              Secure checkout via Razorpay · USD · Instant confirmation email
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Success dialog */}
      <Dialog open={success} onClose={() => setSuccess(false)} fullWidth maxWidth="sm">
        <DialogContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
          <Typography component="h2" variant="h5" fontFamily={'var(--font-avantgarde), sans-serif'} mb={1}>
            You&apos;re in. Congratulations!
          </Typography>
          <Typography variant="body1" color="text.subText" mb={2}>
            Payment confirmed. A confirmation email is on its way to{' '}
            <Typography component="span" fontWeight={600} color="text">
              {form.email || 'your email'}
            </Typography>
            .
          </Typography>
          <Box sx={{ bgcolor: 'customBlue.secondary', borderRadius: '1rem', p: 2.5, textAlign: 'left', mb: 2 }}>
            {[
              'Webinar access · ' + WEBINAR_DATETIME_LABEL,
              'Calendar invite',
              'Joining link',
              'Software Career Playbook (instant download)',
            ].map((item) => (
              <Typography key={item} variant="body2" color="text.subText" mb={0.75}>
                ✓ {item}
              </Typography>
            ))}
          </Box>
          <Button variant="filled" onClick={() => setSuccess(false)} sx={{ bgcolor: 'primary.main', color: 'extremes.light' }}>
            <Typography variant="subtitle2_bold" color="extremes.light" mt={0.1}>
              Back to the Page
            </Typography>
          </Button>
        </DialogContent>
      </Dialog>

      {/* Exit intent */}
      <Dialog open={exitOpen} onClose={() => setExitOpen(false)} fullWidth maxWidth="xs">
        <DialogContent sx={{ p: 3 }}>
          <Typography component="h3" variant="h6" fontFamily={'var(--font-avantgarde), sans-serif'} mb={1}>
            Wait, before you leave
          </Typography>
          {!exitSent ? (
            <Stack spacing={2}>
              <Typography variant="body2" color="text.subText">
                Get the <strong>free Resume Checklist</strong> we use with every placed student. No
                payment needed.
              </Typography>
              <TextField fullWidth label="Name" value={exitName} onChange={(e) => setExitName(e.target.value)} />
              <TextField fullWidth label="Email" type="email" value={exitEmail} onChange={(e) => setExitEmail(e.target.value)} />
              <Button variant="filled" fullWidth onClick={sendExit} sx={{ bgcolor: 'secondary.main', color: 'extremes.light' }}>
                Send Me the Free Checklist
              </Button>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.subText">
              ✓ Checklist sent. Check your inbox. Your seat is still waiting if you change your mind.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WebinarPage;
