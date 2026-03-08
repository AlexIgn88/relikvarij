import React, { FC, useCallback } from 'react';

import s from './product-card-preview.module.scss';
import AddToCart from 'src/features/cart/add-to-cart/add-to-cart';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { addToCart, updateQuantity } from 'src/features/cart/cart-slice';
import { Product } from 'src/entities/product/items-consts';
import DeleteProduct from 'src/features/cart/delete-product/delete-product';
import { moneySign } from 'src/shared/lib/common-consts';

type Props = {
  product: Product;
  defaultCount?: number;
};

const ProductCardPreview: FC<Props> = ({ product, defaultCount = 0 }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.product?.id === product?.id));
  const quantity = cartItem?.quantity ?? defaultCount;

  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (cartItem) {
        dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
      } else if (newQuantity > 0) {
        dispatch(addToCart(product));
      }
    },
    [cartItem, dispatch, product]
  );

  const { name, desc: description, price, photo: image } = product;

  return (
    <div className={s.card}>
      <div className={s.content}>
        <img src={image} alt={name} className={s.image} />
        <h3 className={s.name}>{name}</h3>
        <p className={s.description}>{description}</p>
      </div>
      <div className={s.footer}>
        <div className={s.price}>
          {moneySign}&nbsp;{price}
        </div>
        <div className={s.actions}>
          <AddToCart key="add-to-cart" count={quantity} onChange={handleQuantityChange} />
          <DeleteProduct key="delete-product" productId={product?.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardPreview;
