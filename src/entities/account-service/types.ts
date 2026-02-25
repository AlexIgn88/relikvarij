/**
 * Типы пользователей системы
 */
export enum UserType {
  Standard = 'Standard',
  Premium = 'Premium',
  Gold = 'Gold',
  Free = 'Free',
}

/**
 * Типы товаров в системе
 */
export enum ProductType {
  Car = 'Car',
  Toy = 'Toy',
  Food = 'Food',
}

/**
 * Информация о пользователе
 */
export interface User {
  id: string;
  type: UserType;
}

/**
 * Общая скидка для типа пользователя
 */
export interface UserDiscount {
  userType: UserType;
  discount: number; // процент скидки (0-100)
}

/**
 * Специфическая скидка для типа товара и типа пользователя
 */
export interface ProductDiscount {
  userType: UserType;
  productType: ProductType;
  discount: number; // процент скидки (0-100)
}

