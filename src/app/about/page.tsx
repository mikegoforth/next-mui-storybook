import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@/components/Link';
import ProTip from '@/components/ProTip';

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          About
        </Typography>
        <Typography sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
          A starter that pairs the Next.js App Router with Material UI and
          Storybook.
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant="contained" component={Link} href="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
      </Box>
    </Container>
  );
}
