import * as yup from 'yup';
import { SUPPORTED_FORMATS } from '../../../utils/constants';

export const uploadProfile = yup.object({
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Unsupported file format. Allowed: jpg, jpeg, png, webp', (value) => {
      if (!value) return false;
      const allowedFormats = SUPPORTED_FORMATS['image'];
      return allowedFormats.includes(value.type);
    }),
});
