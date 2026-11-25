'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import ModeSwitch from '@/components/ModeSwitch';

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();
  // Material 3 top app bars switch to a container color once content scrolls under them.
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: scrolled ? 'background.container' : 'background.default',
        color: 'text.primary',
        transition: 'background-color 200ms cubic-bezier(0.2, 0, 0, 1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 64 } }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-label="Open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.href}
                  component={Link}
                  href={page.href}
                  selected={pathname === page.href}
                  aria-current={pathname === page.href ? 'page' : undefined}
                  onClick={handleCloseNavMenu}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              mr: 2,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Logo />
            <Typography variant="h6" component="span" noWrap>
              MyApp
            </Typography>
          </Box>
          <Box
            component="nav"
            aria-label="Main"
            sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}
          >
            {pages.map((page) => {
              const active = pathname === page.href;
              return (
                <Button
                  key={page.href}
                  component={Link}
                  href={page.href}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    color: active ? 'secondary.onContainer' : 'text.secondary',
                    bgcolor: active ? 'secondary.container' : 'transparent',
                    paddingInline: 2,
                    '&:hover': {
                      bgcolor: active ? 'secondary.container' : 'action.hover',
                    },
                  }}
                >
                  {page.label}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <ModeSwitch />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
