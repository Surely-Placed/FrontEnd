import * as yup from 'yup';

// Validation schema for Book a Call form
export const signupSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email Address is required'),
});
