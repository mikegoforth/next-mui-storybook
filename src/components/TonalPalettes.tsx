'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Hct,
  SchemeTonalSpot,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';
import { useSeed } from '@/components/SeedThemeProvider';

const TONES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99];

/** The tonal palettes Material 3 derives from the current seed. */
export default function TonalPalettes() {
  const { seed } = useSeed();
  const rows = React.useMemo(() => {
    const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(seed)), false, 0);
    return [
      { name: 'Primary', palette: scheme.primaryPalette },
      { name: 'Secondary', palette: scheme.secondaryPalette },
      { name: 'Tertiary', palette: scheme.tertiaryPalette },
      { name: 'Neutral', palette: scheme.neutralPalette },
    ].map(({ name, palette }) => ({
      name,
      tones: TONES.map((tone) => ({ tone, color: hexFromArgb(palette.tone(tone)) })),
    }));
  }, [seed]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 2,
        rowGap: 0.75,
        alignItems: 'center',
      }}
    >
      {rows.map((row) => (
        <React.Fragment key={row.name}>
          <Typography variant="caption" component="span" sx={{ fontWeight: 500 }}>
            {row.name}
          </Typography>
          <Box
            role="img"
            aria-label={`${row.name} tones 10 to 99 generated from ${seed}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${TONES.length}, 1fr)`,
              borderRadius: '999px',
              overflow: 'hidden',
              height: { xs: 24, sm: 28 },
              // Keeps the bar's shape when a tone matches the ground behind it.
              outline: '1px solid color-mix(in srgb, currentColor 18%, transparent)',
              outlineOffset: -1,
            }}
          >
            {row.tones.map(({ tone, color }) => (
              <Box
                key={tone}
                sx={{ bgcolor: color, transition: 'background-color 300ms' }}
              />
            ))}
          </Box>
        </React.Fragment>
      ))}
      <span />
      <Box
        aria-hidden="true"
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${TONES.length}, 1fr)`,
          textAlign: 'center',
          typography: 'code',
          fontSize: '0.6875rem',
        }}
      >
        {TONES.map((tone) => (
          <span key={tone}>{tone}</span>
        ))}
      </Box>
    </Box>
  );
}
