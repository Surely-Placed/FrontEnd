'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

/**
 * Compact select — do not use TextField `select` (theme styles blow up height).
 */
export default function OpsSelect({
  label,
  value,
  onChange,
  options = [],
  sx,
  fullWidth = false,
  id = 'ops-select',
}) {
  const labelId = `${id}-label`;
  return (
    <FormControl
      size="small"
      fullWidth={fullWidth}
      sx={{
        minWidth: 140,
        height: 40,
        '& .MuiOutlinedInput-root': {
          height: 40,
          bgcolor: '#fff',
          borderRadius: '0.75rem',
          fontFamily: 'Inter, Arial, sans-serif',
        },
        '& .MuiSelect-select': {
          py: '8px !important',
          display: 'flex',
          alignItems: 'center',
          minHeight: 'unset !important',
          fontSize: '0.875rem',
          lineHeight: 1.4,
        },
        '& .MuiInputLabel-root': {
          lineHeight: 1.2,
          fontSize: '0.875rem',
        },
        ...sx,
      }}
    >
      <InputLabel id={labelId} shrink>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        notched
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
