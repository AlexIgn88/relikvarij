import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';
import { APP_ROUTES } from '../../routes';
import { selectToken } from 'src/features/auth/auth-slice';

type Props = {
  children: ReactNode;
};

const ProtectedRoute: FC<Props> = ({ children }) => {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to={APP_ROUTES.INDEX} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
