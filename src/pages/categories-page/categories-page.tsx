import React, { FC, useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectCategories } from 'src/entities/categories/categories-slice';
import CategoryCardPreview from 'src/entities/categories/category-card-preview/category-card-preview';
import CategoryFormModal from 'src/features/categories/category-form-modal/category-form-modal';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import s from './categories-page.module.scss';
import { useTranslation } from 'react-i18next';

const CategoriesPage: FC = () => {
  const { t } = useTranslation();
  const categories = useAppSelector(selectCategories);

  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [mode, setMode] = useState<AdminActionType | null>(null);

  const handleCloseModal = () => {
    setMode(null);
    setCategoryId(undefined);
  };

  return (
    <main className={s.main}>
      <div className={s.controlPanel}>
        <button
          type="button"
          className={s.controlButton}
          onClick={() => {
            setMode(AdminActionType.CreateProduct);
            setCategoryId(undefined);
          }}
        >
          {t('screens.categories.buttons.create')}
        </button>
      </div>

      <div className={s.grid}>
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
      </div>

      {mode && <CategoryFormModal mode={mode} categoryId={categoryId} onClose={handleCloseModal} />}
    </main>
  );
};

export default CategoriesPage;
