import React, { FC } from 'react';
import s from './logo.module.scss';
import { APP_ROUTES } from 'src/app/routes';
import { useNavigate } from 'react-router-dom';

const Logo: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(APP_ROUTES.INDEX);
  };

  return <div className={s.logo} onClick={handleGoHome}></div>;
};

export default Logo;
