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
  // updateProduct,
  // addOperation,
  // updateOperation,
  selectProducts,
  selectOperations,
  addNewProduct,
  addNewOperation,
} from 'src/features/items/items-slice';
import {
  Product,
  Operation,
  // createRandomProduct, createRandomOperation
} from 'src/homeworks/ts1/3_write';
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

const ItemFormModalCreate: FC<Props> = ({ mode, itemId, onClose }) => {
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
    const createdAt = existingItem ? existingItem.createdAt : new Date().toISOString();

    if (isProducts) {
      const v = values as ProductFormValues;

      const product: NewProduct = {
        name: v.name,
        photo: v.photo || '',
        desc: v.desc,
        price: v.price || 0,
        oldPrice: v.oldPrice,
        createdAt,
        categoryId: v.categoryId,
        // category: {
        //   id: values.categoryId,
        //   name: values.categoryName,
        // },
      };

      if (existingItem) {
        // dispatch(updateProduct(product));
        onClose();
      } else {
        dispatch(addNewProduct(product));
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
        // category: {
        //   id: values.categoryId,
        //   name: values.categoryName,
        // },
      };

      if (existingItem) {
        // dispatch(updateOperation(operation));
        onClose();
      } else {
        dispatch(addNewOperation(operation));
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

export default ItemFormModalCreate;
