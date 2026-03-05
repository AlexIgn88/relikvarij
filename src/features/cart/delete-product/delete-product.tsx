import React, { FC } from 'react';
import s from './delete-product.module.scss';
import { useAppDispatch } from 'src/store/hooks';
import { removeFromCart } from 'src/features/cart/cart-slice';
import { useTranslation } from 'react-i18next';

type Props = {
  productId: string;
};

const DeleteProduct: FC<Props> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDelete = () => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className={s.wrapper}>
      <button className={s.deleteButton} onClick={handleDelete}>
        {t('screens.items.buttons.delete')}
      </button>
    </div>
  );
};

export default DeleteProduct;
