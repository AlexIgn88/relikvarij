import React, { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { Product } from 'src/entities/product/items-consts';
import s from './items-list.module.scss';
import ProductCardPreview from 'src/entities/product/product-card-preview/product-card-preview';
import ProductCardFull from 'src/entities/product/product-card-full/product-card-full';
import { Mode } from './items-list-consts';

type RenderItem = (params: { item: Product; index: number; mode: Mode }) => ReactNode;

type Props = {
  data: Product[];
  mode: Mode.full | Mode.preview;
  renderItem?: RenderItem;
  listProps?: React.HTMLAttributes<HTMLDivElement>;
  onLoadMore?: () => void;
};

const ItemsList: FC<Props> = ({ data, mode, renderItem, listProps, onLoadMore }) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const listClassName = useMemo(() => clsx(s.list, listProps?.className), [listProps?.className]);

  const mergedListProps = useMemo(
    () => ({
      ...listProps,
      className: listClassName,
    }),
    [listProps, listClassName]
  );

  const ItemComponent = mode === Mode.preview ? ProductCardPreview : ProductCardFull;

  const resolvedRenderer = (item: Product, index: number) =>
    renderItem ? renderItem({ item, index, mode }) : <ItemComponent product={item} />;

  useEffect(() => {
    if (!onLoadMore || renderItem) return;

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
  }, [onLoadMore, renderItem]);

  // if (!items.length) {
  //   const resolvedEmpty = typeof emptyState === 'function' ? emptyState() : emptyState;
  //   return <div className={s.empty}>{resolvedEmpty ?? 'No items to display'}</div>;
  // }

  return (
    <>
      <div {...mergedListProps}>
        {data.map((item, index) => {
          const element = resolvedRenderer(item, index);
          // const key = 'id' in item ? item.id : `${index}`;
          const key = `${index}`;

          return <React.Fragment key={key}>{element}</React.Fragment>;
        })}
      </div>
      {onLoadMore && <div ref={observerRef} className={s.observer} aria-hidden />}
    </>
  );
};

export default ItemsList;
