'use client';
import { createTheme } from '@mui/material/styles';
import palette from './palette';

const theme = createTheme({
  palette,
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
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
