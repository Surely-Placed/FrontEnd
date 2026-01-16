import { Controller } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import CheckedCheckBox from './CheckedCheckBox';

function CustomCheckbox({ name, label, error, control, onChange, checked, marginLeft, ...props }) {
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={checked}
                onChange={onChange}
                {...props}
                icon={
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: name === 'rememberMe' ? '1px solid #D5D7DA' : '2px solid #7D8398',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                    }}
                  />
                }
                checkedIcon={<CheckedCheckBox />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&.Mui-disabled:not(.Mui-checked) .MuiSvgIcon-root': {
                    fill: '#D5D7DA',
                  },
                  marginLeft: marginLeft ? marginLeft : '1.5rem',
                }}
              />
            }
            label={label}
            sx={{
              '& .MuiFormControlLabel-label': {
                color: '#535862',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.5rem',
              },
            }}
          />
        )}
      />
    </Box>
  );
}

export default CustomCheckbox;
