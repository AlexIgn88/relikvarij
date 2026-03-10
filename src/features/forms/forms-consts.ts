import { AuthFormValues } from 'src/features/forms/auth-form/types';
import i18n from 'src/app/localization/i18n';

export const initialAuthFormValues: AuthFormValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const authFormValidate = (values: AuthFormValues): Partial<Record<keyof AuthFormValues, string>> => {
  const errors: Partial<Record<keyof AuthFormValues, string>> = {};
  if (!values.email) {
    errors.email = i18n.t('forms.AuthForm.validation.emailRequired');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = i18n.t('forms.AuthForm.validation.emailInvalid');
  }
  if (!values.password) {
    errors.password = i18n.t('forms.AuthForm.validation.passwordRequired');
  }
  return errors;
};

export const signupFormValidate = (values: AuthFormValues): Partial<Record<keyof AuthFormValues, string>> => {
  const errors = authFormValidate(values);

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = i18n.t('forms.AuthForm.validation.passwordConfirmationRequired');
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = i18n.t('forms.AuthForm.validation.passwordsNotMatch');
  }

  return errors;
};
