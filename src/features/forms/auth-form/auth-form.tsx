import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import { Button } from 'antd';
import { AuthFormProps } from './types';
import PasswordField from './password-field/password-field';
import EmailField from './email-field/email-field';
import ConfirmPasswordField from './confirm-password-field/confirm-password-field';
import s from './auth-form.module.scss';
import formStyle from 'src/features/forms/form.module.scss';

const AuthForm = memo<AuthFormProps>(({ className, formManager, formElement, autoFocusElement, disabled, withPasswordConfirmation }) => {
  const { t } = useTranslation();
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
      {withPasswordConfirmation && (
        <ConfirmPasswordField
          onPressEnter={submitForm}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordConfirmation}
          errors={errors.passwordConfirmation}
          submitCount={submitCount}
          touched={touched.passwordConfirmation}
          disabled={disabled}
        />
      )}
      <div className={formStyle.buttonContainer}>
        <div className={formStyle.buttonWrapper}>
          <Button type="primary" htmlType="submit" disabled={disabled} block>
            {t('forms.AuthForm.submit')}
          </Button>
        </div>
      </div>
    </form>
  );
});

AuthForm.displayName = 'AuthForm';

export default AuthForm;
