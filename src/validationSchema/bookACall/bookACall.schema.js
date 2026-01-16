import * as yup from 'yup';

// Validation schema for Book a Call form
const bookACallSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  phone: yup
    .string()
    .required('Phone Number is required')
    .matches(/^\+?\d{10,15}$/, 'Please enter a valid phone number'),
  timezone: yup.string().trim().required('Timezone is required'),
  preferredDate: yup
    .date()
    .typeError('Preferred date is required')
    .required('Preferred date is required')
    .min(new Date(new Date().setHours(0,0,0,0)), 'Please select today or a future date'),
  preferredTime: yup.string().trim().required('Preferred time is required'),
  message: yup.string().trim().required('Message is required'),
});

export default bookACallSchema;


