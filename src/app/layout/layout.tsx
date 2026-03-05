import React, { FC } from 'react';
import Header from 'src/widgets/header/header';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
