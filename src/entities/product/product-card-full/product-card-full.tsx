import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import s from './product-card-full.module.scss';
import AddToCart from 'src/features/cart/add-to-cart/add-to-cart';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { addToCart, updateQuantity } from 'src/features/cart/cart-slice';
import { Product } from 'src/entities/product/items-consts';
import { useNavigate } from 'react-router-dom';
import { selectToken } from 'src/features/auth/auth-slice';
import { selectUserProfile } from 'src/entities/profile/profile-slice';
import { moneySign } from 'src/shared/lib/common-consts';

type Props = {
  product: Product;
  defaultCount?: number;
};

const ProductCardFull: FC<Props> = ({ product, defaultCount }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector(selectToken);
  const profile = useAppSelector(selectUserProfile);

  const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.product.id === product.id));
  const quantity = cartItem?.quantity ?? defaultCount ?? 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (cartItem) {
      dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
    } else if (newQuantity > 0) {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return null;
  }

  const { id, name, desc: description, price, oldPrice, photo: image, category } = product;

  return (
    <div className={s.card}>
      <div className={s.content}>
        <img src={image} alt={name} className={s.image} />
        <span className={s.category}>{category?.name}</span>
        <h2 className={s.name}>{name}</h2>
        <p className={s.description}>{description}</p>
      </div>
      <div className={s.footer}>
        <div>
          <span className={s.oldPrice}>
            {moneySign}&nbsp;{oldPrice}
          </span>
          &nbsp;
          <span className={s.price}>
            {moneySign}&nbsp;{price}
          </span>
        </div>
        {token && profile && (
          <div className={s.actions}>
            <AddToCart key="add-to-cart" count={quantity} onChange={handleQuantityChange} />
            <button type="button" className={s.editButton} onClick={() => navigate(`/products?modal=edit&id=${id}`)}>
              {t('screens.items.buttons.edit')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardFull;
