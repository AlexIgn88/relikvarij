import React, { memo } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import s from './description-field.module.scss';

export type DescriptionFieldProps = {
  className?: string;
  disabled?: boolean;
  submitCount: number;
  touched: boolean;
  errors: string;
  value?: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  label: string;
  placeholder: string;
};

const DescriptionField = memo<DescriptionFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount, label, placeholder }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(s?.root, className)} title={label} validateStatus={validateStatus} help={help}>
        <Input.TextArea
          disabled={disabled}
          name="desc"
          onChange={onChange}
          onBlur={onBlur}
          value={value || ''}
          placeholder={placeholder}
        />
      </FormItem>
    );
  }
);

DescriptionField.displayName = 'DescriptionField';

export default DescriptionField;
