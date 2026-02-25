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
          My name is Alexey.  
          I work as a frontend developer, writing in React.  
          As a state manager, I use Redux Toolkit and I'm familiar with Next.js.  
          Within this course, I want to deepen my knowledge  
          and sharpen my skills in building React web applications.  
          I also want to learn working with WebSockets  
          and mastering form validation using libraries like Formik and React Hook Form.
        `,
          welcomeText: 'Welcome, {{name}}!',
        },
        profile: {
          profileInfo: 'Profile Information',
          name: 'Name',
          email: 'Email',
          role: 'Role',
        },
        cart: {
          empty: 'Your cart is empty',
        },
        items: {
          buttons: {
            create: 'Create',
            delete: 'Delete',
            add: 'Add to Cart',
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
          Меня зовут Алексей.  
          Работаю frontend-разработчиком, пишу на React.  
          В качестве стейт-менеджера использую Redux Toolkit. Знаком с Next.js.  
          В рамках этого курса хочется углубить знания  
          и отточить навыки написания веб-приложений на React.  
          Также хочется освоить вебсокеты и валидацию форм специальными библиотеками,  
          такими как Formik и React Hook Form.
        `,
          welcomeText: 'Добро пожаловать, {{name}}!',
        },
        profile: {
          profileInfo: 'Информация о профиле',
          name: 'Имя',
          email: 'Email',
          role: 'Роль',
        },
        cart: {
          empty: 'Ваша корзина пуста',
        },
        items: {
          buttons: {
            create: 'Создать',
            delete: 'Удалить',
            add: 'В корзину',
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
