import React, { FC } from 'react';
import logo from 'src/app/logo.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';

import s from './home-page.module.scss';
import LoginLinks from 'src/features/auth/login-links/login-links';

const HomePage: FC = () => {
  const { t } = useTranslation();

  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.profile.profile);

  if (token && profile) {
    return (
      <main>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p className={s.welcomeText}>{t('screens.home.welcomeText', { name: profile.email })}</p>
          <p>{t('screens.home.intro')}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <img src={logo} className="App-logo" alt="logo" />
      <LoginLinks className={s.links} />
    </main>
  );
};

export default HomePage;
