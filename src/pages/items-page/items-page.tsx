import React, { FC, useCallback } from 'react';
import ItemsList from 'src/entities/product/items-list/items-list';
import { Mode } from 'src/entities/product/items-list/items-list-consts';
import s from './items-page.module.scss';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectloadItemsStatus,
  selectProductsPagination,
  loadProducts,
  selectProducts,
} from 'src/entities/product/items-slice';
import { THUNK_STATUSES } from 'src/store/store-consts';
import ItemFormModal from 'src/features/items/item-form-modal/item-form-modal';
import ProtectedRoute from 'src/app/router/protected-route/protected-route';

const ItemsPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [searchParams, setSearchParams] = useSearchParams();

  const items = useAppSelector(selectProducts);
  const pagination = useAppSelector(selectProductsPagination);

  const hasMore = items.length < pagination.total;

  const loadItemsStatus = useAppSelector(selectloadItemsStatus);
  const load = loadItemsStatus === THUNK_STATUSES.PENDING;

  const onLoadMore = useCallback(() => {
    if (!hasMore) return;

    dispatch(loadProducts({ pageNumber: pagination.pageNumber + 1 }));
  }, [dispatch, hasMore, pagination.pageNumber]);

  const profile = useAppSelector((state) => state.profile.profile);

  const modal = searchParams.get('modal');
  const id = searchParams.get('id');

  const isCreate = modal === 'create';
  const isEdit = modal === 'edit' && Boolean(id);

  if (load) {
    return <div>Загрузка...</div>;
  }

  if (!items) {
    return null;
  }

  return (
    <main>
      {profile && (
        <div className={s.controlPanel}>
          <button className={s.controlButton} onClick={() => navigate(`${pathname}?modal=create`)}>
            {t('screens.items.buttons.create')}
          </button>
        </div>
      )}

      {items && <ItemsList data={items} mode={Mode.full} onLoadMore={onLoadMore} />}
      {(isCreate || isEdit) && (
        <ProtectedRoute>
          {isCreate && (
            <ItemFormModal mode={AdminActionType.CreateProduct} itemId={id} onClose={() => setSearchParams({})} />
          )}
          {isEdit && (
            <ItemFormModal mode={AdminActionType.EditProduct} itemId={id} onClose={() => setSearchParams({})} />
          )}
        </ProtectedRoute>
      )}
    </main>
  );
};

export default ItemsPage;
