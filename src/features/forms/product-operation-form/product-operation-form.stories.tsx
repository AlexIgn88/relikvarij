import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { Formik } from 'formik';
import ProductOperationForm from './product-operation-form';
import { ProductOperationFormValues, FormMode } from './types';
import { ThemeProvider } from 'src/app/theming/theme-provider';
import LanguageProvider from '../../../app/localization/language-provider';
import '../../../app/App.css';
import { FormikContext } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import {
  createOperationInitialValues,
  createProductInitialValues,
  createValidate,
} from 'src/features/forms/product-operation-form/product-operation-form-utils';

const meta: Meta<typeof ProductOperationForm> = {
  title: 'Features/Forms/ProductOperationForm',
  component: ProductOperationForm,
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

const createProductInitialValuesWithData = (product: {
  name: string;
  photo: string;
  desc?: string;
  price: number;
  oldPrice?: number;
  category: { id: string; name: string };
}): ProductOperationFormValues => ({
  name: product.name,
  photo: product.photo,
  desc: product.desc,
  price: product.price,
  oldPrice: product.oldPrice,
  categoryId: product.category.id,
  // categoryName: product.category.name,
});

const createOperationInitialValuesWithData = (operation: {
  name: string;
  desc?: string;
  amount: number;
  type: 'Cost' | 'Profit';
  category: { id: string; name: string };
}): ProductOperationFormValues => ({
  name: operation.name,
  desc: operation.desc,
  amount: operation.amount,
  type: operation.type,
  categoryId: operation.category.id,
});

const RenderForm = (mode: FormMode, initialValues: ProductOperationFormValues) => {
  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  const getEmptyValues = (): ProductOperationFormValues => {
    const isProduct = mode === 'createProduct' || mode === 'editProduct';
    if (isProduct) {
      return createProductInitialValues();
    }
    return createOperationInitialValues();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={createValidate(mode)}
      onSubmit={(values, { resetForm }) => {
        console.log('Form submitted:', values);
        resetForm({ values: getEmptyValues() });
      }}
    >
      {(formik: FormikContext) => (
        <ProductOperationForm
          mode={mode}
          formManager={formik}
          formElement={formElementRef}
          autoFocusElement={autoFocusElementRef}
        />
      )}
    </Formik>
  );
};

export const CreateProduct: Story = {
  render: () => RenderForm('createProduct', createProductInitialValues()),
};

export const EditProduct: Story = {
  render: () => {
    const sampleProduct = {
      name: 'Cheese',
      photo: '/images/products/cheese.png',
      desc: 'Delicious cheese',
      oldPrice: 100,
      price: 80,
      category: {
        id: '46',
        name: 'Cheeses & Fats',
      },
    };
    return RenderForm('editProduct', createProductInitialValuesWithData(sampleProduct));
  },
};

export const Disabled: Story = {
  render: () => {
    const formElementRef = useRef<HTMLFormElement>(null);
    const autoFocusElementRef = useRef(null);

    return (
      <Formik
        initialValues={createProductInitialValues()}
        validate={createValidate('createProduct')}
        onSubmit={(values, { resetForm }) => {
          console.log('Form submitted:', values);
          resetForm({ values: createProductInitialValues() });
        }}
      >
        {(formik: FormikContext) => (
          <ProductOperationForm
            mode="createProduct"
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
