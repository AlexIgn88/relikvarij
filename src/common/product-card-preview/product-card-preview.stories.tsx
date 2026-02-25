import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProductCardPreview from './product-card-preview';
import { Product } from 'src/homeworks/ts1/3_write';

const meta: Meta<typeof ProductCardPreview> = {
  title: 'Components/ProductCardPreview',
  component: ProductCardPreview,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockProduct1: Product = {
  id: '1',
  name: 'Wireless Headphones',
  desc: 'Comfortable Bluetooth headphones with deep bass and 20 hours of battery life.',
  price: 129.99,
  photo: 'https://images.unsplash.com/photo-1580894894513-c52a3c3f1cda?w=600',
  createdAt: new Date().toISOString(),
  category: {
    id: '1',
    name: 'Electronics',
  },
};

const mockProduct2: Product = {
  id: '2',
  name: 'Smart Speaker',
  desc: 'Voice-controlled speaker with premium sound and built-in assistant.',
  price: 249.99,
  photo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
  createdAt: new Date().toISOString(),
  category: {
    id: '2',
    name: 'Home Appliances',
  },
};

export const ProductCardPreviewStory: Story = {
  args: {
    product: mockProduct1,
  },
};

export const WithCustomActions: Story = {
  args: {
    product: mockProduct2,
    actions: [
      <button key="details" type="button">
        Details
      </button>,
      <button key="wishlist" type="button">
        Add to wishlist
      </button>,
    ],
  },
};
