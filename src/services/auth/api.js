import { API_URLS } from '../../../utils/constants';
import axiosInstance from '../axiosInstance';

export const signupAPI = async (payload) => {
  return axiosInstance.post(API_URLS.SIGN_UP, payload).then((res) => res.data.data);
};
export const loginAPI = async (payload) => {
  return axiosInstance.post(API_URLS.LOGIN, payload).then((res) => res.data.data);
};

export const googleLoginAPI = async (payload) => {
  return axiosInstance
    .post(API_URLS.GOOGLE_LOGIN, payload, { skipAuth: true })
    .then((res) => res.data.data);
};

export const verifyEmailAPI = async (payload) => {
  return axiosInstance.post(API_URLS.VERIFY_EMAIL, payload).then((res) => res.data.data);
};

export const passwordResetRequestAPI = async (payload) => {
  return axiosInstance.post(API_URLS.PASSWORD_RESET_REQUEST, payload).then((res) => res.data.data);
};

export const passwordResetVerifyAPI = async (payload) => {
  return axiosInstance.post(API_URLS.PASSWORD_RESET_VERIFY, payload).then((res) => res.data.data);
};

export const verifyOTPAPI = async (payload) => {
  return axiosInstance.post(API_URLS.VERIFY_OTP, payload).then((res) => res.data.data);
};

export const userInterestsAPI = async (payload) => {
  return axiosInstance.post(API_URLS.INTEREST, payload).then((res) => res.data.data);
};

export const getInterestListAPI = async () => {
  return axiosInstance.get(API_URLS.INTEREST_LIST).then((res) => res.data.data);
};

export const myCohortsAPI = async () => {
  return axiosInstance.get(API_URLS.MY_COHORTS).then((res) => res.data.data);
};

export const createPaymentIntentAPI = async (payload) => {
  return axiosInstance.post(API_URLS.CREATE_PAYMENT_INTENT, payload).then((res) => res.data.data);
};

export const confirmPaymentAPI = async (payload) => {
  return axiosInstance.post(API_URLS.CONFIRM_PAYMENT, payload).then((res) => res.data.data);
};

export const resendOtpAPI = async (payload) => {
  return axiosInstance.post(API_URLS.RESEND_OTP, payload).then((res) => res.data.data);
};
