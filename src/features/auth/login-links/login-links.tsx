import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from 'src/app/routes';

type Props = {
  className?: string;
};

const LoginLinks: FC<Props> = ({ className }) => {
  return (
    <ul className={className}>
      <li>
        <Link to={APP_ROUTES.SIGNUP}>Signup</Link>
      </li>
      <li>
        <Link to={APP_ROUTES.LOGIN}>Login</Link>
      </li>
    </ul>
  );
};

export default LoginLinks;
