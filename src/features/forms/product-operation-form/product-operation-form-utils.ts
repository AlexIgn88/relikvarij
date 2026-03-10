import { FormMode, ProductOperationFormValues } from 'src/features/forms/product-operation-form/types';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import i18n from 'src/app/localization/i18n';

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
      errors.name = i18n.t('forms.ProductOperationForm.validation.nameRequired');
    } else if (values.name.trim().length < 2) {
      errors.name = i18n.t('forms.ProductOperationForm.validation.nameTooShort');
    }

    if (isProduct) {
      if (!values.photo) {
        errors.photo = i18n.t('forms.ProductOperationForm.validation.photoRequired');
      } else if (values.photo.trim().length < 2) {
        errors.photo = i18n.t('forms.ProductOperationForm.validation.photoTooShort');
      }

      if (values.price === undefined || values.price === null) {
        errors.price = i18n.t('forms.ProductOperationForm.validation.priceRequired');
      } else if (values.price <= 0) {
        errors.price = i18n.t('forms.ProductOperationForm.validation.priceTooSmall');
      }
    }

    if (isOperation) {
      if (values.amount === undefined || values.amount === null) {
        errors.amount = i18n.t('forms.ProductOperationForm.validation.amountRequired');
      } else if (values.amount <= 0) {
        errors.amount = i18n.t('forms.ProductOperationForm.validation.amountTooSmall');
      }

      if (!values.type) {
        errors.type = i18n.t('forms.ProductOperationForm.validation.typeRequired');
      }
    }

    if (!values.categoryId) {
      errors.categoryId = i18n.t('forms.ProductOperationForm.validation.categoryRequired');
    }

    return errors;
  };
