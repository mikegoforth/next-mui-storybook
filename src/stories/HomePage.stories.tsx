import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import Home from '@/app/page';
import Header from '@/components/Header';

// Renders the page inside the same shell as src/app/layout.tsx.
const meta = {
  title: 'Pages/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <>
        <Header />
        <main>
          <Story />
        </main>
      </>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(
      'To get started, edit the page.tsx file.',
    );
    await expect(canvas.getByRole('link', { name: 'Deploy now' })).toHaveAttribute(
      'href',
      'https://vercel.com/new',
    );
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
