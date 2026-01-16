'use client';
import React from 'react';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import moment from 'moment-timezone';

const buildTimezoneOptions = () => {
  return moment.tz
    .names()
    .filter((z) => /\//.test(z))
    .map((zone) => {
      const offset = moment.tz(zone).utcOffset();
      const sign = offset >= 0 ? '+' : '-';
      const abs = Math.abs(offset);
      const oh = String(Math.floor(abs / 60)).padStart(2, '0');
      const om = String(abs % 60).padStart(2, '0');
      const label = `${zone} (UTC${sign}${oh}:${om})`;
      return { label, value: zone, offsetMinutes: offset };
    })
    .sort((a, b) => a.offsetMinutes - b.offsetMinutes || a.label.localeCompare(b.label));
};

const CustomTimezoneSelect = ({ name, control, label = 'Timezone', error, placeholder = 'Select timezone' }) => {
  const options = React.useMemo(() => buildTimezoneOptions(), []);
  return (
    <Box width="100%">
      {label && (
        <Typography variant="body1" color="text.subText" mb={1} sx={{ ml: '0.25rem' }}>
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            sx={{ mt: '0.5rem', width: '100%' }}
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={Boolean(error)}
            helperText={error?.message}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: '#9E9E9E' }}>{placeholder}</span>;
                  }
                  const found = options.find((o) => o.value === selected);
                  return found ? found.label : selected;
                },
                MenuProps: {
                  PaperProps: { style: { maxHeight: 48 * 6 } },
                },
              },
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.75rem',
                },
              },
            }}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
};

export default CustomTimezoneSelect;


