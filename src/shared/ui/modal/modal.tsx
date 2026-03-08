import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import s from './modal.module.scss';
import clsx from 'clsx';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const Modal: FC<Props> = ({ visible, setVisible, children, className }) => {
  if (!visible) return null;

  const modalContent = (
    <div className={s.mask}>
      <div className={clsx(s.window, className)} onClick={(e) => e.stopPropagation()}>
        <div className={s.panel}>
          <button onClick={() => setVisible(false)}>&#10006;</button>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
