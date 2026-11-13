import * as React from 'react';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Link from '@/components/Link';

export default function Copyright({ sx, ...props }: TypographyProps) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[{ color: 'text.secondary' }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {'Copyright © '}
      <MuiLink component={Link} color="inherit" href="/">
        MyApp
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
