import React, { memo } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import s from './category-name-field.module.scss';

export type CategoryNameFieldProps = {
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

const CategoryNameField = memo<CategoryNameFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount, label, placeholder }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(s?.root, className)} title={label} required validateStatus={validateStatus} help={help}>
        <Input
          disabled={disabled}
          name="categoryName"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
      </FormItem>
    );
  }
);

CategoryNameField.displayName = 'CategoryNameField';

export default CategoryNameField;
