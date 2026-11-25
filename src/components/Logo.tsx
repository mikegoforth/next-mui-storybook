'use client';
import * as React from 'react';
import SeedSwatch from '@/components/SeedSwatch';
import { useSeed } from '@/components/SeedThemeProvider';
import { seedSwatchColors } from '@/theme';

/** Placeholder brand mark: the current seed's Material You swatch. */
export default function Logo({ size = 32 }: { size?: number }) {
  const { seed } = useSeed();
  const colors = React.useMemo(() => seedSwatchColors(seed), [seed]);
  return <SeedSwatch size={size} {...colors} />;
}
