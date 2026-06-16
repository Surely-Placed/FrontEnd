'use client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { contactInfo } from '../../../mockData/Profile';
import { SUPPORT_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '@/config/site';
import { useForm } from 'react-hook-form';
import CustomTextField from '@/common/CustomTextField';
import Link from 'next/link';
import { HomeManager } from '@/services/home/api';
import { ExpandIcon } from '../../../public/images';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/store/loading/loading.reducer';
import { showToast } from '@/hooks/showToast';
import { ProfileManager } from '@/services/profile/api';

const Support = () => {
  const [expandedIndex, setExpandedIndex] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const didFetchRef = useRef(false);

  const theme = useTheme();
  const isTabScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLoading = useSelector((state) => state.loading['support']);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: '',
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      dispatch(setLoading({ key: 'support', value: true }));
      try {
        const { variant, msg } = await ProfileManager.userSupport({ message: data.question });
        if (variant === 'success') {
          showToast(msg || 'Your message has been sent successfully!', 'success');
          reset();
        } else {
          showToast(msg || 'Failed to send message', 'error');
        }
      } catch (error) {
        showToast('Something went wrong', 'error');
      } finally {
        dispatch(setLoading({ key: 'support', value: false }));
      }
    },
    [dispatch, reset]
  );

  const handleChange = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    (async () => {
      try {
        const res = await HomeManager.getFAQs();
        const dataArray = Array.isArray(res?.data) ? res.data : [];
        setFaqs(dataArray);
      } catch (e) {
        setFaqs([]);
      }
    })();
  }, []);
  return (
    <Box>
      <Typography
        variant="h6_bold"
        component={'p'}
        fontSize={{ xs: '1rem', sm: '1.25rem' }}
        color="text"
        mt={{ xs: 2, lg: 0 }}
      >
        We’d Love to Hear from You
      </Typography>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        gap={{ xs: 1, sm: 3 }}
        mt={0.5}
      >
        {contactInfo.map((item, i) => (
          <Box key={i} display={'flex'} gap={3} alignItems={'center'}>
            <Box display={'flex'} gap={1} alignItems={'center'}>
              {item.icon}
              {item.href ? (
                <Link href={item.href} className="link-styles">
                  <Typography variant="body1" color="text.subText" mt={0.5}>
                    {item.text}
                  </Typography>
                </Link>
              ) : (
                <Typography variant="body1" color="text.subText" mt={0.5}>
                  {item.text}
                </Typography>
              )}
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
      <Grid
        container
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        alignItems={'center'}
        mt={2}
        spacing={{ xs: 1, sm: 4 }}
      >
        <Grid size={{ xs: 8, sm: 9 }}>
          <CustomTextField
            name="question"
            control={control}
            placeholder="Ask a Question"
            fullWidth
            error={errors.question}
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 3 }}>
          <Button
            type="submit"
            variant="filled"
            disabled={isLoading}
            sx={{
              bgcolor: 'primary.main',
              color: 'extremes.light',
              width: '100%',
              p: '0.525rem 0',
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: 'extremes.light' }} />
            ) : (
              <Typography variant="subtitle2_bold" color="extremes.light" mt={0.25}>
                Send
              </Typography>
            )}
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: { xs: 4, sm: 6 } }} />
      <Grid container justifyContent={'space-between'}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography component={'p'} variant="h6_bold" color="text" mb={2}>
            Frequently Asked Questions
          </Typography>
          <Typography component={'p'} variant="body1" color="text.subText" mb={2}>
            Donec vitae mi vulputate, suscipit urna in, malesuada nisl. Pellentesque laoreet pretium
            nisl, et pulvinar massa eleifend sed.
          </Typography>
          <Typography component={'span'} variant="body1" color="text.subText" mb={2}>
            Say hi to{' '}
            <Link href={`mailto:${SUPPORT_EMAIL}`}>
              <Typography component={'span'} variant="body1" color="primary" mb={2}>
                {SUPPORT_EMAIL}
              </Typography>
            </Link>{' '}
            or call{' '}
            <Link href={`tel:${SITE_PHONE_TEL}`}>
              <Typography component={'span'} variant="body1" color="primary" mb={2}>
                {SITE_PHONE_DISPLAY}
              </Typography>
            </Link>
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }} pl={{ xs: 0, lg: '4rem' }}>
          {faqs.length === 0 ? (
            <Typography color="text.subText">No FAQs available.</Typography>
          ) : (
            faqs.map((faq, i) => (
              <Accordion
                key={i}
                elevation={0}
                expanded={expandedIndex === i}
                onChange={() => handleChange(i)}
                sx={{
                  width: '100%',
                  borderTop: i !== 0 ? '1px solid #E4E4E4' : 'none',
                }}
              >
                <AccordionSummary
                  sx={{
                    padding: { xs: '1rem 0', lg: '1rem 0' },
                  }}
                  expandIcon={<ExpandIcon size={isTabScreen ? 24 : 32} />}
                >
                  <Typography
                    fontWeight={500}
                    fontSize={{ xs: '0.875rem', sm: '1rem' }}
                    color="text"
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <Typography
                    fontWeight={400}
                    fontSize={{ xs: '0.875rem', sm: '1rem' }}
                    color="text.subText"
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Support;
