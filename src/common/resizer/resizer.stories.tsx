import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Resizer from './resizer';
import img from './react-logo.png';
import ComponentInfo from '../component-info/component-info';

const Wrapper = () => (
  <ComponentInfo title="Resizer" desc={`При нажатии на зеленый круг можно изменять размеры элементов`}>
    <Resizer initialHeight={100} initialWidth={320}>
      {() => (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at, dolore earum enim est eveniet facilis
          illo impedit in, itaque maxime necessitatibus nesciunt nihil non officiis placeat provident quasi reiciendis.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at, dolore earum enim est eveniet facilis
          illo impedit in, itaque maxime necessitatibus nesciunt nihil non officiis placeat provident quasi reiciendis.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at, dolore earum enim est eveniet facilis
          illo impedit in, itaque maxime necessitatibus nesciunt nihil non officiis placeat provident quasi reiciendis.
        </div>
      )}
    </Resizer>
    <hr />
    <div>
      <Resizer initialHeight={108 * 3} initialWidth={144 * 3}>
        {(size) => <img src={img} alt="" width={size.width} height={size.height} style={{ objectFit: 'cover' }} />}
      </Resizer>
    </div>
  </ComponentInfo>
);

const meta: Meta<typeof Resizer> = {
  title: 'Difficult components/Resizer',
  component: Wrapper,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
