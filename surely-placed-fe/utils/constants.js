export const SUPPORTED_FORMATS = {
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  image: ['image/jpeg', 'image/png', 'image/webp'],
};

export const API_URLS = {

  // Profile
  FETCH_USER_DETAILS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/user-detail/me/`,
  UPDATE_USER_DETAILS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/user-detail/`,
  USER_SUPPORT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-support/`,

  // Coach Form
  ADD_COACH: `${process.env.NEXT_PUBLIC_API_BASE_URL}/become-coach/`,
  FECTH_DOMAINS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/interests/`,
  FECTH_COHORTS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cohorts/`,

  // Homepage
  STUDENT_STORIES: `${process.env.NEXT_PUBLIC_API_BASE_URL}/student-stories/`,
  FAQS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/faqs/`,
  COHORTS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cohorts`,
  MEET_OUR_TEAM: `${process.env.NEXT_PUBLIC_API_BASE_URL}/meet-our-team/`,
  MEET_OUR_COACHES: `${process.env.NEXT_PUBLIC_API_BASE_URL}/meet-our-coach/`,
  BOOK_A_CALL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-call/`,

  //Auth
  SIGN_UP: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup/`,
  LOGIN: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/token/`,
  VERIFY_EMAIL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/verify-email/`,
  VERIFY_OTP: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/verify-otp/`,
  PASSWORD_RESET_REQUEST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/password-reset-request/`,
  PASSWORD_RESET_VERIFY: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/password-reset/`,
  RESEND_OTP: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/resend-otp/`,

  INTEREST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/user-interests/`,
  INTEREST_LIST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/interests/`,
  // Social auth
  GOOGLE_LOGIN: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/google-auth/`,

  //Payments
  CREATE_PAYMENT_INTENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create-payment-intent/`,
  CONFIRM_PAYMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/confirm-payment/`,
  MY_COHORTS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-enrolled-cohorts/`,
};

export const PAGE_URLS = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  CHANGE_PASSWORD: '/change-password',
  PREFERENCES: '/preferences',
  HOME: '/',
  VERIFY_EMAIL: '/verify-email',
};

export const DEFAULT_ERROR_MSG = 'Something went wrong, Please try again later!';
