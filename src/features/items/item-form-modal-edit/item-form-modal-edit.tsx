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
import {
  selectProducts,
  selectOperations,
  addNewOperation,
  editProduct,
  editOperation,
} from 'src/features/items/items-slice';
import { Product, Operation } from 'src/homeworks/ts1/3_write';
import { useLocation } from 'react-router-dom';
import { NewOperation, NewProduct } from 'src/features/items/items-consts';
import {
  // FormValues,
  OperationFormValues,
  ProductFormValues,
} from 'src/features/items/item-form-modal-create/item-form-modal-consts';

type Props = {
  mode: AdminActionType;
  itemId?: string;
  onClose: () => void;
};

const ItemFormModalEdit: FC<Props> = ({ mode, itemId, onClose }) => {
  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isProducts = location.pathname.includes('/products');
  const products = useAppSelector(selectProducts);
  const operations = useAppSelector(selectOperations);

  const existingItem = useMemo(() => {
    if (!itemId) return null;
    if (isProducts) {
      return products.find((p) => p.id === itemId);
    }
    return operations.find((o) => o.id === itemId);
  }, [itemId, isProducts, products, operations]);

  const initialValues = useMemo(() => {
    if (existingItem) {
      if (isProducts) {
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
      } else {
        const operation = existingItem as Operation;
        return {
          id: operation.id,
          name: operation.name,
          desc: operation.desc || '',
          amount: operation.amount,
          type: operation.type,
          categoryId: operation.category.id,
          categoryName: operation.category.name,
        };
      }
    }
    return getEmptyValues(mode);
  }, [existingItem, mode, isProducts]);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSubmit = (values) => {
    if (isProducts) {
      const v = values as ProductFormValues;

      const product: Omit<NewProduct, 'createdAt'> = {
        name: v.name,
        photo: v.photo || '',
        desc: v.desc,
        price: v.price || 0,
        oldPrice: v.oldPrice,
        categoryId: v.categoryId,
      };

      if (existingItem) {
        dispatch(editProduct({ id: existingItem.id, data: product }));
      } else {
        // dispatch(addNewProduct(product));
        onClose();
      }
    } else {
      const v = values as OperationFormValues;

      const operation: NewOperation = {
        name: v.name,
        desc: v.desc,
        amount: v.amount || 0,
        type: (v.type as 'Cost' | 'Profit') || 'Cost',
        date: new Date().toISOString(),
        categoryId: values.categoryId,
      };

      if (existingItem) {
        dispatch(editOperation({ id: existingItem.id, data: operation }));
      } else {
        onClose();
      }
    }

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
