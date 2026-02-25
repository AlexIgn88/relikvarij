import React, { memo } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
import type { FormikHandlers } from 'formik';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import s from './name-field.module.scss';

export type NameFieldProps = {
  className?: string;
  disabled?: boolean;
  autoFocusElement?: React.RefObject<any>;
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  label: string;
  placeholder: string;
};

const NameField = memo<NameFieldProps>(
  ({
    className,
    onChange,
    onBlur,
    autoFocusElement,
    touched,
    value,
    errors,
    disabled,
    submitCount,
    label,
    placeholder,
  }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(s?.root, className)} title={label} required validateStatus={validateStatus} help={help}>
        <Input
          disabled={disabled}
          ref={autoFocusElement}
          data-cy="input"
          autoFocus
          name="name"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
      </FormItem>
    );
  }
);

NameField.displayName = 'NameField';

export default NameField;
