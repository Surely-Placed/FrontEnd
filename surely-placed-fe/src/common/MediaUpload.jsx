'use client';
import { Controller } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';
import ErrorHelperText from '../common/ErrorHelperText';
import { useState, useRef } from 'react';
// import { MediaManager } from "@/services/media/api";
import { showToast } from '@/hooks/showToast';
import UploadView from './UploadView';
import { SUPPORTED_FORMATS } from '../../utils/constants';
import CustomLoader from './CustomLoader';

const MediaUpload = ({ name, control, label, error, type = '', acceptedType, ...rest }) => {
  const [fileName, setfileName] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = async (e, formOnChange) => {
    const file = e.target.files[0];

    const supported = SUPPORTED_FORMATS[type] || SUPPORTED_FORMATS.document;

    if (!supported.includes(file.type)) {
      showToast(
        type === 'profile'
          ? 'Unsupported file format. Please upload a JPG, PNG, or WEBP image.'
          : 'Unsupported file format. Please upload a PDF, DOC, or DOCX file.',
        'error'
      );
      e.target.value = null;
      return;
    }
    setisLoading(true);
    try {
      //   const { readUrl, variant, msg, publicUrl } =
      //     await MediaManager.uploadMedia(file);

      //   if (variant == "success") {
      // const imageUrl = readUrl.split("?")[0];

      formOnChange(file);
      setfileName(file.name);
      showToast('Media uploaded successfully!', 'success');

    } catch (error) {
      console.error('Error while uploading media ', error);
      formOnChange(null);
      showToast('An unexpected error occurred during upload.', 'error');
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
      }}
    >
      {label && (
        <Typography
          component={'label'}
          variant="subtitle1"
          htmlFor={name}
          color={'text.subText'}
          sx={{ ml: '0.25rem', mb: 1 }}
        >
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value, ...field } }) => (
          <>
            <Button
              disabled={isLoading}
              component="label"
              tabIndex={-1}
              sx={{
                border: '2px dashed #93ABE1',
                backgroundColor: '#F0F5FF',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'none',
                borderRadius: '0.75rem',
                position: 'relative',
              }}
            >
              <input
                ref={fileInputRef}
                {...field}
                accept={acceptedType}
                type="file"
                hidden
                onChange={(e) => {
                  handleFileChange(e, onChange);
                }}
                {...rest}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {isLoading ? (
                  <CustomLoader />
                ) : value ? (
                  <Box>
                    <Typography color="#612fff" variant="subtitle1">
                      Selected: {fileName}
                    </Typography>
                  </Box>
                ) : (
                  <UploadView type={type} />
                )}
              </Box>
            </Button>
          </>
        )}
      />

      {error?.message && <ErrorHelperText errorMessage={error.message} />}
    </Box>
  );
};

export default MediaUpload;
