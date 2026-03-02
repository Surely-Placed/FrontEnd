import { Box } from '@mui/material';
const CheckedCheckBox = () => {
  return (
    <Box
      component="span"
      sx={{
        width: 20,
        height: 20,
        border: '1px solid #2857C4',
        borderRadius: '6px',
        backgroundColor: '#2857C4',
        position: 'relative',

        '&::after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          top: '5px',
          left: '3px',
          width: '12px',
          height: '6px',
          borderBottom: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          transform: 'rotate(-45deg)',
        },
      }}
    />
  );
};

export default CheckedCheckBox;
