import { FormProps } from 'src/features/forms/types';
import { Product } from 'src/entities/product/items-consts';

export type FormMode = 'createProduct' | 'editProduct' | 'createOperation' | 'editOperation';

export type ProductOperationFormValues = {
  name: string;
  photo?: string;
  desc?: string;
  price?: number;
  oldPrice?: number;
  amount?: number;
  type?: 'Cost' | 'Profit';
  categoryId: string;
};

export type ProductOperationFormProps = FormProps<ProductOperationFormValues> & {
  mode: FormMode;
  initialData?: Product;
};
