import type { FC, ReactNode } from 'react';

import { IoMdClose } from 'react-icons/io';

import './Modal.css';

type ModalProps = {
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  isOpen: boolean;
};

const Modal: FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
  return (
    <>
      {isOpen ? (
        <div className="modal-overlay">
          <div className="modal-background-blur"></div>
          <div className="modal-container">
            {title && (
              <div className="modal-header">
                <div className="dummy-element"></div>
                <div className="modal-title">{title}</div>
                <div className="modal-button-close" onClick={onClose}>
                  <IoMdClose size="1.5rem" />
                </div>
              </div>
            )}
            <div className="modal-content">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
