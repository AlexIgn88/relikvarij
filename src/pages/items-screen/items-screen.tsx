import React, { FC, useCallback } from 'react';
import ItemsList from 'src/features/items/items-list/items-list';
import { Mode } from 'src/features/items/items-list/items-list-consts';
import s from './items-screen.module.scss';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ItemFormModalCreate from 'src/features/items/item-form-modal-create/item-form-modal-create';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import AdminRoute from 'src/app/admin-route';
import {
  selectloadItemsStatus,
  selectProductsPagination,
  selectOperationsPagination,
  loadProducts,
  loadOperations,
} from 'src/features/items/items-slice';
import { THUNK_STATUSES } from 'src/store/store-consts';
import ItemFormModalEdit from 'src/features/items/item-form-modal-edit/item-form-modal-edit';

const ItemsScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isProducts = pathname.includes('/products');
  const products = useAppSelector((state) => state.items.products);
  const operations = useAppSelector((state) => state.items.operations);
  const productsPagination = useAppSelector(selectProductsPagination);
  const operationsPagination = useAppSelector(selectOperationsPagination);

  const loadItemsStatus = useAppSelector(selectloadItemsStatus);
  const load = loadItemsStatus === THUNK_STATUSES.PENDING;

  const items = isProducts ? products : operations;
  const pagination = isProducts ? productsPagination : operationsPagination;
  const hasMore = items.length < pagination.total;

  const onLoadMore = useCallback(() => {
    if (!hasMore) return;
    if (isProducts) {
      dispatch(loadProducts({ pageNumber: pagination.pageNumber + 1 }));
    } else {
      dispatch(loadOperations({ pageNumber: pagination.pageNumber + 1 }));
    }
  }, [dispatch, isProducts, hasMore, pagination.pageNumber]);
  const profile = useAppSelector((state) => state.profile.profile);
  // const isAdmin = profile?.role === 'admin';

  const [searchParams, setSearchParams] = useSearchParams();

  const modal = searchParams.get('modal');
  const id = searchParams.get('id');

  const isCreate = modal === 'create';
  const isEdit = modal === 'edit' && Boolean(id);
  const itemFormModalMode = isCreate
    ? isProducts
      ? AdminActionType.CreateProduct
      : AdminActionType.CreateOperation
    : isProducts
    ? AdminActionType.EditProduct
    : AdminActionType.EditOperation;

  if (load) {
    return <div>Загрузка...</div>;
  }

  // if (!products || !operations) {
  //   return null;
  // }

  if (products && operations) {
    return (
      <main>
        {/*{isAdmin && (*/}
        {profile && (
          <div className={s.controlPanel}>
            <button className={s.controlButton} onClick={() => navigate(`${pathname}?modal=create`)}>
              {t('screens.items.buttons.create')}
            </button>
          </div>
        )}

        {items && <ItemsList data={items} mode={Mode.full} onLoadMore={onLoadMore} />}
        {(isCreate || isEdit) && (
          <AdminRoute>
            {isCreate && (
              <ItemFormModalCreate mode={itemFormModalMode} itemId={id} onClose={() => setSearchParams({})} />
            )}
            {isEdit && <ItemFormModalEdit mode={itemFormModalMode} itemId={id} onClose={() => setSearchParams({})} />}
          </AdminRoute>
        )}
      </main>
    );
  }
};

export default ItemsScreen;
