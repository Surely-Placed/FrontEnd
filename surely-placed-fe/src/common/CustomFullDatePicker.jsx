'use client';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Controller, useWatch } from 'react-hook-form';
import { CalendarIcon } from '../../public/images';

dayjs.extend(utc);
dayjs.extend(timezone);

const CustomFullDatePicker = ({
  name,
  control,
  label,
  marginBottom = '1.5rem',
  error,
  disableMinDate = false,
  timezone: selectedTimezone,
}) => {
  const selectedDay = useWatch({ control, name });
  const [open, setOpen] = useState(false);

  return (
    <Box width="100%" mb={marginBottom}>
      {label && (
        <Typography variant="body1" color="text.subText" mb={1} sx={{ ml: '0.25rem' }}>
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
               minDate={disableMinDate ? undefined : (selectedTimezone ? dayjs().tz(selectedTimezone) : dayjs())}
              value={selectedDay ? (selectedTimezone ? dayjs(selectedDay).tz(selectedTimezone) : dayjs(selectedDay)) : null}
              onChange={(val) => {
                if (!val) {
                  field.onChange(null);
                } else {
                  const d = selectedTimezone ? val.tz(selectedTimezone).startOf('day').toDate() : val.toDate();
                  field.onChange(d);
                }
                setOpen(false);
              }}
              slotProps={{
                textField: {
                  onClick: () => setOpen(true),
                  fullWidth: true,
                  error: Boolean(error),
                  helperText: error?.message,
                   sx: {
                     width: '100%',
                     '& .MuiOutlinedInput-root': {
                       borderRadius: '0.75rem',
                     },
                   },
                }
              }}
              
              slots={{
                openPickerIcon: CalendarIcon,
              }}
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
};

export default CustomFullDatePicker;


