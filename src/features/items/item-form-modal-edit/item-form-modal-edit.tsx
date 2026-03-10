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
import { selectProductById, editProduct } from 'src/entities/product/items-slice';

import { NewProduct, Product } from 'src/entities/product/items-consts';

import { ProductFormValues } from 'src/features/items/item-form-modal-create/item-form-modal-consts';

type Props = {
  mode: AdminActionType;
  itemId?: string;
  onClose: () => void;
};

const ItemFormModalEdit: FC<Props> = ({ mode, itemId, onClose }) => {
  const dispatch = useAppDispatch();

  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  const product = useAppSelector((state) => selectProductById(state, itemId));

  const initialValues = useMemo(() => {
    if (product) {
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
  }, [product, mode]);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  const handleSubmit = (values: ProductFormValues) => {
    if (!itemId) {
      // itemId обязателен для режима редактирования
      return;
    }
    const updatedData: Omit<NewProduct, 'createdAt'> = {
      name: values.name,
      photo: values.photo || '',
      desc: values.desc,
      price: values.price || 0,
      oldPrice: values.oldPrice,
      categoryId: values.categoryId,
    };

    dispatch(editProduct({ id: itemId, data: updatedData }));
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

export default ItemFormModalEdit;
