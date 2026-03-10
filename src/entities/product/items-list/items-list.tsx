import React, { FC, useEffect, useRef } from 'react';
import { Product } from 'src/entities/product/items-consts';
import s from './items-list.module.scss';
import ProductCardPreview from 'src/entities/product/product-card-preview/product-card-preview';
import ProductCardFull from 'src/entities/product/product-card-full/product-card-full';
import { Mode } from './items-list-consts';

type Props = {
  data: Product[];
  mode: Mode.full | Mode.preview;
  onLoadMore?: () => void;
};

const ItemsList: FC<Props> = ({ data, mode, onLoadMore }) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const ItemComponent = mode === Mode.preview ? ProductCardPreview : ProductCardFull;

  useEffect(() => {
    if (!onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { threshold: 0.5, rootMargin: '200px' }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [onLoadMore]);

  return (
    <>
      <div className={s.list}>
        {data.map((item) => (
          <ItemComponent key={item.id} product={item} />
        ))}
      </div>
      {onLoadMore && <div ref={observerRef} className={s.observer} aria-hidden />}
    </>
  );
};

export default ItemsList;
