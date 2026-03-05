import type { Meta, StoryObj } from '@storybook/react';
import ItemsList from './items-list';
import { Mode } from './items-list-consts';
import { products } from 'src/entities/product/items-list/items-list-utils';

const meta: Meta<typeof ItemsList> = {
  title: 'Components/ItemsList',
  component: ItemsList,
  tags: ['autodocs'],
  argTypes: {
    listProps: {
      control: false,
    },
    renderItem: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductsListPreview: Story = {
  args: {
    data: products,
    mode: Mode.preview,
  },
};

export const ProductsListFull: Story = {
  args: {
    data: products,
    mode: Mode.full,
  },
};
