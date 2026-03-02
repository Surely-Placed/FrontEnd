import React from 'react';
import { Controller } from 'react-hook-form';
import { RadioGroup, FormControl, Box, FormControlLabel, Radio, Typography } from '@mui/material';
import ErrorHelperText from './ErrorHelperText';

const CustomRadioGroup = ({ name, label, control, error, defaultValue = '' }) => {
  return (
    <FormControl component="fieldset">
      {label && (
        <Typography
          component={'label'}
          variant="body1"
          htmlFor={name}
          color={'text.subText'}
          lineHeight={'normal'}
          sx={{ ml: '0.25rem' }}
        >
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            {...field}
          >
            <FormControlLabel
              value="Yes"
              control={<Radio />}
              label="Yes"
              sx={{
                '& .MuiFormControlLabel-label': {
                  mt: '0.25rem',
                  color: 'text.subText',
                },
              }}
            />
            <FormControlLabel
              value="No"
              control={<Radio />}
              label="No"
              sx={{
                '& .MuiFormControlLabel-label': {
                  mt: '0.25rem',
                  color: 'text.subText',
                },
              }}
            />
          </RadioGroup>
        )}
      />
      {error?.message && <ErrorHelperText message={error.message} />}
    </FormControl>
  );
};

export default CustomRadioGroup;
