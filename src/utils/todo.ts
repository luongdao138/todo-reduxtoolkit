import moment from 'moment';
import { TodoPriority, TodoStatus } from '../redux/todo/actions/types';

type Option = {
  withDateTime: boolean;
};

type CustomDate = string | number | Date;

export const formatDate = (date: CustomDate, option?: Option) => {
  if (option?.withDateTime) {
    return moment(date).format('HH:mm - DD MMM YYYY');
  } else {
    return moment(date).format('DD MMM YYYY');
  }
};

export const compareDate = (date1: CustomDate, date2: CustomDate) => {
  date1 = new Date(date1);
  date2 = new Date(date2);

  return date1 < date2;
};

export function isValidDate(d: any) {
  return moment(d).isValid();
}

export const priorityOptions = [
  {
    text_color: 'text-red-500',
    bg_color: 'bg-red-500',
    border: 'border-red-500',
    text: 'High',
    value: TodoPriority.HIGH,
  },
  {
    border: 'border-amber-500',
    bg_color: 'bg-amber-500',
    text_color: 'text-amber-500',
    text: 'Medium',
    value: TodoPriority.MEDIUM,
  },
  {
    bg_color: 'bg-emerald-500',
    border: 'border-emerald-500',
    text_color: 'text-emerald-500',
    text: 'Low',
    value: TodoPriority.LOW,
  },
];

export const statusOptions = [
  {
    text_color: 'text-red-500',
    bg_color: 'bg-red-500',
    border: 'border-red-500',
    text: 'Complete',
    value: TodoStatus.COMPLETE,
  },
  {
    border: 'border-purple-500',
    bg_color: 'bg-purple-500',
    text_color: 'text-purple-500',
    text: 'In Progress',
    value: TodoStatus.DOING,
  },
  {
    bg_color: 'bg-green-500',
    border: 'border-green-500',
    text_color: 'text-green-500',
    text: 'New',
    value: TodoStatus.NEW,
  },
];
