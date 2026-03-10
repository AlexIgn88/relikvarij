import React, { FC } from 'react';

import s from './category-card-preview.module.scss';
import { Category } from 'src/entities/categories/categories-consts';

type Props = {
  category: Category;
};

const CategoryCardPreview: FC<Props> = ({ category }) => {
  const { name, photo } = category;

  return (
    <div className={s.card}>
      <h3 className={s.name}>{name}</h3>
      {photo && <img src={photo} alt={name} className={s.image} />}
    </div>
  );
};

export default CategoryCardPreview;
