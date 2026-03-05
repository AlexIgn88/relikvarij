import React, { memo } from 'react';
import cn from 'clsx';
import { Select } from 'antd';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import s from './category-id-field.module.scss';

export type CategoryIdFieldProps = {
  className?: string;
  disabled?: boolean;
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: FormikHandlers['handleBlur'];
  options: { label: string; value: string }[];
  label: string;
  placeholder: string;
};

const CategoryIdField = memo<CategoryIdFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount, label, placeholder, options }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(s?.root, className)} title={label} required validateStatus={validateStatus} help={help}>
        <Select
          disabled={disabled}
          value={value || undefined}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          options={options}
        />
      </FormItem>
    );
  }
);

CategoryIdField.displayName = 'CategoryIdField';

export default CategoryIdField;
