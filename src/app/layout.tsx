import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/mui/theme';
import type { Metadata } from 'next';
import './globals.css';

import Header from '../components/RootLayout/Header';
import { rootStyles } from './rootStyles';
import { Box } from '@mui/material';

const openSans = Open_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'MyApp',
  description: 'A boilerplate for Next.js with MUI and Storybook.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={openSans.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <main>
              <Box sx={rootStyles.main}>{children}</Box>
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
