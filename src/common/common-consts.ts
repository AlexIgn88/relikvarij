export const API_BASE_URL = 'https://19429ba06ff2.vps.myjino.ru/api';

export const API = {
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  PROFILE: '/profile',
  CATEGORIES: '/categories',
  PRODUCTS: '/products',
  ORDERS: '/orders',
} as const;

export const LOCAL_STORAGE_KEYS = { TOKEN_STORAGE_KEY: 'auth_token' } as const;

export const COMMAND_ID = '202602_alex-team-graduation';

export type LoadItemsSuccessResponse<T> = {
  data: T[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
};

export type ApiError = {
  name: string;
  message: string;
  stack?: string;
  extensions?: {
    code?: string;
  };
};

export type LoadPageArg = { pageNumber: number; pageSize?: number };

export const PAGE_SIZE = 10;
