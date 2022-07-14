import { createContext, useId, useContext, useReducer } from 'react';
import { FiCheck } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { BsExclamationLg } from 'react-icons/bs';

export enum NotificationType {
  SUCCESS = 'success',
  INFOR = 'infor',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum NotificationPosition {
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right',
}

export const NotificationMap = new Map([
  [
    NotificationType.SUCCESS,
    {
      bg_color: 'bg-green-500',
      icon: <FiCheck />,
      icon_color: 'text-green-500',
    },
  ],
  [
    NotificationType.ERROR,
    {
      bg_color: 'bg-red-500',
      icon: <FaTimes />,
      icon_color: 'text-red-500',
    },
  ],
  [
    NotificationType.WARNING,
    {
      bg_color: 'bg-yellow-500',
      icon: <BsExclamationLg />,
      icon_color: 'text-yellow-500',
    },
  ],
  [
    NotificationType.INFOR,
    {
      bg_color: 'bg-blue-500',
      icon: <BsExclamationLg />,
      icon_color: 'text-blue-500',
    },
  ],
]);

// use useId to generate unique id for each notification
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  desc?: string;
  position?: NotificationPosition;
  autoClose?: boolean;
  autoCloseTime?: number; // miliseconds
}

const mockNofs: Notification[] = [
  {
    id: '0495ccaf-211b-4d6e-9725-f90486be2133',
    title: 'lacinia aenean ',
    desc: 'odio consequat varius integer ac leo pellentesque ultrices mattis odio',
    type: 'success',
  },
  {
    id: '6de9b193-aa6e-48f0-b7b0-12b3df57b480',
    title: 'quis libero nullam ',
    desc: 'ultrices phasellus id sapien in',
    type: 'infor',
  },
  {
    id: '156083b0-96f3-45ae-83f0-6d11685681b4',
    title: 'montes nascetur ridiculus m',
    desc: 'mauris viverra diam vitae quam suspendisse potenti nullam porttitor us',
    type: 'warning',
  },
  {
    id: '193beb01-c193-4880-8826-94ed4f8a2d95',
    title: 'ac est lacinia nisi venen',
    desc: 'nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
    type: 'error',
  },
] as Notification[];

interface ContextState {
  state: ReducerState;
  handleAddToast: (params: Notification) => void;
  handleRemoveToast: (id: string) => void;
}

interface ReducerState {
  notifications: Notification[];
}

const ToastContext = createContext<ContextState>({} as ContextState);

interface Props {
  children: React.ReactNode;
}

export enum ACTION_TYPE {
  ADD_TOAST = 'toast/add-toast',
  REMOVE_TOAST = 'toast/remove-toast',
}

type ACTION =
  | {
      type: ACTION_TYPE.ADD_TOAST;
      payload: Notification;
    }
  | {
      type: ACTION_TYPE.REMOVE_TOAST;
      payload: string;
    };

const reducer = (state: ReducerState, action: ACTION): ReducerState => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TOAST:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case ACTION_TYPE.REMOVE_TOAST:
      return {
        ...state,
        notifications: state.notifications.filter(
          (nof) => nof.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

const initialValues: ReducerState = {
  notifications: [],
};

const ToastContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const handleAddToast = (params: Notification) => {
    dispatch({
      type: ACTION_TYPE.ADD_TOAST,
      payload: params,
    });
  };

  const handleRemoveToast = (id: string) => {
    dispatch({
      type: ACTION_TYPE.REMOVE_TOAST,
      payload: id,
    });
  };

  return (
    <ToastContext.Provider value={{ state, handleAddToast, handleRemoveToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;

export const useToastContext = () => useContext(ToastContext);
