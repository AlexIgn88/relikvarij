import React, { memo } from 'react';
import cn from 'clsx';
import { Select } from 'antd';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import s from './type-field.module.scss';

export type TypeFieldProps = {
  className?: string;
  disabled?: boolean;
  submitCount: number;
  touched: boolean;
  errors: string;
  value: 'Cost' | 'Profit' | undefined;
  onChange: (value: 'Cost' | 'Profit') => void;
  onBlur: FormikHandlers['handleBlur'];
  label: string;
};

const TypeField = memo<TypeFieldProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount, label }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(s?.root, className)} title={label} required validateStatus={validateStatus} help={help}>
        <Select
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          style={{ width: '100%' }}
          options={[
            { label: 'Cost', value: 'Cost' },
            { label: 'Profit', value: 'Profit' },
          ]}
        />
      </FormItem>
    );
  }
);

TypeField.displayName = 'TypeField';

export default TypeField;
