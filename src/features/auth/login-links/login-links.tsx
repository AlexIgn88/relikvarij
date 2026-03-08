import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from 'src/app/routes';

type Props = {
  className?: string;
};

const LoginLinks: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <ul className={className}>
      <li>
        <Link to={APP_ROUTES.SIGNUP}>{t('screens.home.signup')}</Link>
      </li>
      <li>
        <Link to={APP_ROUTES.LOGIN}>{t('screens.home.login')}</Link>
      </li>
    </ul>
  );
};

export default LoginLinks;
