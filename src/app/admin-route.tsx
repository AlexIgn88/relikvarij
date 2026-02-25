import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { APP_ROUTES } from './routes';

type Props = {
  children: ReactNode;
};

const AdminRoute: React.FC<Props> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.profile.profile);

  // if (!token || !profile || profile.role !== 'admin') {
  if (!token || !profile) {
    return <Navigate to={APP_ROUTES.INDEX} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
