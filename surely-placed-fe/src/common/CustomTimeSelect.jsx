'use client';
import React from 'react';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const generateTimes = (intervalMinutes = 30) => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      const hour12 = ((h + 11) % 12) + 1;
      const ampm = h < 12 ? 'AM' : 'PM';
      const mm = m.toString().padStart(2, '0');
      const label = `${hour12}:${mm} ${ampm}`;
      const value = `${h.toString().padStart(2, '0')}:${mm}`;
      times.push({ label, value, minutesSinceMidnight: h * 60 + m });
    }
  }
  return times;
};

const allOptions = generateTimes(30);

const getNextSlot = (minutes) => {
  const next = Math.ceil(minutes / 30) * 30;
  const opt = allOptions.find((o) => o.minutesSinceMidnight >= next);
  return opt ? opt.value : '';
};

const toMinutes = (value) => {
  if (!value) return NaN;
  const [h, m] = value.split(':').map((v) => parseInt(v, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return NaN;
  return h * 60 + m;
};

const CustomTimeSelect = ({
  name,
  control,
  label,
  error,
  placeholder = '08:30 AM',
  selectedDate,
  selectedTimezone,
}) => {
  const tz = selectedTimezone || dayjs.tz.guess();
  const nowTz = dayjs().tz(tz);
  const isSameDay = selectedDate ? dayjs(selectedDate).tz(tz).isSame(nowTz, 'day') : false;
  const minutesNow = nowTz.hour() * 60 + nowTz.minute();
  const options = isSameDay
    ? allOptions.filter((o) => o.minutesSinceMidnight > minutesNow)
    : allOptions;

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
        render={({ field }) => {
          // Auto-correct value when today: ensure next valid slot is selected
          let effectiveValue = field.value || '';
          if (isSameDay) {
            const mv = toMinutes(effectiveValue);
            if (!effectiveValue || Number.isNaN(mv) || mv <= minutesNow) {
              const next = getNextSlot(minutesNow);
              if (next && next !== effectiveValue) {
                field.onChange(next);
                effectiveValue = next;
              } else if (!next) {
                // No future slots left today; leave empty to show placeholder
                effectiveValue = '';
              }
            }
          }

          return (
            <TextField
              select
              fullWidth
              value={effectiveValue}
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
                    const found = allOptions.find((o) => o.value === selected);
                    return found ? found.label : selected;
                  },
                  MenuProps: {
                    PaperProps: {
                      style: { maxHeight: 48 * 4 },
                    },
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
          );
        }}
      />
    </Box>
  );
};

export default CustomTimeSelect;
