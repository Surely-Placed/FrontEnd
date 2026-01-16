'use client';
import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import ErrorHelperText from './ErrorHelperText';
import { DropdownIcon } from '../../public/images';

const CustomSelect = ({
  name,
  control,
  label,
  error,
  placeholder = 'Select an option',
  marginBottom = '0.75rem',
  options = [],
  disabled = false,
  multiselect = false,
  ...rest
}) => {
  return (
    <Box sx={{ marginBottom }}>
      {label && (
        <Typography
          component="label"
          variant="body1"
          htmlFor={name}
          color="text.subText"
          lineHeight="normal"
          sx={{ ml: '0.25rem' }}
        >
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = multiselect
            ? Array.isArray(field.value)
              ? field.value
              : [] // ensure it's an array
            : (field.value ?? '');

          return (
            <FormControl fullWidth sx={{ mt: '0.375rem' }}>
              <Select
                {...field}
                value={value}
                id={name}
                multiple={multiselect}
                displayEmpty
                disabled={disabled}
                IconComponent={DropdownIcon}
                error={Boolean(error)}
                onChange={(e) => {
                  const newValue = multiselect
                    ? typeof e.target.value === 'string'
                      ? e.target.value.split(',')
                      : e.target.value
                    : e.target.value;
                  field.onChange(newValue);
                }}
                renderValue={(selected) => {
                  if (multiselect) {
                    if (!selected || selected.length === 0)
                      return (
                        <Typography
                          color="primary.placeholder"
                          variant="body1"
                          lineHeight="normal"
                          mt={0.5}
                        >
                          {placeholder}
                        </Typography>
                      );

                    const selectedLabels = options
                      .filter((opt) => selected.includes(opt.value))
                      .map((opt) => opt.label)
                      .join(', ');
                    return (
                      <Typography sx={{ color: '#374151', fontSize: '0.875rem' }}>
                        {selectedLabels}
                      </Typography>
                    );
                  }

                  if (!selected)
                    return (
                      <Typography
                        color="primary.placeholder"
                        variant="body1"
                        lineHeight="normal"
                        mt={0.5}
                      >
                        {placeholder}
                      </Typography>
                    );

                  const selectedOption = options.find((opt) => opt.value === selected);
                  return (
                    <Typography sx={{ color: '#374151', fontSize: '0.875rem' }}>
                      {selectedOption?.label || selected}
                    </Typography>
                  );
                }}
                sx={{
                  borderRadius: '0.5rem',
                  backgroundColor: '#fff',
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                  pr: '1rem',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.5rem',
                  },
                  '& .MuiSelect-select': {
                    padding: '0.625rem 0rem 0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    color: field.value ? '#374151' : '#9ca3af',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'normal',
                    height: 'fit-content',                    
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D5D7DA',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#612FFF',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#612FFF',
                    borderWidth: '2px',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#717680',
                  },
                }}
                {...rest}
              >
                {options?.map((option) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {multiselect && (
                      <Checkbox checked={value.includes(option?.value)} sx={{ p: 0.5, mr: 1 }} />
                    )}
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          color="grayColor.dark"
                          lineHeight="1.5rem"
                          textTransform="capitalize"
                        >
                          {option.label}
                        </Typography>
                      }
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />
      {error?.message && <ErrorHelperText message={error.message} />}
    </Box>
  );
};

export default CustomSelect;
