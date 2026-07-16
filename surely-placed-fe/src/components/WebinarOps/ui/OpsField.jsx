'use client';

import { TextField } from '@mui/material';

const inputPadding = {
  paddingTop: 14,
  paddingRight: 16,
  paddingBottom: 14,
  paddingLeft: 16,
  height: 'auto',
  lineHeight: 1.5,
  boxSizing: 'border-box',
  fontFamily: 'Inter, Arial, sans-serif',
  overflow: 'visible',
};

export default function OpsField({
  sx,
  InputLabelProps,
  InputProps,
  slotProps,
  size: _size,
  fullWidth = true,
  type,
  select = false,
  ...rest
}) {
  return (
    <TextField
      {...rest}
      type={type}
      select={select}
      size="medium"
      variant="outlined"
      fullWidth={fullWidth}
      slotProps={{
        ...slotProps,
        inputLabel: {
          shrink:
            select || type === 'datetime-local' || type === 'date' || type === 'time'
              ? true
              : InputLabelProps?.shrink,
          ...InputLabelProps,
          ...slotProps?.inputLabel,
        },
        input: {
          ...InputProps,
          ...slotProps?.input,
          sx: {
            minHeight: select ? 48 : 52,
            maxHeight: select ? 48 : undefined,
            alignItems: 'center',
            bgcolor: '#fff',
            ...(select
              ? {
                  '& .MuiSelect-select': {
                    py: '12px !important',
                    px: '14px !important',
                    pr: '40px !important',
                    minHeight: 'unset !important',
                    height: '24px !important',
                    lineHeight: '24px !important',
                    display: 'block',
                    boxSizing: 'content-box',
                    fontFamily: 'Inter, Arial, sans-serif',
                  },
                }
              : {
                  '& input': inputPadding,
                  '& textarea': inputPadding,
                }),
            ...InputProps?.sx,
            ...slotProps?.input?.sx,
          },
        },
        ...(select
          ? {}
          : {
              htmlInput: {
                ...slotProps?.htmlInput,
                style: {
                  ...inputPadding,
                  ...slotProps?.htmlInput?.style,
                },
              },
            }),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          minHeight: select ? 48 : 52,
          maxHeight: select ? 48 : undefined,
          alignItems: 'center',
        },
        ...(select
          ? {}
          : {
              '& .MuiOutlinedInput-input': inputPadding,
            }),
        '& .MuiInputLabel-root': { lineHeight: 1.4, color: '#545454' },
        '& .MuiFormHelperText-root': { lineHeight: 1.4, mx: '2px', mt: 0.75 },
        ...sx,
      }}
    />
  );
}
