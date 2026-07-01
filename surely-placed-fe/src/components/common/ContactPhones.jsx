import Link from 'next/link';
import { Typography } from '@mui/material';
import { SITE_PHONES } from '@/config/site';

const ContactPhones = ({
  variant = 'body2',
  color = 'text.subText',
  separator = ' | ',
  className = 'link-styles',
}) => {
  return SITE_PHONES.map((phone, index) => (
    <span key={phone.tel}>
      {index > 0 && separator}
      <Link href={`tel:${phone.tel}`} className={className}>
        <Typography component="span" variant={variant} color={color}>
          {phone.display}
        </Typography>
      </Link>
    </span>
  ));
};

export default ContactPhones;
