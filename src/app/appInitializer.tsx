import React, { useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTokenFromStorage } from '../features/auth/auth-thunks';
import { loadProducts, loadOperations } from '../features/items/items-slice';
// import { products, operations } from 'src/features/items/items-list/items-list-utils';

type Props = {
  children: ReactNode;
};

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const productsPageLoaded = useAppSelector((state) => state.items.productsPageNumber > 0);
  const operationsPageLoaded = useAppSelector((state) => state.items.operationsPageNumber > 0);

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!productsPageLoaded) dispatch(loadProducts({ pageNumber: 1 }));
    if (!operationsPageLoaded) dispatch(loadOperations({ pageNumber: 1 }));
  }, [dispatch, productsPageLoaded, operationsPageLoaded]);

  return <>{children}</>;
};

export default AppInitializer;
