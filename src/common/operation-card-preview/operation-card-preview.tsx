import React, { FC } from 'react';
import s from './operation-card-preview.module.scss';

type Props = {
  sum: number;
  categoryName: string;
  name: string;
  description: string;
};

const OperationCardPreview: FC<Props> = ({ sum, categoryName, name, description }) => {
  return (
    <div className={s.card}>
      <div className={s.categoryName}>{categoryName}</div>
      <div className={s.name}>{name}</div>
      <div className={s.sum}>${sum}</div>
      <div className={s.description}>{description}</div>
    </div>
  );
};

export default OperationCardPreview;
