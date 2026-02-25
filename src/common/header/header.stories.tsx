import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';
import { ThemeProvider } from 'src/app/theming/theme-provider';
import LanguageProvider from '../../app/localization/language-provider';
import React from 'react';
import '../../app/App.css';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Header> = {
  title: 'Components/Header (with i18n + theme)',
  component: Header,
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

export const Default: Story = {};
