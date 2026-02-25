import {
  Cost,
  createRandomOperation,
  createRandomProduct,
  Operation,
  Product,
  Profit,
} from 'src/homeworks/ts1/3_write';

export const isProduct = (value: unknown): value is Product => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'photo' in value &&
    'createdAt' in value &&
    'price' in value &&
    'category' in value
  );
};

export const isProductArray = (value: unknown): value is Product[] => {
  return Array.isArray(value) && value.every(isProduct);
};

export const isCost = (value: unknown): value is Cost => {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as any).type === 'Cost' &&
    'id' in value &&
    'name' in value &&
    'createdAt' in value &&
    'amount' in value &&
    'category' in value
  );
};

export const isProfit = (value: unknown): value is Profit => {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as any).type === 'Profit' &&
    'id' in value &&
    'name' in value &&
    'createdAt' in value &&
    'amount' in value &&
    'category' in value
  );
};

export const isOperation = (value: unknown): value is Operation => {
  return isCost(value) || isProfit(value);
};

export const isOperationArray = (value: unknown): value is Operation[] => {
  return Array.isArray(value) && value.every(isOperation);
};

export const randomDates = Array.from({ length: 10 }, () => {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 60));
  return d.toISOString();
});

export const products = randomDates.map((date) => createRandomProduct(date));
export const operations = randomDates.map((date) => createRandomOperation(date));
