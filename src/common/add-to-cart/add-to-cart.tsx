import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import s from './add-to-cart.module.scss';
import { useTranslation } from 'react-i18next';

type Action = 'increment' | 'decrement' | 'add';

type RenderContext = {
  count: number;
  canIncrement: boolean;
  canDecrement: boolean;
  onAction: (action: Action) => void;
};

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

type Props = {
  count: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  inputProps?: InputProps;
  children?: (context: RenderContext) => ReactNode;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const AddToCart: FC<Props> = ({
  count,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  inputProps,
  children,
}) => {
  const { t } = useTranslation();
  const canIncrement = count < max;
  const canDecrement = count > min;

  const commitChange = (nextValue: number) => {
    const clamped = clamp(nextValue, min, max);
    if (clamped !== count) {
      onChange?.(clamped);
    }
  };

  const handleAction = (action: Action) => {
    const actionHandlers: Record<Action, () => void> = {
      add: () => commitChange(Math.max(min, 1)),
      increment: () => canIncrement && commitChange(count + step),
      decrement: () => canDecrement && commitChange(count - step),
    };

    actionHandlers[action]();
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextValue = Number(event.target.value);
    if (!Number.isNaN(nextValue)) {
      commitChange(nextValue);
    }
  };

  const inputClassName = clsx(s.input, inputProps?.className);
  const resolvedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    type: 'number',
    inputMode: 'numeric',
    'aria-label': inputProps?.['aria-label'] ?? 'Quantity in cart',
    ...inputProps,
    className: inputClassName,
    value: count,
    onChange: handleInputChange,
  };

  const context: RenderContext = {
    count,
    canIncrement,
    canDecrement,
    onAction: handleAction,
  };

  const defaultView =
    count <= min ? (
      <button type="button" className={s.addButton} onClick={() => handleAction('add')}>
        {t('screens.items.buttons.add')}
      </button>
    ) : (
      <div className={s.counterWrapper}>
        <button
          type="button"
          className={s.counterButton}
          onClick={() => handleAction('decrement')}
          disabled={!canDecrement}
        >
          -
        </button>
        <input {...resolvedInputProps} />
        <button
          type="button"
          className={s.counterButton}
          onClick={() => handleAction('increment')}
          disabled={!canIncrement}
        >
          +
        </button>
      </div>
    );

  return <div className={s.wrapper}>{children ? children(context) : defaultView}</div>;
};

export type { Props as AddToCartProps, RenderContext as AddToCartRenderContext, Action };
export default AddToCart;
