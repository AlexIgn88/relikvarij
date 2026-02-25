import { AuthFormValues } from 'src/features/forms/auth-form/types';

export const initialAuthFormValues: AuthFormValues = {
  email: '',
  password: '',
};

export const authFormValidate = (values: AuthFormValues): Partial<Record<keyof AuthFormValues, string>> => {
  const errors: Partial<Record<keyof AuthFormValues, string>> = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};
