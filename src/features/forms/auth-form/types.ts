import { FormProps } from 'src/features/forms/types';

export type AuthFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type AuthFormErrors = Record<keyof AuthFormValues, string>;
export type AuthFormTouched = Record<keyof AuthFormValues, boolean>;

export type AuthFormProps = FormProps<AuthFormValues> & {
  withPasswordConfirmation?: boolean;
};
