import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { Formik } from 'formik';
import ProfileForm from './profile-form';
import { ThemeProvider } from 'src/app/theming/theme-provider';
import LanguageProvider from '../../../app/localization/language-provider';
import '../../../app/App.css';
import { FormikContext, initialValues } from 'src/features/forms/profile-form/profile-form-consts';
import { validate } from 'src/features/forms/profile-form/profile-form-utils';

const meta: Meta<typeof ProfileForm> = {
  title: 'Features/Forms/ProfileForm',
  component: ProfileForm,
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
        {(formik: FormikContext) => (
          <ProfileForm formManager={formik} formElement={formElementRef} autoFocusElement={autoFocusElementRef} />
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
          name: 'John Doe',
          about: 'Software developer with 5 years of experience',
        }}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          console.log('Form submitted:', values);
          resetForm();
        }}
      >
        {(formik: FormikContext) => (
          <ProfileForm formManager={formik} formElement={formElementRef} autoFocusElement={autoFocusElementRef} />
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
        {(formik: FormikContext) => (
          <ProfileForm
            formManager={formik}
            formElement={formElementRef}
            autoFocusElement={autoFocusElementRef}
            disabled
          />
        )}
      </Formik>
    );
  },
};
