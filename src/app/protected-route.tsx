import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { APP_ROUTES } from './routes';

type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={APP_ROUTES.INDEX} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

