import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ProTip from './ProTip';

const meta = {
  title: 'Components/ProTip',
  component: ProTip,
  tags: ['autodocs'],
} satisfies Meta<typeof ProTip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
