import React, { FC } from 'react';
import Header from 'src/widgets/header/header';

import s from './layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={s.wrapper}>
      <Header />
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default Layout;
