import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ItemsList from './items-list';
import { Mode } from './items-list-consts';
import { products, operations } from 'src/features/items/items-list/items-list-utils';

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

export const OperationsListPreview: Story = {
  args: {
    data: operations,
    mode: Mode.preview,
  },
};

export const ProductsListFull: Story = {
  args: {
    data: products,
    mode: Mode.full,
  },
};

export const OperationsListFull: Story = {
  args: {
    data: operations,
    mode: Mode.full,
  },
};

export const WithCustomRenderer: Story = {
  args: {
    data: operations,
    mode: Mode.preview,
  },
  render: (args) => (
    <ItemsList
      {...args}
      renderItem={({ item, index }) =>
        'amount' in item ? (
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              background: index % 2 === 0 ? '#f3f4f6' : '#e5e7eb',
              marginBottom: 8,
            }}
          >
            <strong>{item.name}</strong>
            <div>{item.desc}</div>
            <span>${item.amount}</span>
          </div>
        ) : null
      }
      listProps={{ style: { display: 'block' } }}
    />
  ),
};
