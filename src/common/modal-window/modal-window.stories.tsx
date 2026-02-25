import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ModalWindow from './modal-window';

type Props = React.ComponentProps<typeof ModalWindow>;

type StoryArgs = Props & {
  content: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textColor: string;
  backgroundColor: string;
  textAlign: 'left' | 'center' | 'right';
  padding: number;
  fontFamily: 'sans-serif' | 'monospace' | 'serif';
};

const meta: Meta<StoryArgs> = {
  title: 'Components/ModalWindow',
  component: ModalWindow,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      description: 'Видимость модального окна',
      control: 'boolean',
    },
    content: {
      description: 'Текст внутри модального окна',
      control: 'text',
    },
    fontSize: {
      description: 'Размер шрифта (px)',
      control: { type: 'number', min: 10, max: 40, step: 1 },
    },
    fontWeight: {
      description: 'Толщина шрифта',
      control: { type: 'select' },
      options: ['normal', 'bold'],
    },
    fontStyle: {
      description: 'Стиль шрифта',
      control: { type: 'select' },
      options: ['normal', 'italic'],
    },
    textColor: {
      description: 'Цвет текста',
      control: 'color',
    },
    backgroundColor: {
      description: 'Цвет фона модального окна',
      control: 'color',
    },
    textAlign: {
      description: 'Расположение текста',
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    padding: {
      description: 'Размер внутренних отступов (px)',
      control: { type: 'number', min: 10, max: 20, step: 1 },
    },
    fontFamily: {
      description: 'Тип шрифта',
      control: { type: 'select' },
      options: ['sans-serif', 'monospace', 'serif'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalStory = (args: StoryArgs) => {
  const {
    visible,
    content,
    fontSize,
    fontWeight,
    fontStyle,
    textColor,
    backgroundColor,
    textAlign,
    padding,
    fontFamily,
  } = args;
  const [isOpen, setIsOpen] = React.useState(visible);

  React.useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <ModalWindow visible={isOpen} setVisible={setIsOpen}>
        <div
          style={{
            fontSize: `${fontSize}px`,
            fontWeight,
            fontStyle,
            color: textColor,
            backgroundColor,
            textAlign,
            padding: `${padding}px`,
            height: '100%',
            fontFamily,
          }}
        >
          {content}
        </div>
      </ModalWindow>
    </>
  );
};

export const Visible: Story = {
  args: {
    visible: true,
    content: 'Контент модального окна',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textColor: '#333333',
    backgroundColor: '#ffffff',
  },
  render: (args) => <ModalStory {...args} />,
};
