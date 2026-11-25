import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import ComponentGallery from './ComponentGallery';

const meta = {
  title: 'Components/Gallery',
  component: ComponentGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Interactions: Story = {
  play: async ({ canvas, userEvent }) => {
    const storybookChip = canvas.getByRole('button', { name: 'Storybook' });
    await userEvent.click(storybookChip);
    await expect(storybookChip).toHaveAttribute('aria-pressed', 'true');

    const projectName = canvas.getByLabelText('Project name');
    await userEvent.clear(projectName);
    await userEvent.type(projectName, 'My App');
    await expect(
      canvas.getByText('Use lowercase letters, numbers and hyphens only.'),
    ).toBeVisible();
  },
};
