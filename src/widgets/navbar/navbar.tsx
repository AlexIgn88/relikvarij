import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';
import styles from './navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import { selectToken } from 'src/features/auth/auth-slice';
import { selectUserProfile } from 'src/entities/profile/profile-slice';

const Navbar: FC = () => {
  const { t } = useTranslation();
  const token = useAppSelector(selectToken);
  const profile = useAppSelector(selectUserProfile);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
        {t('navbar.main')}
      </NavLink>
      {token && profile && (
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          {t('navbar.profile')}
        </NavLink>
      )}
      <NavLink
        to="/products"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        {t('navbar.products')}
      </NavLink>
      {token && profile && (
        <NavLink to="/cart" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          {t('navbar.cart')}
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
