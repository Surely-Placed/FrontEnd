import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './index.module.css';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const CustomPhoneInputField = ({
  name,
  control,
  label,
  error,
  placeholder,
  marginTop = 0,
  marginBottom = 0,
  labelClassname,
  required = false,
  disabled = false,
  dd = false,
  ...rest
}) => {
  return (
    <Box sx={{ marginBottom, marginTop, width: '100%' }}>
      {/* Label */}
      {label && (
        <Typography
          component="label"
          variant="body1"
          htmlFor={name}
          color={'text.subText'}
          lineHeight={'normal'}
          sx={{ ml: '0.25rem' }}
          className={labelClassname}
        >
          {label}
          {required && <span style={{ color: '#612FFF' }}> *</span>}
        </Typography>
      )}

      {/* Phone Input */}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Box
            className="common_dd_custom_phone_container__JJ9md"
            sx={{
              border: error ? '1px solid red' : '1px solid transparent',
              height: '2.9rem !important',
              '& .selected-flag, & .selected-flag *': {
                backgroundColor: 'transparent !important',          
              },
              '& .selected-flag.open, & .selected-flag.open *': {
                backgroundColor: 'transparent !important',
              },
              '& .react-tel-input': {
                mt: '0 !important',
                height: '2.75rem !important',
              },
              '& input': {
                height: '2.75rem !important',
                border: 'none',
              },
              '& .flag-dropdown': {
                height: '2.75rem !important',
                display: 'flex',
                alignItems: 'center',
              },
            }}
          >
            <PhoneInput
              country={'in'}
              value={typeof value === 'string' ? value : value ? String(value) : ''}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
              inputClass={dd ? styles.dd_custom_phone_input : styles.custom_phone_input}
              buttonClass={dd ? styles.dd_custom_phone_button : styles.custom_phone_button}
              containerClass={dd ? styles.dd_custom_phone_container : styles.custom_phone_container}
              dropdownClass={styles.custom_phone_dropdown}
              inputProps={{
                name,
                required,
              }}
              {...rest}
            />

            {error?.message && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: '4px', ml: '2px', display: 'block' }}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        )}
      />
    </Box>
  );
};

export default CustomPhoneInputField;
