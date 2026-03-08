import { Product } from 'src/entities/product/items-consts';

const getRandomNumber = (multiplier = 10000): number => Math.floor(Math.random() * multiplier);

const getRandomName = (names: string[]): string => {
  return names[getRandomNumber(names.length)];
};

const productNames: string[] = ['cheese', 'sausage', 'chicken'];

export const randomDates = Array.from({ length: 10 }, () => {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 60));
  return d.toISOString();
});

// Создает случайный продукт (Product).
// Принимает дату создания (строка)
const createRandomProduct = (createdAt: string): Product => {
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

export const products = randomDates.map((date) => createRandomProduct(date));
