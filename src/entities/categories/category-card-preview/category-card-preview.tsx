import React, { FC } from 'react';

import s from './category-card-preview.module.scss';
import { Category } from 'src/entities/categories/categories-consts';
import clsx from 'clsx';

type Props = {
  category: Category;
  isClickable?: boolean;
};

const CategoryCardPreview: FC<Props> = ({ category, isClickable = false }) => {
  const { name, photo } = category;

  return (
    <div className={clsx(s.card, isClickable && s.clickable)}>
      <h3 className={s.name}>{name}</h3>
      {photo && <img src={photo} alt={name} className={s.image} />}
    </div>
  );
};

export default CategoryCardPreview;
