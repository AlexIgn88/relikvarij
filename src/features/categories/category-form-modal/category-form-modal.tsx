import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Formik } from 'formik';

import Modal from 'src/shared/ui/modal/modal';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { addNewCategory, editCategory, selectCategoryById } from 'src/entities/categories/categories-slice';
import { Category } from 'src/entities/categories/categories-consts';

type Props = {
  mode: AdminActionType;
  categoryId?: string;
  onClose: () => void;
};

type CategoryFormValues = {
  name: string;
  photo?: string;
};

const CategoryFormModal: FC<Props> = ({ mode, categoryId, onClose }) => {
  const dispatch = useAppDispatch();

  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef<HTMLInputElement | null>(null);

  const category = useAppSelector((state) => selectCategoryById(state, categoryId));

  const initialValues = useMemo<CategoryFormValues>(() => {
    if (category) {
      return {
        name: category.name,
        photo: category.photo,
      };
    }

    return {
      name: '',
      photo: '',
    };
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
    <Modal visible={true} setVisible={onClose}>
      <Formik<CategoryFormValues> initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {(formik) => (
          <form ref={formElementRef} onSubmit={formik.handleSubmit}>
            <div>
              <input
                ref={autoFocusElementRef}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Name"
              />
            </div>

            <div>
              <input
                name="photo"
                value={formik.values.photo || ''}
                onChange={formik.handleChange}
                placeholder="Photo URL"
              />
            </div>

            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default CategoryFormModal;

