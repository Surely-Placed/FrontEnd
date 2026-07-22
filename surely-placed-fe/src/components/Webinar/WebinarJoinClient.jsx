'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { claimWebinarJoinAccess, requestWebinarJoinOtp } from '@/lib/payments';
import { primaryCtaSx } from './styles';

const DEVICE_KEY = 'sp_webinar_device_v1';

function getOrCreateDeviceId() {
  try {
    const existing = window.localStorage.getItem(DEVICE_KEY);
    if (existing && existing.length >= 8) return existing;
    const next =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `dev_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(DEVICE_KEY, next);
    return next;
  } catch {
    return `dev_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}

/** Browser web client only; never pass registrant tk (that bypasses Zoom email login). */
function toBrowserZoomUrl(joinUrl) {
  if (!joinUrl) return joinUrl;
  try {
    const url = new URL(joinUrl);
    const pwd = url.searchParams.get('pwd') || '';
    const idMatch =
      url.pathname.match(/\/(?:j|w|wc\/join)\/(\d+)/i) ||
      url.pathname.match(/\/(\d{9,})(?:\/|$)/);
    const meetingNumber = idMatch?.[1];
    if (!meetingNumber) {
      url.searchParams.delete('tk');
      return url.toString();
    }
    const web = new URL(`https://${url.host}/wc/join/${meetingNumber}`);
    if (pwd) web.searchParams.set('pwd', pwd);
    web.searchParams.delete('tk');
    web.searchParams.set('fromPWA', '1');
    return web.toString();
  } catch {
    return joinUrl;
  }
}

function JoinInner() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(token ? 'email' : 'error');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    token ? '' : 'Missing join token. Open the link from your confirmation email.'
  );
  const [info, setInfo] = useState('');
  const [mustSignInAs, setMustSignInAs] = useState('');

  const openBrowserJoin = (joinUrl, paidEmail) => {
    if (!joinUrl) throw new Error('Join URL missing');
    setMustSignInAs(paidEmail || email);
    setStep('redirecting');
    // Stay in this tab — Zoom web client only
    window.location.replace(toBrowserZoomUrl(joinUrl));
  };

  const continueWithEmail = async () => {
    setLoading(true);
    setError('');
    setInfo('');
    try {
      const deviceId = getOrCreateDeviceId();
      // Always send a fresh OTP — never skip verification
      const result = await requestWebinarJoinOtp({ token, email, deviceId });
      setInfo(result.message || 'New code sent. Check your registration email.');
      setOtp('');
      setStep('otp');
    } catch (err) {
      setError(err?.message || 'Could not verify email');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndJoin = async () => {
    setLoading(true);
    setError('');
    try {
      const deviceId = getOrCreateDeviceId();
      const result = await claimWebinarJoinAccess({
        token,
        deviceId,
        email,
        otp,
      });
      openBrowserJoin(result.joinUrl, result.mustSignInAs || result.paidEmail);
    } catch (err) {
      setError(err?.message || 'Could not open Zoom access');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
      <Box textAlign="center">
        <Typography
          component="h1"
          variant="h4"
          fontFamily={'var(--font-avantgarde), sans-serif'}
          mb={1}
        >
          Webinar access
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Unlock with the email you paid with, then join Zoom in the browser only. Sign into Zoom
          with that same email — a different Gmail will be blocked.
        </Typography>

        {step === 'redirecting' ? (
          <Stack spacing={2} alignItems="center">
            <CircularProgress size={32} />
            <Typography color="text.secondary">Opening Zoom in your browser…</Typography>
            {mustSignInAs ? (
              <Alert severity="warning" sx={{ textAlign: 'left', maxWidth: 480 }}>
                On the next screen, sign into Zoom as <strong>{mustSignInAs}</strong>. If Zoom asks
                to open the desktop app, cancel and stay in the browser. A different Zoom account
                will not get in.
              </Alert>
            ) : null}
          </Stack>
        ) : step === 'error' && !token ? (
          <>
            <Typography color="error" mb={2}>
              {error}
            </Typography>
            <Button href="/webinar" variant="filled" sx={primaryCtaSx}>
              Back to webinar page
            </Button>
          </>
        ) : (
          <Stack spacing={2} textAlign="left">
            <Alert severity="info">
              A new OTP is required every time you join. This seat locks to one device only. Use
              the same email for payment → OTP → Zoom sign-in.
            </Alert>

            <TextField
              label="Email you paid with"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || step === 'otp'}
              required
            />

            {step === 'otp' && (
              <TextField
                label="6-digit code from email"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={loading}
                inputProps={{ inputMode: 'numeric', autoComplete: 'one-time-code' }}
                required
              />
            )}

            {info && (
              <Typography variant="body2" color="success.main">
                {info}
              </Typography>
            )}
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            {step === 'email' ? (
              <Button
                variant="filled"
                fullWidth
                disabled={loading || !email.trim()}
                onClick={continueWithEmail}
                sx={primaryCtaSx}
              >
                {loading ? (
                  <CircularProgress size={22} sx={{ color: 'extremes.light' }} />
                ) : (
                  'Continue'
                )}
              </Button>
            ) : (
              <>
                <Button
                  variant="filled"
                  fullWidth
                  disabled={loading || otp.length !== 6}
                  onClick={verifyAndJoin}
                  sx={primaryCtaSx}
                >
                  {loading ? (
                    <CircularProgress size={22} sx={{ color: 'extremes.light' }} />
                  ) : (
                    'Verify & join in browser'
                  )}
                </Button>
                <Button
                  variant="text"
                  disabled={loading}
                  onClick={() => {
                    setStep('email');
                    setOtp('');
                    setError('');
                    setInfo('');
                  }}
                >
                  Use a different email / resend
                </Button>
              </>
            )}
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default function WebinarJoinClient() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
          <CircularProgress size={32} />
        </Container>
      }
    >
      <JoinInner />
    </Suspense>
  );
}
