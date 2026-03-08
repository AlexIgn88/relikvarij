import { FormMode, ProductOperationFormValues } from 'src/features/forms/product-operation-form/types';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';

export const getEmptyValues = (mode: AdminActionType): ProductOperationFormValues => {
  const isProduct = mode === 'createProduct' || mode === 'editProduct';
  if (isProduct) {
    return createProductInitialValues();
  }
  return createOperationInitialValues();
};

export const createProductInitialValues = (): ProductOperationFormValues => ({
  name: '',
  photo: '',
  desc: '',
  price: 0,
  oldPrice: undefined,
  categoryId: '',
  // categoryName: '',
});

export const createOperationInitialValues = (): ProductOperationFormValues => ({
  name: '',
  desc: '',
  amount: 0,
  type: 'Cost',
  categoryId: '',
  // categoryName: '',
});

export const createValidate =
  (mode: FormMode) =>
  (values: ProductOperationFormValues): Partial<Record<string, string>> => {
    const errors: Partial<Record<string, string>> = {};
    const isProduct = mode === 'createProduct' || mode === 'editProduct';
    const isOperation = mode === 'createOperation' || mode === 'editOperation';

    if (!values.name) {
      errors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (isProduct) {
      if (!values.photo) {
        errors.photo = 'Photo is required';
      } else if (values.photo.trim().length < 2) {
        errors.photo = 'Photo must be at least 2 characters';
      }

      if (values.price === undefined || values.price === null) {
        errors.price = 'Price is required';
      } else if (values.price <= 0) {
        errors.price = 'Price must be greater than 0';
      }
    }

    if (isOperation) {
      if (values.amount === undefined || values.amount === null) {
        errors.amount = 'Amount is required';
      } else if (values.amount <= 0) {
        errors.amount = 'Amount must be greater than 0';
      }

      if (!values.type) {
        errors.type = 'Type is required';
      }
    }

    if (!values.categoryId) {
      errors.categoryId = 'Category is required';
    }

    return errors;
  };
