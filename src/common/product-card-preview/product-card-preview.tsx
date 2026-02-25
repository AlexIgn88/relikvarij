import React, { FC, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import s from './product-card-preview.module.scss';
import AddToCart from '../add-to-cart/add-to-cart';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { addToCart, updateQuantity } from 'src/features/cart/cart-slice';
import { Product } from 'src/homeworks/ts1/3_write';
import DeleteProduct from '../delete-product/delete-product';

type Props = {
  product: Product;
  defaultCount?: number;
  actions?: ReactNode | ReactNode[];
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

const ProductCardPreview: FC<Props> = ({ product, defaultCount = 0, actions, imageProps }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.product?.id === product?.id));
  const quantity = cartItem?.quantity ?? defaultCount;

  const handleQuantityChange = (newQuantity: number) => {
    if (cartItem) {
      dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
    } else if (newQuantity > 0) {
      dispatch(addToCart(product));
    }
  };

  // const handleAddToCart = () => {
  //   dispatch(addToCart(product));
  // };

  const mergedActions = useMemo(() => {
    if (actions) {
      return React.Children.toArray(actions);
    }
    return [
      <AddToCart key="add-to-cart" count={quantity} onChange={handleQuantityChange} />,
      <DeleteProduct key="delete-product" productId={product?.id} />,
    ];
  }, [actions, quantity, handleQuantityChange, product?.id]);

  const { name, desc: description, price, photo: image } = product;

  return (
    <div className={s.card}>
      <img src={image} alt={name} {...imageProps} className={clsx(s.image, imageProps?.className)} />
      <div className={s.content}>
        <h3 className={s.name}>{name}</h3>
        <p className={s.description}>{description}</p>
        <div className={s.footer}>
          <span className={s.price}>${price}</span>
          <div className={s.actions}>{mergedActions}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPreview;
