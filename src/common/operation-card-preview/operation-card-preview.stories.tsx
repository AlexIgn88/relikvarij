import type { Meta, StoryObj } from '@storybook/react';
import OperationCardPreview from './operation-card-preview';

const meta: Meta<typeof OperationCardPreview> = {
  title: 'Components/OperationCardPreview',
  component: OperationCardPreview,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const OperationCardPreviewStory: Story = {
  args: { sum: 1546, categoryName: 'Profit', name: 'Profit for the day', description: 'Profit information' },
};
