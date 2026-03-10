import React, { FC, useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectCategories, selectloadCategoriesStatus } from 'src/entities/categories/categories-slice';
import CategoryCardPreview from 'src/entities/categories/category-card-preview/category-card-preview';
import CategoryFormModal from 'src/features/categories/category-form-modal/category-form-modal';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import s from './categories-page.module.scss';
import { useTranslation } from 'react-i18next';
import { THUNK_STATUSES } from 'src/store/store-consts';
import Spinner from 'src/shared/ui/spinner/spinner';

const CategoriesPage: FC = () => {
  const { t } = useTranslation();

  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [mode, setMode] = useState<AdminActionType | null>(null);

  const categories = useAppSelector(selectCategories);
  const profile = useAppSelector((state) => state.profile.profile);

  const loadCategoriesStatus = useAppSelector(selectloadCategoriesStatus);
  const load = loadCategoriesStatus === THUNK_STATUSES.PENDING;

  const handleCloseModal = () => {
    setMode(null);
    setCategoryId(undefined);
  };

  if (load) {
    return <Spinner />;
  }

  if (!categories) {
    return null;
  }

  return (
    <main className={s.main}>
      {profile && (
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
      )}

      <div className={s.grid}>
        {categories.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setMode(AdminActionType.EditProduct);
              setCategoryId(item.id);
            }}
          >
            <CategoryCardPreview category={item} isClickable={!!profile} />
          </div>
        ))}
      </div>

      {profile && mode && <CategoryFormModal mode={mode} categoryId={categoryId} onClose={handleCloseModal} />}
    </main>
  );
};

export default CategoriesPage;
