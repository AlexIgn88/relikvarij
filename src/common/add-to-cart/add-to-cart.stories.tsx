import type { Meta, StoryObj } from '@storybook/react';
import React, { FC, useEffect, useState } from 'react';
import AddToCart, { AddToCartProps } from './add-to-cart';

const meta: Meta<typeof AddToCart> = {
  title: 'Components/AddToCart',
  component: AddToCart,
  tags: ['autodocs'],
  argTypes: {
    count: {
      description: 'Количество товаров в корзине',
      control: { type: 'number', min: 0, step: 1 },
    },
    min: {
      control: { type: 'number', min: 0, step: 1 },
    },
    max: {
      control: { type: 'number', min: 1, step: 1 },
    },
    step: {
      control: { type: 'number', min: 1, step: 1 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledAddToCart: FC<AddToCartProps> = (props) => {
  const { count = 0, ...rest } = props;
  const [value, setValue] = useState(count);

  useEffect(() => {
    setValue(count);
  }, [count]);

  return <AddToCart {...rest} count={value} onChange={setValue} />;
};

export const Playground: Story = {
  args: {
    count: 0,
  },
  render: (args) => <ControlledAddToCart {...args} />,
};

export const CustomRender: Story = {
  args: {
    count: 2,
  },
  render: (args) => (
    <ControlledAddToCart {...args}>
      {({ canDecrement, canIncrement, onAction, count: currentCount }) => (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button type="button" disabled={!canDecrement} onClick={() => onAction('decrement')}>
            -
          </button>
          <span>{currentCount} pcs</span>
          <button type="button" disabled={!canIncrement} onClick={() => onAction('increment')}>
            +
          </button>
        </div>
      )}
    </ControlledAddToCart>
  ),
};
