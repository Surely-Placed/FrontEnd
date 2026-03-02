'use client';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, VisibilityOn } from '../../public/images';

const CustomTextField = ({
  name,
  control,
  label,
  error,
  placeholder,
  marginTop = 0,
  marginBottom = 0,
  type = 'text',
  lineHeight,
  showPassword = false,
  multiline = false,
  inputTextColor,
  labelColor,
  border,
  required = false,
  InputProps,
  disabled = false,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClickShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Box sx={{ marginBottom: marginBottom, mt: marginTop }}>
      {label && (
        <Typography
          component={'label'}
          variant="body1"
          htmlFor={name}
          color={'text.subText'}
          lineHeight={'normal'}
          sx={{ ml: '0.25rem', mb: '0.75rem', display: 'inline-block' }}
        >
          {label}
          {required && <span style={{ color: '#612FFF' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (e) => {
            let value = e.target.value;
            field.onChange(value);
          };
          return (
            <TextField
              autoComplete="off"
              className="mui_textField_custom_textField"
              multiline={multiline}
              disabled={disabled}
              {...field}
              placeholder={placeholder}
              type={showPassword ? (isPasswordVisible ? 'text' : 'password') : type}
              id={name}
              error={Boolean(error)}
              helperText={error?.message}
              {...rest}
              onChange={handleChange}
              InputProps={{
                ...InputProps,
                sx: {
                  '& input': {
                    padding: '0.75rem 1rem',
                  },
                },
                ...(showPassword
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {isPasswordVisible ? (
                              <VisibilityOn sx={{ height: 20, width: 20, color: '#fff' }} />
                            ) : (
                              <VisibilityOff sx={{ height: 20, width: 20, color: '#fff' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : {}),
              }}
            />
          );
        }}
      />
    </Box>
  );
};

export default CustomTextField;
