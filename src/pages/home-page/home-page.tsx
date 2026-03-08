import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';

import s from './home-page.module.scss';
import LoginLinks from 'src/features/auth/login-links/login-links';
import clsx from 'clsx';

const HomePage: FC = () => {
  const { t } = useTranslation();

  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.profile.profile);

  if (token && profile) {
    return (
      <main className={clsx(s.main, s.background)}>
        <section className={s.hero}>
          <div className={s.heroOverlay} />
          <div className={s.heroContent}>
            <h1 className={s.heroTitle}>{t('screens.home.welcomeText')}</h1>
            <div className={s.heroLine} aria-hidden />
            <p className={s.heroIntro}>{t('screens.home.intro', { name: profile.email })}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={clsx(s.main, s.backgroundLinks)}>
      <LoginLinks className={s.links} />
    </main>
  );
};

export default HomePage;
