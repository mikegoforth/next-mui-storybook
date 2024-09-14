import { Theme } from '@mui/material/styles';

const styles = {
  headerContainer: (theme: Theme) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      [theme.breakpoints.down('md')]: {
        gap: '16px',
      },
      [theme.breakpoints.down('sm')]: {
        gap: '8px',
      },
    };
  },
  brandText() {
    return {
      mr: 2,
      display: 'flex',
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    };
  },
  brandIcon() {
    return {
      display: 'flex',
      mr: 1,
    };
  },
  menuContainer() {
    return {
      flexGrow: 1,
      display: { xs: 'none', md: 'flex' },
    };
  },
  navLink() {
    return {
      my: 2,
      color: 'white',
      display: 'block',
    };
  },
};

export default styles;
