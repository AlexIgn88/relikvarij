import React, { memo } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
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
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  label: string;
  placeholder: string;
};

const CategoryIdField = memo<CategoryIdFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount, label, placeholder }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(s?.root, className)} title={label} required validateStatus={validateStatus} help={help}>
        <Input
          disabled={disabled}
          name="categoryId"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
      </FormItem>
    );
  }
);

CategoryIdField.displayName = 'CategoryIdField';

export default CategoryIdField;
