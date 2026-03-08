import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProductCardPreview from './product-card-preview';
import { Product } from 'src/entities/product/items-consts';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { BrowserRouter } from 'react-router-dom';
import LanguageProvider from 'src/app/localization/language-provider';
import { ThemeProvider } from 'src/app/theming/theme-provider';

const meta: Meta<typeof ProductCardPreview> = {
  title: 'Components/ProductCardPreview',
  component: ProductCardPreview,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <LanguageProvider>
            <ThemeProvider>
              <div style={{ padding: '20px', background: '#f3f4f6', borderRadius: '12px' }}>
                <Story />
              </div>
            </ThemeProvider>
          </LanguageProvider>
        </BrowserRouter>
      </Provider>
    ),
  ],
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
