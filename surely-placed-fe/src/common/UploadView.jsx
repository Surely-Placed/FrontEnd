import { Box, Typography } from '@mui/material';
import { UploadIcon } from '../../public/images';
export default function UploadView({ type }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.75rem',
        alignItems: 'center'
      }}
    >
      <UploadIcon />

      <Box>
        <Typography
          color="extremes.dark"
          variant="subtitle1_bold"
          fontSize={{ xs: '0.875rem', sm: '1rem' }}
        >
          <Typography
            variant="subtitle1_bold"
            color="primary.background"
            component={'span'}
            sx={{
              textDecoration: 'underline',
            }}
          >
            Select
          </Typography>{' '}
          a file or drag and drop here
        </Typography>
        {type !== 'image' && (
          <Typography
            component={'p'}
            fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
            color="primary.placeholder"
            variant="body1"
          >
            PDF file size no more than 10MB
          </Typography>
        )}
      </Box>
    </Box>
  );
}
