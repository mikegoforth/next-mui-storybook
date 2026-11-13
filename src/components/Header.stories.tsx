import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, within } from 'storybook/test';

import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: 'Main' });
    await expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open navigation menu' }));
    // MUI menus render in a portal outside the story canvas.
    await expect(await screen.findByRole('menuitem', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  },
};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const SwitchToDarkMode: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: 'Change theme' }));
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Dark' }));
    await expect(document.documentElement).toHaveClass('dark');
  },
};
