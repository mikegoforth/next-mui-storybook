import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ComponentGallery from '@/components/ComponentGallery';
import ProTip from '@/components/ProTip';
import SeedPicker from '@/components/SeedPicker';
import TonalPalettes from '@/components/TonalPalettes';

// Invert the black Next.js logo and white Vercel mark where the ground flips.
const invertInDarkMode = { display: 'flex', '.dark &': { filter: 'invert(1)' } };

// Inline code chips: the page ground inside the hero's colored panel, a
// surface-container tier on the page ground, so the chip always shows.
const inlineCode = {
  typography: 'code',
  fontSize: '0.82em',
  lineHeight: 'inherit',
  px: '0.3em',
  borderRadius: '0.25em',
  whiteSpace: 'nowrap',
  bgcolor: 'background.default',
  color: 'text.primary',
};
const inlineCodeOnGround = { ...inlineCode, bgcolor: 'background.containerHigh' };

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 1, md: 3 }, pb: 6 }}>
      <Box
        component="section"
        aria-labelledby="get-started"
        sx={{
          bgcolor: 'primary.container',
          color: 'primary.onContainer',
          borderRadius: { xs: '28px', md: '32px' },
          p: { xs: 3, sm: 5, md: 7 },
          display: 'grid',
          gap: { xs: 5, md: 7 },
          gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <Box sx={invertInDarkMode}>
            <Image src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
          </Box>
          <Box>
            <Typography id="get-started" variant="h1" sx={{ mb: 2.5 }}>
              To get started, edit the{' '}
              <Box component="code" sx={inlineCode}>
                page.tsx
              </Box>{' '}
              file.
            </Typography>
            <Typography sx={{ maxWidth: 540 }}>
              Looking for a starting point or more instructions? Head over to the{' '}
              <MuiLink href="https://nextjs.org/learn" color="inherit">
                Next.js Learning center
              </MuiLink>
              , the{' '}
              <MuiLink
                href="https://mui.com/material-ui/getting-started/templates/"
                color="inherit"
              >
                Material UI templates
              </MuiLink>
              , or the{' '}
              <MuiLink href="https://storybook.js.org/tutorials/" color="inherit">
                Storybook tutorials
              </MuiLink>
              .
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1.5, alignSelf: { xs: 'stretch', sm: 'auto' } }}>
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
            >
              Deploy now
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </Button>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          <Box>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              One seed, every color
            </Typography>
            <Typography variant="body2">
              Every color on this page is generated from a single seed. Pick one to
              re-theme the app; set{' '}
              <Box component="code" sx={inlineCode}>
                DEFAULT_SEED
              </Box>{' '}
              in{' '}
              <Box component="code" sx={inlineCode}>
                src/theme.ts
              </Box>{' '}
              to keep it.
            </Typography>
          </Box>
          <SeedPicker />
          <TonalPalettes />
        </Box>
      </Box>

      <Box component="section" aria-labelledby="components" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box sx={{ mb: 4, maxWidth: 720 }}>
          <Typography id="components" variant="h2" sx={{ mb: 1.5 }}>
            Components, themed
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Real Material UI components reading every color, shape and font from the
            theme. The same gallery renders in Storybook with{' '}
            <Box component="code" sx={inlineCodeOnGround}>
              npm run storybook
            </Box>
            .
          </Typography>
        </Box>
        <ComponentGallery />
      </Box>

      <Box sx={{ mt: 6 }}>
        <ProTip />
      </Box>
    </Container>
  );
}
