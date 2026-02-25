import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle from './theme-toggle';
import { ThemeProvider } from '../../app/theming/theme-provider';
import LanguageProvider from '../../app/localization/language-provider';
import React from 'react';
import '../../app/App.css';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <LanguageProvider>
        <ThemeProvider>
          <div style={{ padding: '20px', background: '#f3f4f6', borderRadius: '12px' }}>
            <Story />
          </div>
        </ThemeProvider>
      </LanguageProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
