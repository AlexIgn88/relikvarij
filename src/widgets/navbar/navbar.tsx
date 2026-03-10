import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';
import styles from './navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import { selectToken } from 'src/features/auth/auth-slice';
import { selectUserProfile } from 'src/entities/profile/profile-slice';
import { selectCartTotalQuantity } from 'src/entities/cart/cart-slice';
import { APP_ROUTES } from 'src/app/routes';

const Navbar: FC = () => {
  const { t } = useTranslation();
  const token = useAppSelector(selectToken);
  const profile = useAppSelector(selectUserProfile);
  const cartQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <nav className={styles.navbar}>
      <NavLink
        to={APP_ROUTES.INDEX}
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        {t('navbar.main')}
      </NavLink>
      <NavLink
        to={APP_ROUTES.PRODUCTS}
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        {t('navbar.products')}
      </NavLink>
      <NavLink
        to={APP_ROUTES.CATEGORIES}
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        {t('navbar.categories')}
      </NavLink>
      {token && profile && (
        <NavLink to="/cart" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          {t('navbar.cart')}
          {cartQuantity > 0 && <span className={styles.cartCount}>{cartQuantity}</span>}
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
