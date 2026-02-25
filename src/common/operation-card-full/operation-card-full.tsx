import React, { FC } from 'react';
import s from './operation-card-full.module.scss';
import { useNavigate } from 'react-router-dom';
import { Operation } from 'src/homeworks/ts1/3_write';
import { parseIsoDate } from 'src/common/common-utils';

type Props = {
  operation: Operation;
};

const OperationCardFull: FC<Props> = ({ operation }) => {
  const navigate = useNavigate();

  if (!operation) {
    return null;
  }

  const { id, name, desc: description, createdAt: date, amount, category } = operation;

  return (
    <div className={s.card}>
      <div className={s.categoryName}>{category?.name}</div>
      <div className={s.name}>{name}</div>
      <div className={s.sum}>${amount}</div>
      <div className={s.date}>{parseIsoDate(date)}</div>
      <div className={s.description}>{description}</div>
      <button onClick={() => navigate(`/operations?modal=edit&id=${id}`)}>Edit</button>
    </div>
  );
};

export default OperationCardFull;
