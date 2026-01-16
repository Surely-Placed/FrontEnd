import * as yup from 'yup';

const linkedinRegex =
  /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/;

export const professionalBgSchema = yup.object({
  is_currently_working: yup.string().required('This field is required'),
  current_role: yup.string().required('Role is required'),
  company: yup.string().required('Company is required'),
  years_experience: yup.string().required('Experience is required'),
  linkedin_url: yup
    .string()
    .required('LinkedIn URL is required')
    .matches(linkedinRegex, 'Enter a valid LinkedIn profile/company URL'),
  interests: yup.array().min(1, 'At least one interest is required'),
  preferred_cohorts: yup.array().min(1, 'At least one cohort is required'),
});
