import { IDatabase } from './database';
import { UserType, ProductType } from './types';

/**
 * Интерфейс для сервиса работы со скидками
 */
export interface IAccountService {
  /**
   * Получить итоговую скидку для пользователя и товара
   * @param userId - ID пользователя
   * @param productType - тип товара
   * @returns итоговая скидка в процентах (0-100)
   */
  getTotalDiscount(userId: string, productType: ProductType): number;
}

/**
 * Реализация сервиса работы со скидками
 */
export class AccountService implements IAccountService {
  constructor(private database: IDatabase) {}

  getTotalDiscount(userId: string, productType: ProductType): number {
    const user = this.database.getUser(userId);
    if (!user) {
      return 0;
    }

    const userDiscount = this.database.getUserDiscount(user.type);
    const productDiscount = this.database.getProductDiscount(user.type, productType);

    let totalDiscount = 0;

    if (userDiscount) {
      totalDiscount += userDiscount.discount;
    }

    if (productDiscount) {
      totalDiscount += productDiscount.discount;
    }

    // Ограничиваем максимальную скидку 100%
    return Math.min(totalDiscount, 100);
  }
}

