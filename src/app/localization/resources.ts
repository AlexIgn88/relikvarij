export const resources = {
  en: {
    translation: {
      theme: {
        toggle: 'Toggle color scheme',
        light: 'Light',
        dark: 'Dark',
      },
      navbar: {
        main: 'Main',
        profile: 'Profile',
        products: 'Products',
        operations: 'Operations',
        cart: 'Shopping cart',
      },
      header: {
        logout: 'Logout',
      },
      screens: {
        home: {
          intro: `
          Welcome, {{name}}, to "Antique Courtyard" – an online shop for rare and collectible treasures.  
          Here you will find carefully curated antiques, vintage décor, and unique pieces with their own stories.  
          Browse our catalog, add special finds to your cart, and easily track all operations with your collection.  
          We thoughtfully design the interface so that every visit feels cozy and every purchase is a small journey into history.
        `,
          welcomeText: 'Online shop "Antique Courtyard"',
          signup: 'Signup',
          login: 'Login',
        },
        profile: {
          profileInfo: 'Profile Information',
          name: 'Name',
          email: 'Email',
          role: 'Role',
        },
        cart: {
          empty: 'Your cart is empty',
          order: 'Order',
          clear: 'Clear',
          itemsCount: '{{count}} item(s) in cart',
          totalPrice: 'Total: ₽ {{price}}',
        },
        items: {
          buttons: {
            create: 'Create',
            delete: 'Delete',
            add: 'Add to Cart',
            edit: 'Edit',
          },
        },
      },
      forms: {
        AuthForm: {
          email: {
            title: 'Email',
            placeholder: 'Enter email',
          },
          password: {
            title: 'Password',
            placeholder: 'Enter password',
          },
          passwordConfirmation: {
            title: 'Confirm password',
            placeholder: 'Confirm password',
          },
          validation: {
            emailRequired: 'Email is required',
            emailInvalid: 'Invalid email address',
            passwordRequired: 'Password is required',
            passwordConfirmationRequired: 'Password confirmation is required',
            passwordsNotMatch: 'Passwords do not match',
          },
          submit: 'Submit',
        },
        ProductOperationForm: {
          product: {
            name: {
              title: 'Product Name',
              placeholder: 'Enter product name',
            },
            photo: {
              title: 'Photo URL',
              placeholder: 'Enter photo URL',
            },
            description: {
              title: 'Description',
              placeholder: 'Enter description (optional)',
            },
            price: {
              title: 'Price',
              placeholder: 'Enter price',
            },
            oldPrice: {
              title: 'Old Price',
              placeholder: 'Enter old price (optional)',
            },
          },
          operation: {
            name: {
              title: 'Operation Name',
              placeholder: 'Enter operation name',
            },
            description: {
              title: 'Description',
              placeholder: 'Enter description (optional)',
            },
            amount: {
              title: 'Amount',
              placeholder: 'Enter amount',
            },
            type: {
              title: 'Type',
            },
          },
          common: {
            category: {
              title: 'Category',
              placeholder: 'Select category',
            },
            submit: {
              create: 'Create',
              update: 'Update',
            },
          },
          validation: {
            nameRequired: 'Name is required',
            nameTooShort: 'Name must be at least 2 characters',
            photoRequired: 'Photo is required',
            photoTooShort: 'Photo must be at least 2 characters',
            priceRequired: 'Price is required',
            priceTooSmall: 'Price must be greater than 0',
            amountRequired: 'Amount is required',
            amountTooSmall: 'Amount must be greater than 0',
            typeRequired: 'Type is required',
            categoryRequired: 'Category is required',
          },
        },
        ProfileForm: {
          name: {
            title: 'Nickname',
            placeholder: 'Come up with a pseudonym for yourself',
          },
          about: {
            title: 'About',
            placeholder: 'Write something about yourself',
          },
        },
      },
    },
  },
  ru: {
    translation: {
      theme: {
        toggle: 'Переключить цветовую схему',
        light: 'Светлая',
        dark: 'Тёмная',
      },
      navbar: {
        main: 'Главная',
        profile: 'Профиль',
        products: 'Товары',
        operations: 'Операции',
        cart: 'Корзина',
      },
      header: {
        logout: 'Выйти',
      },
      screens: {
        home: {
          intro: `
          Добро пожаловать, {{name}}, в интернет-магазин «Антикварный Дворик» — пространство редких вещей и коллекционных сокровищ.  
          Здесь вас ждут тщательно отобранные антиквариат, винтажный декор и уникальные предметы с собственной историей.  
          Просматривайте каталог, добавляйте находки в корзину и удобно отслеживайте все операции со своей коллекцией.  
          Мы заботимся о том, чтобы каждый визит был атмосферным, а каждая покупка — маленьким путешествием в прошлое.
        `,
          welcomeText: 'Интернет-магазин «Антикварный Дворик»',
          signup: 'Регистрация',
          login: 'Вход',
        },
        profile: {
          profileInfo: 'Информация о профиле',
          name: 'Имя',
          email: 'Email',
          role: 'Роль',
        },
        cart: {
          empty: 'Ваша корзина пуста',
          order: 'Заказать',
          clear: 'Очистить',
          itemsCount: 'Товаров в корзине: {{count}}',
          totalPrice: 'Итого: ₽ {{price}}',
        },
        items: {
          buttons: {
            create: 'Создать',
            delete: 'Удалить',
            add: 'В корзину',
            edit: 'Редактировать',
          },
        },
      },
      forms: {
        AuthForm: {
          email: {
            title: 'Email',
            placeholder: 'Укажите email',
          },
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
          passwordConfirmation: {
            title: 'Подтвердите пароль',
            placeholder: 'Подтвердите пароль',
          },
          validation: {
            emailRequired: 'Поле Email обязательно для заполнения',
            emailInvalid: 'Некорректный адрес электронной почты',
            passwordRequired: 'Пароль обязателен для заполнения',
            passwordConfirmationRequired: 'Подтверждение пароля обязательно для заполнения',
            passwordsNotMatch: 'Пароли не совпадают',
          },
          submit: 'Отправить',
        },
        ProductOperationForm: {
          product: {
            name: {
              title: 'Название товара',
              placeholder: 'Введите название товара',
            },
            photo: {
              title: 'Ссылка на фото',
              placeholder: 'Укажите URL фотографии',
            },
            description: {
              title: 'Описание',
              placeholder: 'Введите описание (необязательно)',
            },
            price: {
              title: 'Цена',
              placeholder: 'Укажите цену',
            },
            oldPrice: {
              title: 'Старая цена',
              placeholder: 'Укажите старую цену (необязательно)',
            },
          },
          operation: {
            name: {
              title: 'Название операции',
              placeholder: 'Введите название операции',
            },
            description: {
              title: 'Описание',
              placeholder: 'Введите описание (необязательно)',
            },
            amount: {
              title: 'Сумма',
              placeholder: 'Укажите сумму',
            },
            type: {
              title: 'Тип',
            },
          },
          common: {
            category: {
              title: 'Категория',
              placeholder: 'Выберите категорию',
            },
            submit: {
              create: 'Создать',
              update: 'Обновить',
            },
          },
          validation: {
            nameRequired: 'Название обязательно для заполнения',
            nameTooShort: 'Название должно содержать не менее 2 символов',
            photoRequired: 'Фото обязательно для заполнения',
            photoTooShort: 'Ссылка на фото должна содержать не менее 2 символов',
            priceRequired: 'Цена обязательна для заполнения',
            priceTooSmall: 'Цена должна быть больше 0',
            amountRequired: 'Сумма обязательна для заполнения',
            amountTooSmall: 'Сумма должна быть больше 0',
            typeRequired: 'Тип обязателен для заполнения',
            categoryRequired: 'Категория обязательна для заполнения',
          },
        },
        ProfileForm: {
          name: {
            title: 'Псевдоним',
            placeholder: 'Придумайте себе псевдоним',
          },
          about: {
            title: 'О себе',
            placeholder: 'Напишите что-нибудь о себе',
          },
        },
      },
    },
  },
};
