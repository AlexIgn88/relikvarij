import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Product } from 'src/features/items/items-consts';
import s from './items-list.module.scss';
import ProductCardPreview from '../../../common/product-card-preview/product-card-preview';
import ProductCardFull from '../../../common/product-card-full/product-card-full';
import { Mode } from './items-list-consts';

type RenderItem = (params: { item: Product; index: number; mode: Mode }) => ReactNode;

type Props = {
  data: Product[];
  mode: Mode.full | Mode.preview;
  renderItem?: RenderItem;
  listProps?: React.HTMLAttributes<HTMLDivElement>;
  onLoadMore?: () => void;
};

const toProductPreviewProps = (product: Product) => ({
  product,
});

const toProductFullProps = (product: Product) => ({
  product,
});

const ItemsList: FC<Props> = ({ data, mode, renderItem, listProps, onLoadMore }) => {
  const [items, setItems] = useState<Product[]>(data);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const listClassName = useMemo(() => clsx(s.list, listProps?.className), [listProps?.className]);

  const mergedListProps = useMemo(
    () => ({
      ...listProps,
      className: listClassName,
    }),
    [listProps, listClassName]
  );

  const defaultRenderer = useCallback(
    (item: Product) => {
      return mode === Mode.preview ? (
        <ProductCardPreview {...toProductPreviewProps(item)} />
      ) : (
        <ProductCardFull {...toProductFullProps(item)} />
      );
    },
    [mode]
  );

  const resolvedRenderer = useCallback(
    (item: Product, index: number) => {
      if (renderItem) {
        return renderItem({ item, index, mode });
      }

      return defaultRenderer(item);
    },
    [defaultRenderer, mode, renderItem]
  );

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
        {items.map((item, index) => {
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
