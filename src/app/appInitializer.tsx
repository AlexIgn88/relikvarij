import React, { useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTokenFromStorage } from '../features/auth/auth-thunks';
import { loadProducts } from '../features/items/items-slice';
import { loadCategories, selectCategories } from 'src/features/categories/categories-slice';

type Props = {
  children: ReactNode;
};

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const productsPageLoaded = useAppSelector((state) => state.items.productsPageNumber > 0);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
    if (!productsPageLoaded && categories.length > 0) {
      dispatch(loadProducts({ pageNumber: 1 }));
    }
  }, [categories.length, dispatch, productsPageLoaded]);

  return <>{children}</>;
};

export default AppInitializer;
