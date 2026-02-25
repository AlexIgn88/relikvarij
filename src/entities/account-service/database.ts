import { User, UserDiscount, ProductDiscount, UserType, ProductType } from './types';

/**
 * Интерфейс для работы с базой данных
 */
export interface IDatabase {
  /**
   * Получить пользователя по ID
   */
  getUser(userId: string): User | null;

  /**
   * Получить общую скидку для типа пользователя
   */
  getUserDiscount(userType: UserType): UserDiscount | null;

  /**
   * Получить специфическую скидку для типа товара и типа пользователя
   */
  getProductDiscount(userType: UserType, productType: ProductType): ProductDiscount | null;

  /**
   * Установить общую скидку для типа пользователя
   */
  setUserDiscount(userType: UserType, discount: number): void;

  /**
   * Установить специфическую скидку для типа товара и типа пользователя
   */
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
}

/**
 * Мок-реализация базы данных для тестирования
 */
export class MockDatabase implements IDatabase {
  private users: Map<string, User> = new Map();
  private userDiscounts: Map<UserType, UserDiscount> = new Map();
  private productDiscounts: Map<string, ProductDiscount> = new Map();

  getUser(userId: string): User | null {
    return this.users.get(userId) || null;
  }

  getUserDiscount(userType: UserType): UserDiscount | null {
    return this.userDiscounts.get(userType) || null;
  }

  getProductDiscount(userType: UserType, productType: ProductType): ProductDiscount | null {
    const key = `${userType}-${productType}`;
    return this.productDiscounts.get(key) || null;
  }

  setUserDiscount(userType: UserType, discount: number): void {
    this.userDiscounts.set(userType, { userType, discount });
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    const key = `${userType}-${productType}`;
    this.productDiscounts.set(key, { userType, productType, discount });
  }

  /**
   * Очистить все данные (для тестов)
   */
  clear(): void {
    this.users.clear();
    this.userDiscounts.clear();
    this.productDiscounts.clear();
  }

  /**
   * Добавить пользователя (для тестов)
   */
  addUser(user: User): void {
    this.users.set(user.id, user);
  }
}

