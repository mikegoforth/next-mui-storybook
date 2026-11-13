import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import About from '@/app/about/page';
import Header from '@/components/Header';

// Renders the page inside the same shell as src/app/layout.tsx.
const meta = {
  title: 'Pages/About',
  component: About,
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
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute(
      'href',
      '/',
    );
  },
};
