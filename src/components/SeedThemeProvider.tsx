'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme, { DEFAULT_SEED, createAppTheme } from '@/theme';

type SeedContextValue = { seed: string; setSeed: (seed: string) => void };

const SeedContext = React.createContext<SeedContextValue | null>(null);

/** The current seed color and a setter that re-themes the app. */
export function useSeed() {
  const context = React.useContext(SeedContext);
  if (!context) {
    throw new Error('useSeed must be used inside <SeedThemeProvider>.');
  }
  return context;
}

type SeedThemeProviderProps = Omit<
  React.ComponentProps<typeof ThemeProvider>,
  'theme'
>;

/**
 * MUI's ThemeProvider with a live seed: changing the seed regenerates every
 * color role. The seed resets on reload; set DEFAULT_SEED in src/theme.ts to
 * keep one.
 */
export default function SeedThemeProvider({ children, ...props }: SeedThemeProviderProps) {
  const [seed, setSeed] = React.useState(DEFAULT_SEED);
  const seededTheme = React.useMemo(
    () => (seed === DEFAULT_SEED ? theme : createAppTheme(seed)),
    [seed],
  );
  const value = React.useMemo(() => ({ seed, setSeed }), [seed]);

  return (
    <SeedContext value={value}>
      <ThemeProvider theme={seededTheme} {...props}>
        {children}
      </ThemeProvider>
    </SeedContext>
  );
}
