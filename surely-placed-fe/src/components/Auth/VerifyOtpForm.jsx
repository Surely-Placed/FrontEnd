'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TermsAndUse from '@/common/TermsAndUse';
import LoadingButton from '@/common/LoadingButton';
import { showToast } from '@/hooks/showToast';
import { AuthManager } from '@/services/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setLoading } from '@/store/loading/loading.reducer';
import { PAGE_URLS } from '../../../utils/constants';
import { consumeReturnUrl } from '@/hooks/useAuthRedirect';

const VerifyOtpForm = () => {
  const OTP_LENGTH = 6;
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');
  const [isIncorrect, setIsIncorrect] = useState(false);
  const inputRefs = useRef(Array.from({ length: OTP_LENGTH }, () => React.createRef()));

  const userData = JSON.parse(sessionStorage.getItem('signupPayload'));

  const dispatch = useDispatch();
  const router = useRouter();

  const getClipboardText = (e) => {
    const cd =
      e.clipboardData || (e.nativeEvent && e.nativeEvent.clipboardData) || window.clipboardData;
    const raw = cd ? (cd.getData ? cd.getData('text') : cd.getData('Text')) : '';
    return (raw || '').toString();
  };

  // resend timer (start only when user taps Resend)
  const RESEND_SECONDS = 30;
  const [secondsLeft, setSecondsLeft] = useState(0);
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const formattedTimer = useMemo(() => {
    const m = Math.floor(secondsLeft / 60).toString();
    const s = (secondsLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [secondsLeft]);

  const onSubmit = async () => {
    const code = otpValues.join('');
    if (code.length !== OTP_LENGTH || otpValues.some((v) => v === '')) {
      setOtpError('OTP is required');
      showToast('Please enter otp to continue', 'error');
      setIsIncorrect(false);
      return;
    }
    setOtpError('');
    let signupPayload = null;
    try {
      if (typeof window !== 'undefined') {
        const raw = sessionStorage.getItem('signupPayload');
        if (raw) signupPayload = JSON.parse(raw);
      }
    } catch (_) {}
    const payload = { otp: code, ...signupPayload };
    // After successful verification, clear the temporary payload
    dispatch(setLoading({ key: 'verifyOtp', value: true }));

    try {
      await AuthManager.verifyOTP(payload).then(({ variant, msg = '', is_preference_saved }) => {
        if (variant === 'success') {
          showToast(msg, 'success');
          sessionStorage.removeItem('signupPayload');
          // If preferences are not saved, take user to preferences first.
          if (!is_preference_saved) {
            router.push(PAGE_URLS.PREFERENCES);
            return;
          }
          // Preferences already saved: respect stored return URL if present, otherwise go home
          const returnUrl = consumeReturnUrl();
          if (returnUrl) {
            router.push(returnUrl);
          } else {
            router.push(PAGE_URLS.HOME);
          }
        } else {
          showToast(msg, 'error');
        }
      });
    } finally {
      dispatch(setLoading({ key: 'verifyOtp', value: false }));
    }
  };

  const resendOtp = async () => {
    let payload = {
      email: userData.email,
    };
    try {
      const { msg } = await AuthManager.resendOtp(payload);
      showToast(msg, 'success');
    } catch (error) {
      console.log(error);
      showToast(msg, 'error');
    }
  };

  return (
    <Box>
      <Box mb={'1.5rem'} />

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Stack spacing={'1.5rem'} sx={{ pb: { xs: '5.5rem', sm: 0 } }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: '.5rem' }} color="text.subText">
              Enter OTP
            </Typography>
            <Stack direction={'row'} spacing={1.5}>
              {otpValues.map((val, idx) => (
                <Box
                  key={idx}
                  component="input"
                  value={val}
                  inputMode="numeric"
                  type="text"
                  autoComplete="one-time-code"
                  maxLength={1}
                  ref={inputRefs.current[idx]}
                  onChange={(e) => {
                    const raw = e.target.value || '';
                    if (
                      (e.nativeEvent && e.nativeEvent.inputType === 'insertFromPaste') ||
                      raw.length > 1
                    ) {
                      // paste is handled in onPaste
                      return;
                    }
                    const next = raw.replace(/\D/g, '').slice(0, 1);
                    const updated = [...otpValues];
                    updated[idx] = next;
                    setOtpValues(updated);
                    setOtpError('');
                    setIsIncorrect(false);
                    if (next && idx < OTP_LENGTH - 1) {
                      inputRefs.current[idx + 1]?.current?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    const key = e.key;
                    if (e.ctrlKey || e.metaKey) return; // allow shortcuts like Ctrl+V
                    const isNumber = /[0-9]/.test(key);
                    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                    if (!isNumber && !allowed.includes(key)) {
                      e.preventDefault();
                    }
                    if (key === 'Backspace' && !otpValues[idx] && idx > 0) {
                      const prev = inputRefs.current[idx - 1]?.current;
                      prev?.focus();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const text = getClipboardText(e).replace(/\D/g, '');
                    if (!text) return;
                    const updated = [...otpValues];
                    let writeIndex = idx;
                    for (let i = 0; i < text.length && writeIndex < OTP_LENGTH; i++) {
                      updated[writeIndex] = text[i];
                      writeIndex++;
                    }
                    setOtpValues(updated);
                    setOtpError('');
                    setIsIncorrect(false);
                    const lastIndex = Math.min(writeIndex - 1, OTP_LENGTH - 1);
                    inputRefs.current[lastIndex]?.current?.focus();
                  }}
                  sx={{
                    width: ' 2.5rem',
                    height: '2.5rem',
                    textAlign: 'center',
                    borderRadius: '0.75rem',
                    border: '1px solid',
                    borderColor: otpError || isIncorrect ? 'error.main' : '#D6D6D6',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    outline: 'none',
                    '&:focus': {
                      outline: 'none',
                      borderColor: '#2857C4',
                    },
                  }}
                />
              ))}
            </Stack>
            <Stack direction={'row'} spacing={1} alignItems={'center'} sx={{ mt: '.75rem' }}>
              <Box
                component="button"
                disabled={secondsLeft > 0}
                onClick={() => {
                  setSecondsLeft(RESEND_SECONDS);
                  resendOtp();
                }}
                sx={{
                  border: 'none',
                  background: 'transparent',
                  color: secondsLeft > 0 ? 'text.disabled' : 'primary.main',
                  cursor: secondsLeft > 0 ? 'not-allowed' : 'pointer',
                  padding: 0,
                  fontFamily: 'var(--font-nexa), Arial, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                }}
              >
                Resend
              </Box>
              {secondsLeft > 0 && <Typography variant="body1">in {formattedTimer} s</Typography>}
            </Stack>
            {(otpError || isIncorrect) && (
              <Typography variant="caption" color={'error'} sx={{ mt: '.5rem', display: 'block' }}>
                {isIncorrect ? 'Incorrect OTP. Try again.' : otpError}
              </Typography>
            )}
          </Box>
          <LoadingButton label={'Verify OTP'} loadingKey={'verifyOtp'} type={'submit'} />
          <TermsAndUse />
        </Stack>
      </Box>
    </Box>
  );
};

export default VerifyOtpForm;
