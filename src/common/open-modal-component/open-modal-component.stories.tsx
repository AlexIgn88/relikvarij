import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import OpenModalComponent from './open-modal-component';

const meta: Meta<typeof OpenModalComponent> = {
  title: 'Components/OpenModalComponent',
  component: OpenModalComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const ControlledStory: React.FC = () => {
  const [value, setValue] = React.useState('Custom text from Storybook');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <OpenModalComponent
      value={value}
      onChange={setValue}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      renderTrigger={({ isOpen: opened, toggle }) => (
        <button type="button" onClick={toggle} style={{ padding: '8px 16px' }}>
          {opened ? 'Hide modal' : 'Show modal'}
        </button>
      )}
    >
      {({ close, value: modalValue }) => (
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p>{modalValue}</p>
          <button type="button" onClick={close}>
            Close from content
          </button>
        </div>
      )}
    </OpenModalComponent>
  );
};

export const Controlled: Story = {
  render: () => <ControlledStory />,
};
