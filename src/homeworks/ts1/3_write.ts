/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 *
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 *
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
// export const createRandomProduct = (createdAt: string) => {};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
// export const createRandomOperation = (createdAt: string) => {};

type Category = {
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

export type Operation = Cost | Profit;

export type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

export type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

const getRandomNumber = (multiplier = 10000): number => Math.floor(Math.random() * multiplier);

const getRandomName = (names: string[]): string => {
  return names[getRandomNumber(names.length)];
};

const productNames: string[] = ['cheese', 'sausage', 'chicken'];

const operationTypes: string[] = ['Cost', 'Profit'];

const costOperations: string[] = [
  'Loss',
  'Withdrawal',
  'Fee',
  'Transfer Out',
  'Overdraft',
  'Bad Investment',
  'Bankruptcy Approaching',
];

const profitOperations: string[] = [
  'Profit',
  'Dividend',
  'Investment Gain',
  'Cash In',
  'Interest',
  'Refund',
  'Big Win',
];

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const randomName = getRandomName(productNames);

  return {
    id: getRandomNumber().toString(),
    name: randomName,
    photo: `/images/products/${randomName}.png`,
    desc: '',
    createdAt: createdAt,
    oldPrice: getRandomNumber(100),
    price: getRandomNumber(100),
    category: {
      id: '46',
      name: 'Cheeses & Fats',
      photo: '/images/categories/cheeses-fats.png',
    },
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const randomType = getRandomName(operationTypes);
  const randomOperationName: string =
    randomType === 'Cost' ? getRandomName(costOperations) : getRandomName(profitOperations);

  return {
    id: getRandomNumber().toString(),
    name: randomOperationName,
    desc: '',
    createdAt: createdAt,
    amount: getRandomNumber(1000000),
    category: {
      id: '42',
      name: 'finance',
    },
    type: randomType as 'Cost' | 'Profit',
  };
};
