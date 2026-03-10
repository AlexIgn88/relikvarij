import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Formik } from 'formik';

import Modal from 'src/shared/ui/modal/modal';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { addNewCategory, editCategory, selectCategoryById } from 'src/entities/categories/categories-slice';
import { Category } from 'src/entities/categories/categories-consts';
import CategoryForm from 'src/features/forms/category-form/category-form';
import {
  CategoryFormValues,
  CategoryFormMode,
} from 'src/features/forms/category-form/types';
import { categoryFormValidate, initialCategoryFormValues } from 'src/features/forms/category-form/category-form-utils';

type Props = {
  mode: AdminActionType;
  categoryId?: string;
  onClose: () => void;
};

const CategoryFormModal: FC<Props> = ({ mode, categoryId, onClose }) => {
  const dispatch = useAppDispatch();

  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  const category = useAppSelector((state) => selectCategoryById(state, categoryId));

  const formMode: CategoryFormMode = useMemo(
    () => (mode === AdminActionType.EditProduct ? 'edit' : 'create'),
    [mode]
  );

  const initialValues = useMemo<CategoryFormValues>(() => {
    if (category) {
      return {
        name: category.name,
        photo: category.photo || '',
      };
    }

    return initialCategoryFormValues;
  }, [category]);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  const handleSubmit = (values: CategoryFormValues) => {
    if (mode === AdminActionType.CreateProduct) {
      dispatch(
        addNewCategory({
          name: values.name,
          photo: values.photo,
        })
      );
      onClose();
      return;
    }

    if (mode === AdminActionType.EditProduct && categoryId && category) {
      const updatedCategory: Category = {
        ...category,
        name: values.name,
        photo: values.photo,
      };

      dispatch(
        editCategory({
          id: categoryId,
          data: updatedCategory,
        })
      );
      onClose();
    }
  };

  return (
    <div>
      <Modal visible={true} setVisible={onClose}>
        <Formik<CategoryFormValues>
          initialValues={initialValues}
          validate={categoryFormValidate}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => (
            <CategoryForm
              mode={formMode}
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

export default CategoryFormModal;

