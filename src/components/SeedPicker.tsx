'use client';
import * as React from 'react';
import { flushSync } from 'react-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ColorizeIcon from '@mui/icons-material/Colorize';
import SeedSwatch from '@/components/SeedSwatch';
import { useSeed } from '@/components/SeedThemeProvider';
import { DEFAULT_SEED, seedSwatchColors } from '@/theme';

export const SEEDS = [
  { name: 'Indigo', value: DEFAULT_SEED },
  { name: 'Teal', value: '#00696E' },
  { name: 'Green', value: '#3B6939' },
  { name: 'Amber', value: '#8B5000' },
  { name: 'Rose', value: '#B4316F' },
];

const PRESETS = SEEDS.map((option) => ({ ...option, colors: seedSwatchColors(option.value) }));

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

/**
 * Re-themes the app from a new seed. The new theme is revealed as a circle
 * growing from the chosen swatch (View Transitions API), or swapped instantly
 * when the browser lacks support or the visitor prefers reduced motion.
 */
function useApplySeed() {
  const { setSeed } = useSeed();
  return React.useCallback(
    (seed: string, origin?: HTMLElement | null) => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!origin || reduceMotion || !document.startViewTransition) {
        setSeed(seed);
        return;
      }
      const rect = origin.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );
      const transition = document.startViewTransition(() => {
        flushSync(() => setSeed(seed));
      });
      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 650,
              easing: 'cubic-bezier(0.2, 0, 0, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          );
        })
        .catch(() => {});
    },
    [setSeed],
  );
}

const swatchSx = {
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  width: { xs: 40, sm: 48 },
  height: { xs: 40, sm: 48 },
  borderRadius: '50%',
  '& > svg:not(.MuiSvgIcon-root)': { width: '92%', height: '92%' },
  cursor: 'pointer',
  outline: '2px solid transparent',
  outlineOffset: 2,
  transition: 'outline-color 150ms, transform 150ms cubic-bezier(0.2, 0, 0, 1)',
  '&:hover': { transform: 'scale(1.06)' },
  '&:has(input:checked)': { outlineColor: 'currentColor' },
  '&:has(input:focus-visible)': {
    outlineColor: 'currentColor',
    outlineStyle: 'dashed',
  },
} as const;

export default function SeedPicker() {
  const { seed } = useSeed();
  const applySeed = useApplySeed();
  const name = React.useId();
  const isPreset = SEEDS.some((option) => option.value === seed);

  return (
    <Box component="fieldset" sx={{ border: 0, m: 0, p: 0, minWidth: 0 }}>
      <Typography component="legend" variant="subtitle2" sx={{ mb: 1.5 }}>
        Seed color
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 } }}>
        {PRESETS.map((option) => (
          <Box component="label" key={option.value} sx={swatchSx} title={option.name}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={seed === option.value}
              onChange={(event) => applySeed(option.value, event.currentTarget.parentElement)}
              style={visuallyHidden}
            />
            <span style={visuallyHidden}>
              {option.name} ({option.value})
            </span>
            <SeedSwatch {...option.colors} size={44} />
          </Box>
        ))}
        <Box
          component="label"
          sx={{
            ...swatchSx,
            border: '2px dashed currentColor',
            ...(!isPreset && { outlineColor: 'currentColor', bgcolor: seed }),
          }}
          title="Custom color"
        >
          <input
            type="color"
            value={seed}
            onChange={(event) => applySeed(event.currentTarget.value)}
            style={visuallyHidden}
          />
          <span style={visuallyHidden}>Custom seed color</span>
          <ColorizeIcon
            sx={{ fontSize: { xs: 18, sm: 22 }, ...(!isPreset && { color: 'primary.contrastText' }) }}
          />
        </Box>
      </Box>
    </Box>
  );
}
