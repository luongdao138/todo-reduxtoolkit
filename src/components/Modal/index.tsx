import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import useLockScreen from '../../hooks/useLockScreen';

interface Props {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  closeOnClickBackdrop?: boolean;
}

const Modal: React.FC<Props> = ({
  children,
  open,
  onClose,
  closeOnClickBackdrop,
}) => {
  const handleClickBackdrop = () => {
    if (closeOnClickBackdrop) {
      onClose();
    }
  };

  useLockScreen(open);

  if (!open) {
    return null;
  }

  return createPortal(
    <div>
      <div
        className='inset-0 fixed z-10'
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
        onClick={handleClickBackdrop}
      ></div>

      <div
        className='fixed top-1/2  -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 max-w-2xl w-full'
        style={{ maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-3 w-8 h-8 rounded-full bg-white grid place-items-center'
        >
          <MdClose className='text-xl' />
        </button>
        <div className='bg-white p-4 rounded-md'>{children}</div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
