import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Formik } from 'formik';

import Modal from 'src/shared/ui/modal/modal';
import ProductOperationForm from 'src/features/forms/product-operation-form/product-operation-form';
import { createValidate, getEmptyValues } from 'src/features/forms/product-operation-form/product-operation-form-utils';
import {
  AdminActionType,
  FormikContext,
} from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addNewProduct, editProduct, selectProductById } from 'src/entities/product/items-slice';
import { NewProduct, Product } from 'src/entities/product/items-consts';
import { ProductFormValues } from 'src/features/items/item-form-modal/item-form-modal-consts';

type Props = {
  mode: AdminActionType;
  itemId?: string;
  onClose: () => void;
};

const ItemFormModal: FC<Props> = ({ mode, itemId, onClose }) => {
  const dispatch = useAppDispatch();

  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  const product = useAppSelector((state) => selectProductById(state, itemId));

  const initialValues = useMemo(() => {
    if (mode === AdminActionType.EditProduct && product) {
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

    if (mode === AdminActionType.CreateProduct && product) {
      const template = product as Product;
      return {
        name: template.name,
        photo: template.photo,
        desc: template.desc || '',
        price: template.price,
        oldPrice: template.oldPrice,
        categoryId: template.category.id,
        categoryName: template.category.name,
      };
    }

    return getEmptyValues(mode);
  }, [mode, product]);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  const handleSubmit = (values: ProductFormValues) => {
    if (mode === AdminActionType.CreateProduct) {
      const createdAt =
        mode === AdminActionType.CreateProduct && product ? product.createdAt : new Date().toISOString();

      const newProduct: NewProduct = {
        name: values.name,
        photo: values.photo || '',
        desc: values.desc,
        price: values.price || 0,
        oldPrice: values.oldPrice,
        createdAt,
        categoryId: values.categoryId,
      };

      dispatch(addNewProduct(newProduct));
      onClose();
      return;
    }

    if (mode === AdminActionType.EditProduct) {
      if (!itemId) {
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
    }
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

export default ItemFormModal;
