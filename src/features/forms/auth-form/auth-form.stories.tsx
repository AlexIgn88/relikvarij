import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { Formik, FormikContextType } from 'formik';
import AuthForm from './auth-form';
import { AuthFormValues } from './types';
import { ThemeProvider } from 'src/app/theming/theme-provider';
import LanguageProvider from '../../../app/localization/language-provider';
import '../../../app/App.css';

const meta: Meta<typeof AuthForm> = {
  title: 'Features/Forms/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LanguageProvider>
        <ThemeProvider>
          <div style={{ padding: '20px', maxWidth: '600px' }}>
            <Story />
          </div>
        </ThemeProvider>
      </LanguageProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const initialValues: AuthFormValues = {
  email: '',
  password: '',
};

const validate = (values: AuthFormValues): Partial<Record<keyof AuthFormValues, string>> => {
  const errors: Partial<Record<keyof AuthFormValues, string>> = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

export const Default: Story = {
  render: () => {
    const formElementRef = useRef<HTMLFormElement>(null);
    const autoFocusElementRef = useRef(null);

    return (
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          console.log('Form submitted:', values);
          resetForm();
        }}
      >
        {(formik: FormikContextType<AuthFormValues>) => (
          <AuthForm formManager={formik} formElement={formElementRef} autoFocusElement={autoFocusElementRef} />
        )}
      </Formik>
    );
  },
};

export const WithInitialValues: Story = {
  render: () => {
    const formElementRef = useRef<HTMLFormElement>(null);
    const autoFocusElementRef = useRef(null);

    return (
      <Formik
        initialValues={{
          email: 'user@example.com',
          password: 'password123',
        }}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          console.log('Form submitted:', values);
          resetForm();
        }}
      >
        {(formik: FormikContextType<AuthFormValues>) => (
          <AuthForm formManager={formik} formElement={formElementRef} autoFocusElement={autoFocusElementRef} />
        )}
      </Formik>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const formElementRef = useRef<HTMLFormElement>(null);
    const autoFocusElementRef = useRef(null);

    return (
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          console.log('Form submitted:', values);
          resetForm();
        }}
      >
        {(formik: FormikContextType<AuthFormValues>) => (
          <AuthForm formManager={formik} formElement={formElementRef} autoFocusElement={autoFocusElementRef} disabled />
        )}
      </Formik>
    );
  },
};
