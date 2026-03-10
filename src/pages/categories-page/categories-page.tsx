import React, { FC } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectCategories } from 'src/entities/categories/categories-slice';
import CategoryCardPreview from 'src/entities/categories/category-card-preview/category-card-preview';
import s from './categories-page.module.scss';

const CategoriesPage: FC = () => {
  const categories = useAppSelector(selectCategories);

  return (
    <main className={s.main}>
      {categories.map((item) => (
        <CategoryCardPreview key={item.id} category={item} />
      ))}
    </main>
  );
};

export default CategoriesPage;
