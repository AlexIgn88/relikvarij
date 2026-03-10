import i18n from 'src/app/localization/i18n';
import { CategoryFormValues } from 'src/features/forms/category-form/types';

export const initialCategoryFormValues: CategoryFormValues = {
  name: '',
  photo: '',
};

export const categoryFormValidate = (
  values: CategoryFormValues
): Partial<Record<keyof CategoryFormValues, string>> => {
  const errors: Partial<Record<keyof CategoryFormValues, string>> = {};

  if (!values.name) {
    errors.name = i18n.t('forms.CategoryForm.validation.nameRequired');
  } else if (values.name.trim().length < 2) {
    errors.name = i18n.t('forms.CategoryForm.validation.nameTooShort');
  }

  if (!values.photo) {
    errors.photo = i18n.t('forms.CategoryForm.validation.photoRequired');
  } else if (values.photo.trim().length < 2) {
    errors.photo = i18n.t('forms.CategoryForm.validation.photoTooShort');
  }

  return errors;
};

