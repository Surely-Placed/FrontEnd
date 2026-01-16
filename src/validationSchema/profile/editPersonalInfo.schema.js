import * as yup from 'yup';

export const editPersonalInfoSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email Address is required'),
  first_name: yup.string().required('Name is required'),
  mobile: yup
    .string()
    .required('Phone Number is required')
    .matches(/^\+?\d{10,15}$/, 'Please enter a valid phone number'),
});
