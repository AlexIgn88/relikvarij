import React, { FC, useEffect, useRef, useMemo } from 'react';
import Modal from 'src/shared/ui/modal/modal';
import ProductOperationForm from 'src/features/forms/product-operation-form/product-operation-form';
import { Formik } from 'formik';
import { createValidate, getEmptyValues } from 'src/features/forms/product-operation-form/product-operation-form-utils';
import {
  AdminActionType,
  FormikContext,
} from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectProducts, addNewProduct } from 'src/entities/product/items-slice';

import { NewProduct, Product } from 'src/entities/product/items-consts';
import { ProductFormValues } from 'src/features/items/item-form-modal-create/item-form-modal-consts';

type Props = {
  mode: AdminActionType;
  itemId?: string;
  onClose: () => void;
};

const ItemFormModalCreate: FC<Props> = ({ mode, itemId, onClose }) => {
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
    const createdAt = existingItem ? existingItem.createdAt : new Date().toISOString();

    const product: NewProduct = {
      name: values.name,
      photo: values.photo || '',
      desc: values.desc,
      price: values.price || 0,
      oldPrice: values.oldPrice,
      createdAt,
      categoryId: values.categoryId,
    };

    dispatch(addNewProduct(product));
    onClose();
  };

  return (
    <div>
      <Modal visible={true} setVisible={onClose}>
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
      </Modal>
    </div>
  );
};

export default ItemFormModalCreate;
