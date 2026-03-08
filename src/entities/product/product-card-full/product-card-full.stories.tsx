import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProductCardFull from './product-card-full';
import { Product } from 'src/entities/product/items-consts';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { BrowserRouter } from 'react-router-dom';
import LanguageProvider from 'src/app/localization/language-provider';
import { ThemeProvider } from 'src/app/theming/theme-provider';

const meta: Meta<typeof ProductCardFull> = {
  title: 'Components/ProductCardFull',
  component: ProductCardFull,
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
  name: 'Gaming Laptop ASUS TUF F15',
  desc: 'A high-performance gaming laptop featuring Intel Core i7, RTX 4070 GPU, 1TB SSD, and a 240Hz display. Designed for gamers and creators who demand power.',
  price: 1599.99,
  photo: 'https://images.unsplash.com/photo-1610465299996-9a67d4d3e84b?w=800',
  createdAt: new Date().toISOString(),
  category: {
    id: '1',
    name: 'Electronics',
  },
};

const mockProduct2: Product = {
  id: '2',
  name: 'Smart OLED TV 55"',
  desc: '4K HDR display with AI upscaling, 120Hz refresh rate, and Dolby Atmos support.',
  price: 1299.99,
  photo: 'https://images.unsplash.com/photo-1593357849627-0416783f7828?w=800',
  createdAt: new Date().toISOString(),
  category: {
    id: '2',
    name: 'Home Appliances',
  },
};

export const ProductCardFullStory: Story = {
  args: {
    product: mockProduct1,
  },
};
