import React, { FC } from 'react';
import logo from 'src/app/logo.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';

import s from './home-screen.module.scss';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from 'src/app/routes';

const HomeScreen: FC = () => {
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
      <ul className={s.links}>
        {/*<li>*/}
        {/*  <Link to={APP_ROUTES.SIGNUP_FUNCTIONAL_COMPONENT_SCREEN}>Signup with functional component</Link>*/}
        {/*</li>*/}
        <li>
          <Link to={APP_ROUTES.SIGNUP_REDUX_THUNK_SCREEN}>
            Signup
            {/*with Redux Thunk*/}
          </Link>
        </li>
        {/*<li>*/}
        {/*  <Link to={APP_ROUTES.SIGNUP_REDUX_SAGA_SCREEN}>Signup with Redux Saga</Link>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <Link to={APP_ROUTES.SIGNUP_REDUX_TOOLKIT_QUERY_SCREEN}>Signup with Redux Toolkit Query</Link>*/}
        {/*</li>*/}
        <li>
          <Link to={APP_ROUTES.LOGIN}>Login</Link>
        </li>
      </ul>
    </main>
  );
};

export default HomeScreen;
