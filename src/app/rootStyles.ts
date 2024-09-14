export const rootStyles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
    padding: '80px',
    gap: '64px',
    fontFamily: 'var(--font-open-sans)',

    // New styles from the .page CSS
    '--gray-rgb': '0, 0, 0',
    '--gray-alpha-200': 'rgba(var(--gray-rgb), 0.08)',
    '--gray-alpha-100': 'rgba(var(--gray-rgb), 0.05)',
    '--button-primary-hover': '#383838',
    '--button-secondary-hover': '#f2f2f2',

    '@media (prefers-color-scheme: dark)': {
      // Dark mode specific styles
      '--gray-rgb': '255, 255, 255',
      '--gray-alpha-200': 'rgba(var(--gray-rgb), 0.145)',
      '--gray-alpha-100': 'rgba(var(--gray-rgb), 0.06)',
      '--button-primary-hover': '#ccc',
      '--button-secondary-hover': '#1a1a1a',
    },

    '@media (max-width: 600px)': {
      padding: '32px',
      paddingBottom: '80px',
    },
  },
  logo: {
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
    // Apply invert filter only in dark mode
    '@media (prefers-color-scheme: dark)': {
      filter: 'invert(100%)',
    },
  },
  ctas: {
    display: 'flex',
    gap: '16px',
    '& a': {
      borderRadius: '128px',
      height: '48px',
      padding: '0 20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 500,
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      '& a': {
        fontSize: '14px',
        height: '40px',
        padding: '0 16px',
      },
    },
  },
  primaryButton: {
    gap: '8px',
    '& a': {
      gap: '8px',
    },
  },
  secondaryButton: {
    minWidth: '180px',
    '@media (max-width: 600px)': {
      minWidth: 'auto',
    },
  },
  code: {
    backgroundColor: 'var(--gray-alpha-100)',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '14px',
    lineHeight: '20px',
    fontFamily: 'var(--font-monospace)',
  },
};
