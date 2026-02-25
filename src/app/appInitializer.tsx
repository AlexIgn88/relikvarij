import React, { useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTokenFromStorage } from '../features/auth/auth-thunks';
import { loadProducts } from '../features/items/items-slice';

type Props = {
  children: ReactNode;
};

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const productsPageLoaded = useAppSelector((state) => state.items.productsPageNumber > 0);

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!productsPageLoaded) dispatch(loadProducts({ pageNumber: 1 }));
  }, [dispatch, productsPageLoaded]);

  return <>{children}</>;
};

export default AppInitializer;
