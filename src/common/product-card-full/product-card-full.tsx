import React, { FC } from 'react';
import clsx from 'clsx';
import s from './product-card-full.module.scss';
import AddToCart from '../add-to-cart/add-to-cart';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { addToCart, updateQuantity } from 'src/features/cart/cart-slice';
import { Product } from 'src/features/items/items-consts';
import { useNavigate } from 'react-router-dom';
import { selectToken } from 'src/features/auth/auth-slice';
import { selectUserProfile } from 'src/features/profile/profile-slice';

type Props = {
  product: Product;
  defaultCount?: number;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

const ProductCardFull: FC<Props> = ({ product, defaultCount, imageProps }) => {
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

  const { id, name, desc: description, price, photo: image, category } = product;

  return (
    <div className={s.card}>
      <img src={image} alt={name} {...imageProps} className={clsx(s.image, imageProps?.className)} />
      <div className={s.content}>
        <span className={s.category}>{category?.name}</span>
        <h2 className={s.name}>{name}</h2>
        <p className={s.description}>{description}</p>
        <div className={s.footer}>
          <span className={s.price}>${price}</span>
          {token && profile && (
            <div className={s.actions}>
              <AddToCart key="add-to-cart" count={quantity} onChange={handleQuantityChange} />
              <button onClick={() => navigate(`/products?modal=edit&id=${id}`)}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardFull;
