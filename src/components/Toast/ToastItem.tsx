import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import {
  Notification,
  NotificationMap,
  NotificationPosition,
  useToastContext,
} from '../../context/ToastContext';
import classes from './Toast.module.css';

interface Props {
  parent_position: NotificationPosition;
  toast: Notification;
  autoCloseTime: number;
  autoClose: boolean;
}

const animationMap = {
  [NotificationPosition.BOTTOM_LEFT]: 'slide_bottom_left',
  [NotificationPosition.BOTTOM_RIGHT]: 'slide_bottom_right',
  [NotificationPosition.TOP_LEFT]: 'slide_top_left',
  [NotificationPosition.TOP_RIGHT]: 'slide_top_right',
};

const ToastItem: React.FC<Props> = ({
  toast,
  parent_position,
  autoClose,
  autoCloseTime,
}) => {
  const toastType = NotificationMap.get(toast.type);
  const toastPosition = _.isNil(toast.position)
    ? parent_position
    : toast.position;
  const toastAutoClose = _.isNil(toast.autoClose) ? autoClose : toast.autoClose;
  const toastAutoCloseTime = _.isNil(toast.autoCloseTime)
    ? autoCloseTime
    : toast.autoCloseTime;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeLeftRef = useRef<number>(toastAutoCloseTime);
  const currentTimeRef = useRef<number>(new Date().getTime());

  const { handleRemoveToast } = useToastContext();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (toastAutoClose) {
        handleRemoveToast(toast.id);
      }
    }, toastAutoCloseTime);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOnMouseEnter = () => {
    if (timeoutRef.current && toastAutoClose) {
      clearTimeout(timeoutRef.current);
      timeLeftRef.current =
        timeLeftRef.current - (new Date().getTime() - currentTimeRef.current);
    }
  };

  const handleOnMouseLeave = () => {
    if (timeLeftRef.current > 0 && toastAutoClose) {
      currentTimeRef.current = new Date().getTime();
      timeoutRef.current = setTimeout(() => {
        if (toastAutoClose) {
          handleRemoveToast(toast.id);
        }
      }, timeLeftRef.current);
    }
  };

  const handleDelete = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    handleRemoveToast(toast.id);
  };

  const animationClass = classes[animationMap[toastPosition]];
  console.log(animationMap[toastPosition]);
  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className={`rounded-md transition-transform duration-200 hover:scale-105 shadow-md relative px-4 py-2 flex gap-2 items-center ${toastType?.bg_color} w-96 ${animationClass}`}
    >
      <MdClose
        onClick={handleDelete}
        className='text-white absolute top-2 right-2 cursor-pointer'
      />
      <div className='w-8 bg-white h-8 rounded-full shrink-0 grid place-items-center'>
        <span className={`${toastType?.icon_color}`}>{toastType?.icon}</span>
      </div>
      <div>
        <h3 className='text-white font-semibold text-lg'>{toast.title}</h3>
        <p className='text-slate-200 text-sm'>{toast.desc}</p>
      </div>
    </div>
  );
};

export default ToastItem;
