import { LoadItemsSuccessResponse } from 'src/common/common-consts';

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

export type LoadCategoriesSuccessResponse = LoadItemsSuccessResponse<Category>;
