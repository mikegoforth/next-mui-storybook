'use client';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: grey[900], // Almost black, for primary actions and text
          dark: grey[700], // Dark gray, for hover states and emphasis
          light: grey[300], // Light gray, for subtle backgrounds or dividers
          contrastText: grey[50], // Very light gray for contrast on primary
        },
        secondary: {
          main: grey[500], // Medium gray, for secondary actions or information
          dark: grey[700],
          light: grey[300],
          contrastText: grey[900], // Almost black for contrast on secondary
        },
        background: {
          default: grey[50], // Very light gray background
          paper: '#ffffff', // White for surfaces like cards and dialogs
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: grey[100], // Almost white, for primary actions and text
          dark: grey[300], // Light gray, for hover states and emphasis
          light: grey[50],
          contrastText: grey[900], // Almost black for contrast on primary
        },
        secondary: {
          main: grey[500],
          dark: grey[700],
          light: grey[300],
          contrastText: grey[50],
        },
        background: {
          default: '#0a0a0a', // Near-black background
          paper: grey[900], // Dark gray for surfaces like cards and dialogs
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
