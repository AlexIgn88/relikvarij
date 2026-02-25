import React from 'react';
import Logo from '../logo/logo';
import s from './header.module.scss';
import ThemeToggle from '../../common/theme-toggle/theme-toggle';
import LanguageToggle from '../../common/language-toggle/language-toggle';
import Navbar from 'src/common/navbar/navbar';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { logout } from 'src/features/auth/auth-thunks';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'src/app/routes';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.profile.profile);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate(APP_ROUTES.INDEX);
  };

  return (
    <header className={s.header}>
      <div className={s.left}>
        <Logo />
      </div>
      <Navbar />
      <div className={s.right}>
        {token && profile && (
          <div className={s.user}>
            <span className={s.userName}>{profile.email}</span>
            <button onClick={handleLogout} className={s.logoutButton}>
              {t('header.logout')}
            </button>
          </div>
        )}
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
