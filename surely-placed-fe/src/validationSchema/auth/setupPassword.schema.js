import * as yup from 'yup';

export const setupPasswordSchema = yup.object({
  password: yup
    .string()
    .min(
      8,
      'Password must be at least 8  characters long with atleast one Uppercase letter,number and special character like (@, $, !, %, *, ?, &)'
    )
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*()_\-+=]/,
      'Password must contain at least one special character like (@, $, !, %, *, ?, &)'
    )
    .required('New Password is required'),

  password_confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
