'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  Skeleton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@/common/LoadingButton';
import CustomCheckbox from '@/common/CustomCheckbox';
import { useForm } from 'react-hook-form';
import { HomeManager } from '@/services/home/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '@/store/user/user.reducer';
import { setLoading } from '@/store/loading/loading.reducer';
import { AuthManager } from '@/services/auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm';
import { showToast } from '@/hooks/showToast';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const InfoRow = ({ label, value }) => (
  <Stack spacing={0.5} sx={{ flex: 1 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500} noWrap>
      {value}
    </Typography>
  </Stack>
);

const PriceRow = ({ label, value }) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between" py={1}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Stack>
);

const CohortCheckOut = () => {
  const theme = useTheme();
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoadings] = useState(true);
  const [agree, setAgree] = useState(false);
  const {
    control,
    formState: { errors },
  } = useForm();
  const userData = useSelector(selectUserData);
  const isLoading = useSelector((state) => state.loading['checkoutPay']);
  const [cohortDetail, setCohortDetail] = useState(null);
  const didFetchRef = useRef(false);
  const [clientSecret, setClientSecret] = useState('');
  const [stripeOpen, setStripeOpen] = useState(false);

  useEffect(() => {
    if (!id || didFetchRef.current) return;
    didFetchRef.current = true;
    (async () => {
      try {
        const res = await HomeManager.getCohortDetail(id);
        if (res?.variant === 'success') {
          setCohortDetail(res?.data?.data);
        }
      } finally {
        setLoadings(false);
      }
    })();
  }, [id]);

  const courseImage = cohortDetail?.image;
  const courseTitle = cohortDetail?.name;
  const coursePrice =
    typeof cohortDetail?.price === 'number' || typeof cohortDetail?.price === 'string'
      ? `$${cohortDetail?.price}`
      : '$300';
  const totalPrice = coursePrice;

  const firstName = userData?.first_name || userData?.name?.split?.(' ')?.[0];
  const email = userData?.email;
  const phone = userData?.phone || '';

  const handlePayNow = useCallback(async () => {
    if (!agree || !id) return;
    dispatch(setLoading({ key: 'checkoutPay', value: true }));
    try {
      const { variant, data, msg } = await AuthManager.createPaymentIntent({
        cohort_id: id,
        payment_method: 'card',
      });
      if (variant === 'success' && data?.client_secret) {
        setClientSecret(data.client_secret);
        setStripeOpen(true);
      } else {
        showToast(msg, 'error');
      }
    } finally {
      dispatch(setLoading({ key: 'checkoutPay', value: false }));
    }
  }, [agree, id, dispatch]);

  const handlePaymentSuccess = useCallback(
    async (paymentIntentId) => {
      if (!paymentIntentId) return;

      dispatch(setLoading({ key: 'confirmPayment', value: true }));
      try {
        const { variant, msg } = await AuthManager.confirmPayment({
          payment_intent_id: paymentIntentId,
        });

        if (variant === 'success') {
          showToast(msg, 'success');
          setStripeOpen(false);
          // Navigate to profile page after successful confirmation
          router.push('/profile?tabValue=1');
        } else {
          showToast(msg || 'Payment confirmation failed', 'error');
        }
      } catch (error) {
        showToast('Payment confirmation failed', 'error');
      } finally {
        dispatch(setLoading({ key: 'confirmPayment', value: false }));
      }
    },
    [dispatch, router]
  );

  const stripeAppearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: theme.palette.primary.main,
      colorText: theme.palette.text.primary,
      colorTextSecondary: theme.palette.text.secondary,
      colorBackground: theme.palette.background.paper,
      colorDanger: theme.palette.error.main,
      fontFamily: theme.typography.fontFamily,
    },
    rules: {
      '.Input': {
        color: theme.palette.text.primary,
      },
      '.Label': {
        color: theme.palette.text.secondary,
      },
    },
  };

  const CourseCard = (
    <Card variant="outlined" sx={{ borderRadius: '0.75rem', p: { xs: '1rem', sm: '1.25rem' } }}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={180}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
      ) : (
        <CardMedia
          component="img"
          sx={{ borderRadius: '0.625rem' }}
          height="180"
          image={courseImage}
          alt="Course banner"
        />
      )}
      <CardContent>
        {loading ? (
          <Stack spacing={1.5}>
            <Skeleton width="60%" height={24} />
            <Skeleton width="40%" />
            <Skeleton width="70%" />
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Skeleton width={140} height={36} />
              <Skeleton width={220} height={36} />
              <Skeleton width={120} height={36} />
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {courseTitle}
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" color="text.secondary" mb={1}>
              <Typography variant="caption">Mentor :</Typography>
              <Typography variant="caption" fontWeight={500}>
                {cohortDetail?.coaches[0]?.first_name} {cohortDetail?.coaches[0]?.last_name}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Starting from : {cohortDetail?.start_date}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <InfoRow label="First Name" value={firstName} />
              <InfoRow label="Email Address" value={email} />
              <InfoRow label="Phone No." value={phone} />
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );

  const PriceCard = (
    <Card
      variant="outlined"
      sx={{ borderRadius: 2, flex: 1, display: 'flex', alignItems: 'center' }}
    >
      <CardContent sx={{ p: 3, width: '100%' }}>
        {loading ? (
          <Stack spacing={1.5}>
            <Skeleton width={120} height={22} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Divider sx={{ my: 1.5 }} />
            <Skeleton width={100} height={24} />
          </Stack>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Price Detail
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <PriceRow label="Course Price" value={coursePrice} />
            <Divider sx={{ my: 1.5 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Price Detail
              </Typography>
              <Typography variant="subtitle2" fontWeight={700}>
                {totalPrice}
              </Typography>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );

  const ButtonCard = (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        {loading ? (
          <Stack spacing={1.5}>
            <Skeleton width={180} height={28} />
            <Skeleton variant="rounded" height={60} />
          </Stack>
        ) : (
          <>
            <CustomCheckbox
              control={control}
              error={errors.rememberMe}
              checked={agree}
              onChange={(event, isChecked) => {
                setAgree(!!isChecked);
              }}
              name={'agree'}
              label={
                <Typography variant="body2" color="text.secondary">
                  By clicking this, I agree to{' '}
                  <Link
                    href={'/terms-and-conditions'}
                    style={{ color: '#2857C4', textDecoration: 'none' , fontWeight: 600}}
                  >
                    Terms And Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href={'/privacy-policy'}
                    style={{ color: '#2857C4', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
              marginLeft={'0rem'}
            />
            <LoadingButton
              label="Pay Now"
              loadingKey="checkoutPay"
              disabled={!agree}
              onClick={handlePayNow}
            />
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 4 },
          mt: { xs: 10, sm: 10, md: 10 },
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Checkout
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            {CourseCard}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>{PriceCard}</Box>
            {!stripeOpen && (
              <Box sx={{ display: { xs: 'none', sm: 'block', md: 'none' }, mt: 2 }}>
                {ButtonCard}
              </Box>
            )}
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            flexDirection={{ xs: 'column' }}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {PriceCard}
            {!stripeOpen && <Box sx={{ mt: 2 }}>{ButtonCard}</Box>}
          </Grid>
        </Grid>

        {/* Mobile: sticky bottom terms + button */}
        {!stripeOpen && (
          <Box
            sx={{
              display: { xs: 'block', sm: 'none' },
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: '#fff',
              boxShadow: '0 -8px 24px rgba(0,0,0,0.16)',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              px: 2,
              pt: 1.5,
              zIndex: 2000,
              height: 'fit-content',
            }}
          >
            {loading ? (
              <>
                <Skeleton height={20} width={280} />
                <Skeleton variant="rounded" height={44} sx={{ mt: 1.25 }} />
              </>
            ) : (
              <>
                <CustomCheckbox
                  control={control}
                  error={errors.rememberMe}
                  checked={agree}
                  onChange={(event, isChecked) => {
                    setAgree(!!isChecked);
                  }}
                  name={'agree'}
                  label={
                    <Typography variant="body2" color="text.secondary">
                      By clicking this, I agree to{' '}
                      <Typography component="span" color="primary" fontWeight={600}>
                        Terms & Conditions
                      </Typography>{' '}
                      and{' '}
                      <Typography component="span" color="primary" fontWeight={600}>
                        Privacy policy
                      </Typography>
                    </Typography>
                  }
                  marginLeft={'0rem'}
                />
                <Button
                  variant="filled"
                  fullWidth
                  disabled={!agree}
                  onClick={handlePayNow}
                  sx={{
                    my: 1,
                    color: '#fff',
                    position: 'relative',
                    height: 48,
                    display: 'inline-flex',
                  }}
                >
                  {isLoading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: '#fff',
                      }}
                    />
                  ) : (
                    'Pay Now'
                  )}
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>

      {/* Stripe Elements in Dialog */}
      <Dialog
        open={stripeOpen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            setStripeOpen(false);
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Enter your card details</DialogTitle>
        <DialogContent>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: stripeAppearance }}
            >
              <StripePaymentForm
                onSuccess={handlePaymentSuccess}
                onClose={() => setStripeOpen(false)}
              />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CohortCheckOut;
