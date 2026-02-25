import React, { memo } from 'react';
import cn from 'clsx';
import { InputNumber } from 'antd';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import s from './amount-field.scss';

export type AmountFieldProps = {
  className?: string;
  disabled?: boolean;
  submitCount: number;
  touched: boolean;
  errors: string;
  value: number | undefined;
  onChange: (value: number | null) => void;
  onBlur: FormikHandlers['handleBlur'];
  label: string;
  placeholder: string;
};

const AmountField = memo<AmountFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount, label, placeholder }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(s?.root, className)} title={label} required validateStatus={validateStatus} help={help}>
        <InputNumber
          disabled={disabled}
          name="amount"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          style={{ width: '100%' }}
          min={0}
        />
      </FormItem>
    );
  }
);

AmountField.displayName = 'AmountField';

export default AmountField;
