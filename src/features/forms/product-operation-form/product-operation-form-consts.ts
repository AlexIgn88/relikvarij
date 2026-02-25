import { ProductOperationFormValues } from 'src/features/forms/product-operation-form/types';
import { useFormikContext } from 'formik';

export type FormikContext = ReturnType<typeof useFormikContext<ProductOperationFormValues>>;

export const enum AdminActionType {
  CreateProduct = 'createProduct',
  EditProduct = 'editProduct',
  CreateOperation = 'createOperation',
  EditOperation = 'editOperation',
}
