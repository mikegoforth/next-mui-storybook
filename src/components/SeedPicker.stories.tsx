import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { expect, waitFor } from 'storybook/test';

import SeedPicker from './SeedPicker';
import TonalPalettes from './TonalPalettes';

const primaryMain = () =>
  getComputedStyle(document.documentElement)
    .getPropertyValue('--mui-palette-primary-main')
    .trim()
    .toLowerCase();

const meta = {
  title: 'Theme/Seed picker',
  component: SeedPicker,
  // Shown on the hero's primary-container ground, with the palettes it drives.
  render: () => (
    <Box
      sx={{
        bgcolor: 'primary.container',
        color: 'primary.onContainer',
        borderRadius: '32px',
        p: 4,
        maxWidth: 520,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <SeedPicker />
      <TonalPalettes />
    </Box>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof SeedPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const PickASeed: Story = {
  play: async ({ canvas, userEvent }) => {
    const before = primaryMain();
    await userEvent.click(canvas.getByRole('radio', { name: /Teal/ }));
    // The re-theme commits inside a View Transition callback, a frame later.
    await waitFor(() => expect(canvas.getByRole('radio', { name: /Teal/ })).toBeChecked());
    await waitFor(() => expect(primaryMain()).not.toBe(before));
  },
};
