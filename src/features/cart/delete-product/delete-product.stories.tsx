import type { Meta, StoryObj } from '@storybook/react';
import DeleteProduct from './delete-product';

const meta: Meta<typeof DeleteProduct> = {
  title: 'Components/DeleteProduct',
  component: DeleteProduct,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DeleteProductStory: Story = {
  args: {},
};
