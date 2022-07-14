import React from 'react';
import {
  NotificationPosition,
  useToastContext,
} from '../../context/ToastContext';
import ToastItem from './ToastItem';
import classes from './Toast.module.css';

interface Props {
  position?: NotificationPosition;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const positionMap = {
  [NotificationPosition.BOTTOM_LEFT]: 'container_bottom_left',
  [NotificationPosition.BOTTOM_RIGHT]: 'container_bottom_right',
  [NotificationPosition.TOP_LEFT]: 'container_top_left',
  [NotificationPosition.TOP_RIGHT]: 'container_top_right',
};

const ToastContainer: React.FC<Props> = ({
  position = NotificationPosition.TOP_RIGHT,
  autoClose = true,
  autoCloseTime = 3000,
}) => {
  const {
    state: { notifications },
  } = useToastContext();

  const animationClass = classes[positionMap[position]];

  return (
    <div className={`fixed overflow-hidden z-40 grid gap-2 ${animationClass}`}>
      {notifications.map((toast) => (
        <ToastItem
          key={toast.id}
          autoClose={autoClose}
          toast={toast}
          parent_position={position}
          autoCloseTime={autoCloseTime}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
