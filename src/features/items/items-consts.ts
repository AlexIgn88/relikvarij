import { Operation, Product } from 'src/homeworks/ts1/3_write';
import { LoadItemsSuccessResponse } from 'src/common/common-consts';

export type LoadProductsSuccessResponse = LoadItemsSuccessResponse<Product>;

export type NewProduct = Omit<Product, 'id' | 'category'> & { categoryId: string };
