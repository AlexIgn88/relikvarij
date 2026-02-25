import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Operation, Product } from 'src/homeworks/ts1/3_write';
import s from './items-list.module.scss';
import ProductCardPreview from '../../../common/product-card-preview/product-card-preview';
import ProductCardFull from '../../../common/product-card-full/product-card-full';
import OperationCardPreview from '../../../common/operation-card-preview/operation-card-preview';
import OperationCardFull from '../../../common/operation-card-full/operation-card-full';
import { Mode } from './items-list-consts';

type RenderItem = (params: { item: Product | Operation; index: number; mode: Mode }) => ReactNode;

type Props = {
  data: Product[] | Operation[];
  mode: Mode.full | Mode.preview;
  renderItem?: RenderItem;
  emptyState?: ReactNode | (() => ReactNode);
  listProps?: React.HTMLAttributes<HTMLDivElement>;
  onLoadMore?: () => void;
};

const isProductItem = (item: Product | Operation): item is Product => 'price' in item;
const isOperationItem = (item: Product | Operation): item is Operation => 'amount' in item;

const toProductPreviewProps = (product: Product) => ({
  product,
});

const toProductFullProps = (product: Product) => ({
  product,
});

const toOperationPreviewProps = (operation: Operation) => ({
  sum: operation.amount,
  categoryName: operation.category.name,
  name: operation.name,
  description: operation.desc,
});

const toOperationFullProps = (operation: Operation) => ({
  operation,
});

const ItemsList: FC<Props> = ({ data, mode, renderItem, emptyState, listProps, onLoadMore }) => {
  const [items, setItems] = useState<(Product | Operation)[]>(data);
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
    (item: Product | Operation) => {
      if (isProductItem(item)) {
        return mode === Mode.preview ? (
          <ProductCardPreview {...toProductPreviewProps(item)} />
        ) : (
          <ProductCardFull {...toProductFullProps(item)} />
        );
      }
      if (isOperationItem(item)) {
        return mode === Mode.preview ? (
          <OperationCardPreview {...toOperationPreviewProps(item)} />
        ) : (
          <OperationCardFull {...toOperationFullProps(item)} />
        );
      }

      return null;
    },
    [mode]
  );

  const resolvedRenderer = useCallback(
    (item: Product | Operation, index: number) => {
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
