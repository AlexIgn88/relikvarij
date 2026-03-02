import React, { FC, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import s from './product-card-full.module.scss';
import AddToCart from '../add-to-cart/add-to-cart';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { addToCart, updateQuantity } from 'src/features/cart/cart-slice';
import { Product } from 'src/features/items/items-consts';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
  defaultCount?: number;
  actions?: ReactNode | ReactNode[];
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

const ProductCardFull: FC<Props> = ({ product, defaultCount, actions, imageProps }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.product.id === product.id));
  const quantity = cartItem?.quantity ?? defaultCount ?? 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (cartItem) {
      dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
    } else if (newQuantity > 0) {
      dispatch(addToCart(product));
    }
  };

  const mergedActions = useMemo(() => {
    if (actions) {
      return React.Children.toArray(actions);
    }
    return [<AddToCart key="add-to-cart" count={quantity} onChange={handleQuantityChange} />];
  }, [actions, quantity, handleQuantityChange]);

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
          <div className={s.actions}>{mergedActions}</div>
          <button onClick={() => navigate(`/products?modal=edit&id=${id}`)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardFull;
