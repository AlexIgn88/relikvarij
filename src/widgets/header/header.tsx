import React from 'react';
import Logo from 'src/shared/ui/logo/logo';
import s from './header.module.scss';
import ThemeToggle from 'src/features/theme-switch/theme-toggle/theme-toggle';
import LanguageToggle from 'src/features/language-switch/language-toggle/language-toggle';
import Navbar from 'src/widgets/navbar/navbar';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { logout } from 'src/features/auth/auth-thunks';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'src/app/routes';
import { useTranslation } from 'react-i18next';
import LoginLinks from 'src/features/auth/login-links/login-links';
import styles from 'src/widgets/navbar/navbar.module.scss';

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
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <Navbar />
      <div className={s.right}>
        {token && profile ? (
          <div className={s.user}>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
              {profile.email}
            </NavLink>
            <button onClick={handleLogout} className={s.logoutButton}>
              {t('header.logout')}
            </button>
          </div>
        ) : (
          <LoginLinks className={s.login} />
        )}
      </div>
    </header>
  );
};

export default Header;
