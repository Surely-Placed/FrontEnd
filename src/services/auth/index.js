import { setAuthToken, setRefreshToken } from '@/hooks/CookiesUtils';
import { DEFAULT_ERROR_MSG } from '../../../utils/constants';
import {
  loginAPI,
  signupAPI,
  userInterestsAPI,
  googleLoginAPI,
  getInterestListAPI,
  verifyEmailAPI,
  verifyOTPAPI,
  passwordResetRequestAPI,
  passwordResetVerifyAPI,
  createPaymentIntentAPI,
  confirmPaymentAPI,
  myCohortsAPI,
  resendOtpAPI,
} from './api';

const login = async (payload) => {
  try {
    const data = await loginAPI(payload);
    const { access, refresh, profile, is_preference_saved } = data;
    setAuthToken(access);
    setRefreshToken(refresh);
    return {
      variant: 'success',
      msg: 'User login Successfully.',
      profile,
      is_preference_saved,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data.detail || DEFAULT_ERROR_MSG,
    };
  }
};

const signup = async (payload) => {
  try {
    const data = await signupAPI(payload);
    const { message, is_preference_saved } = data;
    return {
      variant: 'success',
      msg: message,
      is_preference_saved,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data.message || DEFAULT_ERROR_MSG,
    };
  }
};

const verifyEmail = async (payload) => {
  try {
    const data = await verifyEmailAPI(payload);
    return {
      variant: 'success',
      msg: data.message,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg:
        error?.response?.data.data.email[0] || error?.response?.data.message || DEFAULT_ERROR_MSG,
    };
  }
};

const passwordRequest = async (payload) => {
  try {
    const data = await passwordResetRequestAPI(payload);
    return {
      variant: 'success',
      msg: data.message,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg:
        error?.response?.data.data.email[0] || error?.response?.data.message || DEFAULT_ERROR_MSG,
    };
  }
};

const passwordVerify = async (payload) => {
  try {
    const data = await passwordResetVerifyAPI(payload);
    return {
      variant: 'success',
      msg: data.message,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.message || DEFAULT_ERROR_MSG,
    };
  }
};

const verifyOTP = async (payload) => {
  try {
    const data = await verifyOTPAPI(payload);
    const { message, tokens, is_preference_saved } = data;
    if (tokens) {
      setAuthToken(tokens.access);
      setRefreshToken(tokens.refresh);
    }
    return {
      variant: 'success',
      msg: message,
      is_preference_saved,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data.message || DEFAULT_ERROR_MSG,
    };
  }
};

const userInterests = async (payload) => {
  try {
    const data = await userInterestsAPI(payload);
    const { user, tokens } = data;
    setAuthToken(tokens.access);
    setRefreshToken(tokens.refresh);
    return {
      variant: 'success',
      msg: 'User interests updated successfully and logged in',
      user,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data.message || DEFAULT_ERROR_MSG,
    };
  }
};

const getInterest = async () => {
  try {
    const data = await getInterestListAPI();
    return {
      variant: 'success',
      msg: 'Interests retrieved successfully',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data.message || DEFAULT_ERROR_MSG,
    };
  }
};

const googleLogin = async (payload) => {
  try {
    const data = await googleLoginAPI(payload);
    const { access, refresh, profile, is_preference_saved } = data;
    setAuthToken(access);
    setRefreshToken(refresh);
    return {
      variant: 'success',
      msg: 'Google OAuth successful',
      profile,
      is_preference_saved,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data.message || DEFAULT_ERROR_MSG,
    };
  }
};


const createPaymentIntent = async (payload) => {
  try {
    const data = await createPaymentIntentAPI(payload);
    return {
      variant: 'success',
      msg: 'Payment intent created successfully',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.data?.error[0] || DEFAULT_ERROR_MSG,
    };
  }
};


const confirmPayment = async (payload) => {
  try {
    const data = await confirmPaymentAPI(payload);
    return {
      variant: 'success',
      msg: data?.message,
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.data?.error[0] ,
    };
  }
};

const myCohorts = async () => {
  try {
    const data = await myCohortsAPI();
    return {
      variant: 'success',
      msg: 'My cohorts retrieved successfully',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.data?.error[0] || DEFAULT_ERROR_MSG,
    };
  }
};

const resendOtp = async (payload) => {
  try {
    const data = await resendOtpAPI(payload);
    return {
      variant: 'success',
      msg: 'OTP resent to your email successfully',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.data?.error[0] || DEFAULT_ERROR_MSG,
    };
  }
};

export const AuthManager = {
  login,
  signup,
  userInterests,
  googleLogin,
  getInterest,
  verifyEmail,
  verifyOTP,
  passwordRequest,
  passwordVerify,
  createPaymentIntent,
  confirmPayment,
  myCohorts,
  resendOtp,
};
