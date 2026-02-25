export type ProductFormValues = {
  name: string;
  photo?: string;
  desc: string;
  price?: number;
  oldPrice?: number;
  categoryId: string;
};

export type OperationFormValues = {
  name: string;
  desc: string;
  amount?: number;
  type?: 'Cost' | 'Profit';
  categoryId: string;
};

export type FormValues = ProductFormValues | OperationFormValues;
