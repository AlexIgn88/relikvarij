import React, { FC, useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectCategories } from 'src/entities/categories/categories-slice';
import CategoryCardPreview from 'src/entities/categories/category-card-preview/category-card-preview';
import CategoryFormModal from 'src/features/categories/category-form-modal/category-form-modal';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import s from './categories-page.module.scss';

const CategoriesPage: FC = () => {
  const categories = useAppSelector(selectCategories);

  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [mode, setMode] = useState<AdminActionType | null>(null);

  const handleCloseModal = () => {
    setMode(null);
    setCategoryId(undefined);
  };

  return (
    <main className={s.main}>
      <button
        type="button"
        onClick={() => {
          setMode(AdminActionType.CreateProduct);
          setCategoryId(undefined);
        }}
      >
        Add category
      </button>

      {categories.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            setMode(AdminActionType.EditProduct);
            setCategoryId(item.id);
          }}
        >
          <CategoryCardPreview category={item} />
        </div>
      ))}

      {mode && <CategoryFormModal mode={mode} categoryId={categoryId} onClose={handleCloseModal} />}
    </main>
  );
};

export default CategoriesPage;
