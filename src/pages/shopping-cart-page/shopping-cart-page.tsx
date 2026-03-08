import React, { FC } from 'react';
import clsx from 'clsx';
import { Mode } from 'src/entities/product/items-list/items-list-consts';
import ItemsList from 'src/entities/product/items-list/items-list';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import ProductCardPreview from 'src/entities/product/product-card-preview/product-card-preview';
import { useTranslation } from 'react-i18next';
import s from './shopping-cart-page.modele.scss';

import {
  clearCart,
  createOrder,
  selectCartItems,
  selectloadItemsStatus,
  selectProducts,
} from 'src/features/cart/cart-slice';
import { THUNK_STATUSES } from 'src/store/store-consts';

const ShoppingCartPage: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const products = useAppSelector(selectProducts);
  const cartItems = useAppSelector(selectCartItems);
  const loadItemsStatus = useAppSelector(selectloadItemsStatus);

  const handleCreateOrder = () => {
    const productsForOrder = cartItems.map((cartItem) => ({
      id: cartItem.product.id,
      quantity: cartItem.quantity,
    }));
    dispatch(createOrder(productsForOrder));
  };
  const handleClearCart = () => dispatch(clearCart());

  const renderItem = ({ item }: { item: any }) => {
    return <ProductCardPreview product={item} />;
  };

  if (loadItemsStatus === THUNK_STATUSES.FULFILLED) {
    return (
      <main className={s.orderCreated}>
        <div>Спасибо за Ваш заказ!</div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main>
        <div className={s.empty}>
          <p>{t('screens.cart.empty')}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className={s.cartControlButtonsPanel}>
        <button type="button" className={clsx(s.cartControlButtons, s.orderButton)} onClick={handleCreateOrder}>
          {t('screens.cart.order')}
        </button>
        <button type="button" className={clsx(s.cartControlButtons, s.clearCartButton)} onClick={handleClearCart}>
          {t('screens.cart.clear')}
        </button>
      </div>
      <ItemsList data={products} mode={Mode.preview} renderItem={renderItem} />
    </main>
  );
};

export default ShoppingCartPage;
