import React, { FC, useEffect, useRef, useMemo } from 'react';
import ModalWindow from 'src/common/modal-window/modal-window';
import ProductOperationForm from 'src/features/forms/product-operation-form/product-operation-form';
import { Formik } from 'formik';
import { createValidate, getEmptyValues } from 'src/features/forms/product-operation-form/product-operation-form-utils';
import {
  AdminActionType,
  FormikContext,
} from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectProducts, editProduct } from 'src/features/items/items-slice';
import { Product } from 'src/homeworks/ts1/3_write';

import { NewProduct } from 'src/features/items/items-consts';

import { ProductFormValues } from 'src/features/items/item-form-modal-create/item-form-modal-consts';

type Props = {
  mode: AdminActionType;
  itemId?: string;
  onClose: () => void;
};

const ItemFormModalEdit: FC<Props> = ({ mode, itemId, onClose }) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);

  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  //TODO
  const existingItem = useMemo(() => {
    if (!itemId) return null;
    return products.find((p) => p.id === itemId);
  }, [itemId, products]);

  const initialValues = useMemo(() => {
    if (existingItem) {
      const product = existingItem as Product;
      return {
        id: product.id,
        name: product.name,
        photo: product.photo,
        desc: product.desc || '',
        price: product.price,
        oldPrice: product.oldPrice,
        categoryId: product.category.id,
        categoryName: product.category.name,
      };
    }
    return getEmptyValues(mode);
  }, [existingItem, mode]);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  const handleSubmit = (values: ProductFormValues) => {
    const product: Omit<NewProduct, 'createdAt'> = {
      name: values.name,
      photo: values.photo || '',
      desc: values.desc,
      price: values.price || 0,
      oldPrice: values.oldPrice,
      categoryId: values.categoryId,
    };

    dispatch(editProduct({ id: existingItem.id, data: product }));
    onClose();
  };

  return (
    <div>
      <ModalWindow visible={true} setVisible={onClose}>
        <Formik
          initialValues={initialValues}
          validate={createValidate(mode)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik: FormikContext) => (
            <ProductOperationForm
              mode={mode}
              formManager={formik}
              formElement={formElementRef}
              autoFocusElement={autoFocusElementRef}
            />
          )}
        </Formik>
      </ModalWindow>
    </div>
  );
};

export default ItemFormModalEdit;
