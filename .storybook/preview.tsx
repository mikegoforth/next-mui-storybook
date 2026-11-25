import * as React from 'react';
import type { Decorator, Preview } from '@storybook/nextjs-vite';
import CssBaseline from '@mui/material/CssBaseline';
import { DecoratorHelpers } from '@storybook/addon-themes';
import SeedThemeProvider from '../src/components/SeedThemeProvider';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

const MODES = ['light', 'dark'] as const;
type Mode = (typeof MODES)[number];
const DEFAULT_MODE: Mode = 'light';

// Registers the "Theme" toolbar switcher from @storybook/addon-themes.
initializeThemeState([...MODES], DEFAULT_MODE);

/**
 * Renders stories inside the app's MUI theme (the same provider + CssBaseline
 * as src/app/layout.tsx) and drives its CSS-variables color scheme from the
 * toolbar. Each story gets a fresh, non-persisted provider pinned to the
 * selected mode, so stories and Vitest runs are deterministic.
 */
const withMuiTheme: Decorator = (Story, context) => {
  const { themeOverride } = context.parameters.themes ?? {};
  const mode = (themeOverride ||
    pluckThemeFromContext(context) ||
    DEFAULT_MODE) as Mode;

  return (
    <SeedThemeProvider
      key={`${context.id}-${mode}`}
      defaultMode={mode}
      storageManager={null}
      noSsr
    >
      <CssBaseline />
      <Story />
    </SeedThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },

  decorators: [withMuiTheme],
};

export default preview;
