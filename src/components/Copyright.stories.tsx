import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import Copyright from './Copyright';

const meta = {
  title: 'Components/Copyright',
  component: Copyright,
  tags: ['autodocs'],
} satisfies Meta<typeof Copyright>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(String(new Date().getFullYear()), { exact: false })).toBeVisible();
  },
};
