'use client';
import { createTheme } from '@mui/material/styles';
import type { PaletteOptions } from '@mui/material/styles';
import {
  Blend,
  Hct,
  SchemeTonalSpot,
  TonalPalette,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';
import { Google_Sans_Code, Google_Sans_Flex, Roboto } from 'next/font/google';

/**
 * The one value that themes the whole app. Every color role below (light and
 * dark) is generated from it with Material 3's dynamic color algorithm.
 */
export const DEFAULT_SEED = '#4F5BD5';

// Material 3 pairs a "brand" face for display and headlines with a "plain"
// face for body and labels.
const brand = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'ROND'],
  // next/font has no fallback metrics for this face yet.
  adjustFontFallback: false,
  fallback: ['system-ui', 'sans-serif'],
});
const plain = Roboto({ subsets: ['latin'], display: 'swap' });
const code = Google_Sans_Code({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

// Fixed design intents, harmonized toward the seed so they belong to it.
const SUCCESS = '#2E7D32';
const WARNING = '#B26A00';
const INFO = '#0061A4';

declare module '@mui/material/styles' {
  interface PaletteColor {
    container: string;
    onContainer: string;
  }
  interface SimplePaletteColorOptions {
    container?: string;
    onContainer?: string;
  }
  interface Palette {
    tertiary: Palette['primary'];
    outline: string;
    inverse: { surface: string; onSurface: string; primary: string };
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    outline?: string;
    inverse?: { surface: string; onSurface: string; primary: string };
  }
  interface TypeBackground {
    containerLowest: string;
    containerLow: string;
    container: string;
    containerHigh: string;
    containerHighest: string;
  }
  interface TypographyVariants {
    code: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tonal: true;
  }
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    tertiary: true;
  }
}

/** Material 3 color roles for one seed and one color scheme. */
export function generatePalette(seed: string, isDark: boolean): PaletteOptions {
  const source = argbFromHex(seed);
  const s = new SchemeTonalSpot(Hct.fromInt(source), isDark, 0);
  const hex = hexFromArgb;

  // main / dark / light follow the role's tone so hover states stay on-palette.
  const tones = isDark ? { main: 80, dark: 70, light: 90 } : { main: 40, dark: 30, light: 50 };
  const role = (
    palette: typeof s.primaryPalette,
    contrastText: number,
    container: number,
    onContainer: number,
  ) => ({
    main: hex(palette.tone(tones.main)),
    dark: hex(palette.tone(tones.dark)),
    light: hex(palette.tone(tones.light)),
    contrastText: hex(contrastText),
    container: hex(container),
    onContainer: hex(onContainer),
  });
  // Success, warning and info: harmonized toward the seed's hue, with chroma
  // capped so their containers sit as calmly as the generated roles.
  const intent = (value: string) => {
    const harmonized = Hct.fromInt(Blend.harmonize(argbFromHex(value), source));
    const palette = TonalPalette.fromHueAndChroma(harmonized.hue, Math.min(harmonized.chroma, 40));
    const [main, on, container, onContainer] = isDark ? [80, 20, 30, 90] : [40, 100, 90, 10];
    return {
      main: hex(palette.tone(main)),
      contrastText: hex(palette.tone(on)),
      container: hex(palette.tone(container)),
      onContainer: hex(palette.tone(onContainer)),
    };
  };

  return {
    primary: role(s.primaryPalette, s.onPrimary, s.primaryContainer, s.onPrimaryContainer),
    secondary: role(s.secondaryPalette, s.onSecondary, s.secondaryContainer, s.onSecondaryContainer),
    tertiary: role(s.tertiaryPalette, s.onTertiary, s.tertiaryContainer, s.onTertiaryContainer),
    error: role(s.errorPalette, s.onError, s.errorContainer, s.onErrorContainer),
    success: intent(SUCCESS),
    warning: intent(WARNING),
    info: intent(INFO),
    background: {
      default: hex(s.surface),
      paper: hex(s.surfaceContainerLow),
      containerLowest: hex(s.surfaceContainerLowest),
      containerLow: hex(s.surfaceContainerLow),
      container: hex(s.surfaceContainer),
      containerHigh: hex(s.surfaceContainerHigh),
      containerHighest: hex(s.surfaceContainerHighest),
    },
    text: {
      primary: hex(s.onSurface),
      secondary: hex(s.onSurfaceVariant),
    },
    divider: hex(s.outlineVariant),
    outline: hex(s.outline),
    inverse: {
      surface: hex(s.inverseSurface),
      onSurface: hex(s.inverseOnSurface),
      primary: hex(s.inversePrimary),
    },
  };
}

/** Material You swatch colors (primary, secondary, tertiary) for a seed. */
export function seedSwatchColors(seed: string) {
  const s = new SchemeTonalSpot(Hct.fromInt(argbFromHex(seed)), false, 0);
  return {
    primary: hexFromArgb(s.primaryPalette.tone(50)),
    secondary: hexFromArgb(s.secondaryPalette.tone(75)),
    tertiary: hexFromArgb(s.tertiaryPalette.tone(65)),
  };
}

/** Builds the app theme from a seed color. */
export function createAppTheme(seed: string = DEFAULT_SEED) {
  return createTheme({
    colorSchemes: {
      light: { palette: generatePalette(seed, false) },
      dark: { palette: generatePalette(seed, true) },
    },
    cssVariables: {
      colorSchemeSelector: 'class',
    },
    shape: {
      borderRadius: 16,
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
    // Material 3 type scale: brand face for display/headline/title-large,
    // plain face for everything else.
    typography: {
      fontFamily: plain.style.fontFamily,
      h1: {
        fontFamily: brand.style.fontFamily,
        fontSize: 'clamp(2.5rem, 1.6rem + 3.2vw, 4rem)',
        fontWeight: 500,
        lineHeight: 1.08,
        letterSpacing: '-0.025em',
        fontVariationSettings: '"ROND" 100',
        textWrap: 'balance',
      },
      h2: {
        fontFamily: brand.style.fontFamily,
        fontSize: 'clamp(2rem, 1.6rem + 1.6vw, 2.8125rem)',
        fontWeight: 500,
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
        fontVariationSettings: '"ROND" 100',
        textWrap: 'balance',
      },
      h3: {
        fontFamily: brand.style.fontFamily,
        fontSize: '2.25rem',
        fontWeight: 500,
        lineHeight: 1.22,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: brand.style.fontFamily,
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.25,
      },
      h5: {
        fontFamily: brand.style.fontFamily,
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.29,
      },
      h6: {
        fontFamily: brand.style.fontFamily,
        fontSize: '1.375rem',
        fontWeight: 500,
        lineHeight: 1.27,
      },
      subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, letterSpacing: '0.009em' },
      subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.43, letterSpacing: '0.007em' },
      body1: { fontSize: '1rem', lineHeight: 1.5, letterSpacing: '0.031em' },
      body2: { fontSize: '0.875rem', lineHeight: 1.43, letterSpacing: '0.018em' },
      button: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.43,
        letterSpacing: '0.007em',
        textTransform: 'none',
      },
      caption: { fontSize: '0.75rem', lineHeight: 1.33, letterSpacing: '0.033em' },
      overline: { fontSize: '0.6875rem', fontWeight: 500, lineHeight: 1.45, letterSpacing: '0.045em' },
      code: {
        fontFamily: code.style.fontFamily,
        fontSize: '0.8125rem',
        lineHeight: 1.54,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          html: {
            scrollbarColor: `${theme.vars.palette.outline} transparent`,
          },
          body: {
            caretColor: theme.vars.palette.primary.main,
          },
          '::selection': {
            backgroundColor: theme.vars.palette.primary.container,
            color: theme.vars.palette.primary.onContainer,
          },
          // Buttons draw their own focus ripple; plain links get a themed ring.
          'a:not(.MuiButtonBase-root):focus-visible': {
            outline: `2px solid ${theme.vars.palette.primary.main}`,
            outlineOffset: 2,
            borderRadius: 2,
          },
          // Let SeedPicker drive the theme-change reveal itself.
          '::view-transition-old(root), ::view-transition-new(root)': {
            animation: 'none',
            mixBlendMode: 'normal',
          },
        }),
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: { code: 'code' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          // Material 3 expresses elevation with tonal surfaces, not overlays.
          root: { backgroundImage: 'none' },
        },
      },
      MuiAppBar: {
        defaultProps: { color: 'inherit', elevation: 0 },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 999,
            minHeight: 40,
            paddingBlock: 6,
            paddingInline: 24,
            '--variant-outlinedBorder': theme.vars.palette.outline,
            variants: [
              {
                props: { variant: 'tonal' },
                style: {
                  backgroundColor: theme.vars.palette.secondary.container,
                  color: theme.vars.palette.secondary.onContainer,
                  '&:hover': {
                    backgroundColor: `color-mix(in srgb, ${theme.vars.palette.secondary.onContainer} 8%, ${theme.vars.palette.secondary.container})`,
                  },
                  '&.Mui-disabled': {
                    backgroundColor: theme.vars.palette.action.disabledBackground,
                  },
                },
              },
            ],
          }),
          sizeSmall: { minHeight: 32, paddingInline: 16 },
          sizeLarge: { minHeight: 52, paddingInline: 28, fontSize: '1rem' },
        },
      },
      MuiFab: {
        // Material 3 FAB: primary container, 16px corners, level-3 elevation.
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            boxShadow: theme.vars.shadows[3],
            variants: [
              {
                props: { color: 'default' },
                style: {
                  backgroundColor: theme.vars.palette.primary.container,
                  color: theme.vars.palette.primary.onContainer,
                  '&:hover': {
                    backgroundColor: `color-mix(in srgb, ${theme.vars.palette.primary.onContainer} 8%, ${theme.vars.palette.primary.container})`,
                  },
                },
              },
            ],
          }),
          extended: { height: 56, borderRadius: 16, paddingInline: 20, gap: 12 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            height: 32,
            fontWeight: 500,
            variants: [
              {
                props: { variant: 'outlined', color: 'default' },
                style: { borderColor: theme.vars.palette.outline },
              },
              {
                props: { variant: 'filled', color: 'default' },
                style: {
                  backgroundColor: theme.vars.palette.secondary.container,
                  color: theme.vars.palette.secondary.onContainer,
                  '& .MuiChip-icon': { color: 'inherit' },
                },
              },
            ],
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 4,
            '&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.vars.palette.outline,
            },
          }),
        },
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: false },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '4px 4px 0 0',
            backgroundColor: theme.vars.palette.background.containerHighest,
          }),
        },
      },
      MuiSwitch: {
        // Material 3 switch: 52x32 track, 16px thumb that grows to 24px when on.
        styleOverrides: {
          root: ({ theme }) => ({
            width: 52,
            height: 32,
            padding: 0,
            margin: 8,
            overflow: 'visible',
            '& .MuiSwitch-switchBase': {
              padding: 0,
              margin: 4,
              transitionDuration: '200ms',
              '&.Mui-checked': {
                transform: 'translateX(20px)',
                '& .MuiSwitch-thumb': {
                  transform: 'scale(1)',
                  backgroundColor: theme.vars.palette.primary.contrastText,
                },
                '& + .MuiSwitch-track': {
                  backgroundColor: theme.vars.palette.primary.main,
                  borderColor: theme.vars.palette.primary.main,
                  opacity: 1,
                },
              },
              '&.Mui-disabled + .MuiSwitch-track': { opacity: 0.12 },
              '&.Mui-disabled .MuiSwitch-thumb': { opacity: 0.38 },
            },
            // A 24px thumb scaled to 16px when off, so the growth is a transform.
            '& .MuiSwitch-thumb': {
              width: 24,
              height: 24,
              boxShadow: 'none',
              backgroundColor: theme.vars.palette.outline,
              transform: 'scale(0.6667)',
              transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
            },
            '& .MuiSwitch-track': {
              boxSizing: 'border-box',
              borderRadius: 16,
              border: `2px solid ${theme.vars.palette.outline}`,
              backgroundColor: theme.vars.palette.background.containerHighest,
              opacity: 1,
            },
          }),
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            variants: (['success', 'info', 'warning', 'error'] as const).map((severity) => ({
              props: { variant: 'standard', severity },
              style: {
                backgroundColor: theme.vars.palette[severity].container,
                color: theme.vars.palette[severity].onContainer,
                '& .MuiAlert-icon': { color: theme.vars.palette[severity].main },
              },
            })),
          }),
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: ({ theme }) => ({
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.vars.palette.secondary.container,
          }),
          bar: { borderRadius: 2 },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme }) => ({
            backgroundColor: theme.vars.palette.inverse.surface,
            color: theme.vars.palette.inverse.onSurface,
            borderRadius: 4,
            fontSize: '0.75rem',
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: 8,
            backgroundColor: theme.vars.palette.background.container,
          }),
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textUnderlineOffset: '0.2em',
            '&:hover': { textDecorationThickness: 2 },
          },
        },
      },
    },
  });
}

const theme = createAppTheme(DEFAULT_SEED);

export default theme;
