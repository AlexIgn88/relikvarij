import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { AuthFormProps } from './types';
import PasswordField from './password-field/password-field';
import EmailField from './email-field/email-field';
import s from './auth-form.module.scss';
import formStyle from 'src/features/forms/form.module.scss';

const AuthForm = memo<AuthFormProps>(({ className, formManager, formElement, autoFocusElement, disabled }) => {
  const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, submitForm } = formManager;

  return (
    <form ref={formElement} onSubmit={handleSubmit} className={cn(s?.root, className)}>
      <EmailField
        onPressEnter={submitForm}
        autoFocusElement={autoFocusElement}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        errors={errors.email}
        submitCount={submitCount}
        touched={touched.email}
        disabled={disabled}
      />
      <PasswordField
        onPressEnter={submitForm}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        errors={errors.password}
        submitCount={submitCount}
        touched={touched.password}
        disabled={disabled}
      />
      <div className={formStyle.buttonContainer}>
        <div className={formStyle.buttonWrapper}>
          <Button type="primary" htmlType="submit" disabled={disabled} block>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
});

AuthForm.displayName = 'AuthForm';

export default AuthForm;
