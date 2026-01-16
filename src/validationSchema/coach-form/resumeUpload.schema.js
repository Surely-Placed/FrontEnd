import * as yup from 'yup';
import { SUPPORTED_FORMATS } from '../../../utils/constants';

export const resumeUploadSchema = yup.object({
  cv: yup
    .mixed()
    .required('Resume is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed: pdf, doc, docx',
      (value) => {
        if (!value) return false;
        return SUPPORTED_FORMATS['document'].includes(value.type);
      }
    )
    .test(
      'fileSize',
      'File size is too large. Maximum allowed is 10MB',
      (value) => {
        if (!value) return false;
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        return value.size <= MAX_SIZE;
      }
    ),
});
