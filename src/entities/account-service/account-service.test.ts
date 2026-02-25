import { AccountService } from './account-service';
import { MockDatabase } from './database';
import { UserType, ProductType, User } from './types';

describe('AccountService', () => {
  let accountService: AccountService;
  let database: MockDatabase;

  beforeEach(() => {
    database = new MockDatabase();
    accountService = new AccountService(database);
  });

  afterEach(() => {
    database.clear();
  });

  describe('Общие скидки для типов пользователей', () => {
    it('должен возвращать общую скидку для Standard пользователя', () => {
      const user: User = { id: '1', type: UserType.Standard };
      database.addUser(user);
      database.setUserDiscount(UserType.Standard, 10);

      const discount = accountService.getTotalDiscount('1', ProductType.Car);

      expect(discount).toBe(10);
    });

    it('должен возвращать общую скидку для Premium пользователя', () => {
      const user: User = { id: '2', type: UserType.Premium };
      database.addUser(user);
      database.setUserDiscount(UserType.Premium, 15);

      const discount = accountService.getTotalDiscount('2', ProductType.Toy);

      expect(discount).toBe(15);
    });

    it('должен возвращать общую скидку для Gold пользователя', () => {
      const user: User = { id: '3', type: UserType.Gold };
      database.addUser(user);
      database.setUserDiscount(UserType.Gold, 20);

      const discount = accountService.getTotalDiscount('3', ProductType.Food);

      expect(discount).toBe(20);
    });

    it('должен возвращать общую скидку для Free пользователя', () => {
      const user: User = { id: '4', type: UserType.Free };
      database.addUser(user);
      database.setUserDiscount(UserType.Free, 5);

      const discount = accountService.getTotalDiscount('4', ProductType.Car);

      expect(discount).toBe(5);
    });

    it('должен возвращать 0, если общая скидка не установлена', () => {
      const user: User = { id: '5', type: UserType.Standard };
      database.addUser(user);

      const discount = accountService.getTotalDiscount('5', ProductType.Car);

      expect(discount).toBe(0);
    });
  });

  describe('Специфические скидки для типов товаров', () => {
    it('должен возвращать специфическую скидку для Car для Standard пользователя', () => {
      const user: User = { id: '1', type: UserType.Standard };
      database.addUser(user);
      database.setProductDiscount(UserType.Standard, ProductType.Car, 5);

      const discount = accountService.getTotalDiscount('1', ProductType.Car);

      expect(discount).toBe(5);
    });

    it('должен возвращать специфическую скидку для Toy для Premium пользователя', () => {
      const user: User = { id: '2', type: UserType.Premium };
      database.addUser(user);
      database.setProductDiscount(UserType.Premium, ProductType.Toy, 10);

      const discount = accountService.getTotalDiscount('2', ProductType.Toy);

      expect(discount).toBe(10);
    });

    it('должен возвращать специфическую скидку для Food для Gold пользователя', () => {
      const user: User = { id: '3', type: UserType.Gold };
      database.addUser(user);
      database.setProductDiscount(UserType.Gold, ProductType.Food, 15);

      const discount = accountService.getTotalDiscount('3', ProductType.Food);

      expect(discount).toBe(15);
    });

    it('должен возвращать 0 для товара без специфической скидки', () => {
      const user: User = { id: '4', type: UserType.Standard };
      database.addUser(user);
      database.setProductDiscount(UserType.Standard, ProductType.Car, 5);

      const discount = accountService.getTotalDiscount('4', ProductType.Toy);

      expect(discount).toBe(0);
    });
  });

  describe('Суммирование общих и товарных скидок', () => {
    it('должен суммировать общую и товарную скидку для Standard пользователя и Car', () => {
      const user: User = { id: '1', type: UserType.Standard };
      database.addUser(user);
      database.setUserDiscount(UserType.Standard, 10);
      database.setProductDiscount(UserType.Standard, ProductType.Car, 5);

      const discount = accountService.getTotalDiscount('1', ProductType.Car);

      expect(discount).toBe(15);
    });

    it('должен суммировать общую и товарную скидку для Premium пользователя и Toy', () => {
      const user: User = { id: '2', type: UserType.Premium };
      database.addUser(user);
      database.setUserDiscount(UserType.Premium, 15);
      database.setProductDiscount(UserType.Premium, ProductType.Toy, 10);

      const discount = accountService.getTotalDiscount('2', ProductType.Toy);

      expect(discount).toBe(25);
    });

    it('должен суммировать общую и товарную скидку для Gold пользователя и Food', () => {
      const user: User = { id: '3', type: UserType.Gold };
      database.addUser(user);
      database.setUserDiscount(UserType.Gold, 20);
      database.setProductDiscount(UserType.Gold, ProductType.Food, 15);

      const discount = accountService.getTotalDiscount('3', ProductType.Food);

      expect(discount).toBe(35);
    });

    it('должен суммировать общую и товарную скидку для Free пользователя и Car', () => {
      const user: User = { id: '4', type: UserType.Free };
      database.addUser(user);
      database.setUserDiscount(UserType.Free, 5);
      database.setProductDiscount(UserType.Free, ProductType.Car, 3);

      const discount = accountService.getTotalDiscount('4', ProductType.Car);

      expect(discount).toBe(8);
    });

    it('должен ограничивать максимальную скидку 100%', () => {
      const user: User = { id: '5', type: UserType.Gold };
      database.addUser(user);
      database.setUserDiscount(UserType.Gold, 80);
      database.setProductDiscount(UserType.Gold, ProductType.Car, 30);

      const discount = accountService.getTotalDiscount('5', ProductType.Car);

      expect(discount).toBe(100);
    });

    it('должен возвращать только общую скидку, если товарной скидки нет', () => {
      const user: User = { id: '6', type: UserType.Standard };
      database.addUser(user);
      database.setUserDiscount(UserType.Standard, 10);
      // Не устанавливаем товарную скидку

      const discount = accountService.getTotalDiscount('6', ProductType.Car);

      expect(discount).toBe(10);
    });

    it('должен возвращать только товарную скидку, если общей скидки нет', () => {
      const user: User = { id: '7', type: UserType.Premium };
      database.addUser(user);
      // Не устанавливаем общую скидку
      database.setProductDiscount(UserType.Premium, ProductType.Toy, 10);

      const discount = accountService.getTotalDiscount('7', ProductType.Toy);

      expect(discount).toBe(10);
    });
  });

  describe('Негативные сценарии', () => {
    it('должен возвращать 0 для несуществующего пользователя', () => {
      const discount = accountService.getTotalDiscount('999', ProductType.Car);

      expect(discount).toBe(0);
    });

    it('должен возвращать 0, если нет ни общей, ни товарной скидки', () => {
      const user: User = { id: '8', type: UserType.Standard };
      database.addUser(user);

      const discount = accountService.getTotalDiscount('8', ProductType.Car);

      expect(discount).toBe(0);
    });

    it('должен корректно обрабатывать нулевые скидки', () => {
      const user: User = { id: '9', type: UserType.Standard };
      database.addUser(user);
      database.setUserDiscount(UserType.Standard, 0);
      database.setProductDiscount(UserType.Standard, ProductType.Car, 0);

      const discount = accountService.getTotalDiscount('9', ProductType.Car);

      expect(discount).toBe(0);
    });
  });

  describe('Комплексные сценарии', () => {
    it('должен корректно работать с разными типами товаров для одного пользователя', () => {
      const user: User = { id: '10', type: UserType.Standard };
      database.addUser(user);
      database.setUserDiscount(UserType.Standard, 10);
      database.setProductDiscount(UserType.Standard, ProductType.Car, 5);
      database.setProductDiscount(UserType.Standard, ProductType.Toy, 3);
      // Для Food нет специфической скидки

      expect(accountService.getTotalDiscount('10', ProductType.Car)).toBe(15);
      expect(accountService.getTotalDiscount('10', ProductType.Toy)).toBe(13);
      expect(accountService.getTotalDiscount('10', ProductType.Food)).toBe(10);
    });

    it('должен корректно работать с разными пользователями одного типа', () => {
      const user1: User = { id: '11', type: UserType.Premium };
      const user2: User = { id: '12', type: UserType.Premium };
      database.addUser(user1);
      database.addUser(user2);
      database.setUserDiscount(UserType.Premium, 15);
      database.setProductDiscount(UserType.Premium, ProductType.Car, 5);

      expect(accountService.getTotalDiscount('11', ProductType.Car)).toBe(20);
      expect(accountService.getTotalDiscount('12', ProductType.Car)).toBe(20);
    });
  });
});

