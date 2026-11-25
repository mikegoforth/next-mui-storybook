import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import SeedThemeProvider from '@/components/SeedThemeProvider';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'MyApp',
  description: 'A boilerplate for Next.js with Material UI and Storybook.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {/* MUI's ThemeProvider, themed from a seed color (see src/theme.ts). */}
          <SeedThemeProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header />
            <main>{children}</main>
          </SeedThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
