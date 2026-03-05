import { LoadItemsSuccessResponse } from 'src/common/common-consts';

export type LoadProductsSuccessResponse = LoadItemsSuccessResponse<Product>;

export type NewProduct = Omit<Product, 'id' | 'category'> & { categoryId: string };

export type Category = {
  id: string;
  name: string;
  photo?: string;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};
