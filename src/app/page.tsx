import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '@/components/Copyright';
import ProTip from '@/components/ProTip';

// Invert the black Next.js logo and white Vercel mark in dark mode.
const invertInDarkMode = { display: 'flex', '.dark &': { filter: 'invert(1)' } };

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: { xs: 6, md: 12 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' },
          gap: 4,
        }}
      >
        <Box sx={invertInDarkMode}>
          <Image src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        </Box>
        <Box>
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
            To get started, edit the{' '}
            <Box
              component="code"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'action.hover',
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
                fontSize: '0.85em',
              }}
            >
              page.tsx
            </Box>{' '}
            file.
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560 }}>
            Looking for a starting point or more instructions? Head over to the{' '}
            <MuiLink href="https://nextjs.org/learn">Next.js Learning center</MuiLink>,
            the{' '}
            <MuiLink href="https://mui.com/material-ui/getting-started/templates/">
              Material UI templates
            </MuiLink>
            , or the{' '}
            <MuiLink href="https://storybook.js.org/tutorials/">Storybook tutorials</MuiLink>
            .
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={
              <Box component="span" sx={invertInDarkMode}>
                <Image src="/vercel.svg" alt="" width={16} height={14} />
              </Box>
            }
            sx={{ borderRadius: 999, px: 3 }}
          >
            Deploy now
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ borderRadius: 999, px: 3 }}
          >
            Documentation
          </Button>
        </Stack>
        <Box>
          <ProTip />
          <Copyright sx={{ textAlign: { xs: 'center', sm: 'left' } }} />
        </Box>
      </Box>
    </Container>
  );
}
