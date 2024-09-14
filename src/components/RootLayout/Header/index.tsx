'use client';

import React from 'react';
import {
  Container,
  Box,
  Toolbar,
  Typography,
  Button,
  AppBar,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import styles from './styles';

export default function Header() {
  return (
    <AppBar position="static" sx={styles.headerContainer}>
      <Container maxWidth="xl">
        <Toolbar sx={{ height: '64px' }} disableGutters>
          <AdbIcon sx={styles.brandIcon} />
          <Link href="/" passHref>
            <Typography variant="h6" sx={styles.brandText}>
              MyApp
            </Typography>
          </Link>
          <Box sx={styles.menuContainer}>
            <Button sx={styles.navLink}>
              <Link href="/" passHref>
                Home
              </Link>
            </Button>
            <Button sx={styles.navLink}>
              <Link href="/about" passHref>
                About
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
