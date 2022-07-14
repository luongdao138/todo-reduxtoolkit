import { Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BsCalendar2Week, BsTrash } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Todo, TodoStatus } from '../../redux/todo/actions/types';
import { getSelectedTodos } from '../../redux/todo/selectors';
import { selectTodos } from '../../redux/todo/todo.slice';
import {
  compareDate,
  formatDate,
  priorityOptions,
  statusOptions,
} from '../../utils/todo';

interface Props {
  todo: Todo;
  changeSelectedItem: (todo: Todo) => void;
  handleOpenEditForm: () => void;
  handleOpenTodoDetail: () => void;
  handleOpenDelete: () => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  changeSelectedItem,
  handleOpenEditForm,
  handleOpenDelete,
  handleOpenTodoDetail,
}) => {
  const dispatch = useAppDispatch();
  const selectedTodos = useAppSelector(getSelectedTodos);
  const [isPastDue, setIsPastDue] = useState<boolean>(
    compareDate(todo.due_date, new Date()) &&
      todo.status !== TodoStatus.COMPLETE
  );
  const [isCompleteLate, setIsCompleteLate] = useState<boolean>(
    compareDate(todo.due_date, new Date()) &&
      todo.status === TodoStatus.COMPLETE
  );

  const handleSelectTodo = () => {
    dispatch(selectTodos(todo.id));
  };

  useEffect(() => {
    const handleCheckTime = () => {
      setIsPastDue(
        compareDate(todo.due_date, new Date()) &&
          todo.status !== TodoStatus.COMPLETE
      );
      setIsCompleteLate(
        compareDate(todo.due_date, new Date()) &&
          todo.status === TodoStatus.COMPLETE
      );
    };

    const interval = setInterval(handleCheckTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [todo]);

  const todoPriority = priorityOptions.find((x) => x.value === todo.priority);
  const todoStatus = statusOptions.find((x) => x.value === todo.status);
  const isSelected = selectedTodos.includes(todo.id);

  const handleEditTodo = () => {
    changeSelectedItem(todo);
    handleOpenEditForm();
  };

  const handleViewTodoDetail = () => {
    changeSelectedItem(todo);
    handleOpenTodoDetail();
  };

  const handleDeleteTodo = () => {
    changeSelectedItem(todo);
    handleOpenDelete();
  };

  return (
    <div className='flex items-center gap-3 border-b'>
      <div>
        <Checkbox
          checked={isSelected}
          onChange={(e) => {
            handleSelectTodo();
          }}
        />
      </div>
      <div
        className={`relative transition-colors flex-1 p-4 rounded-md shadow-sm ${
          isSelected ? 'bg-slate-700' : 'bg-white'
        } border-b-slate-300`}
      >
        <button
          className={`absolute top-4 right-4 px-4 py-1 text-xs font-semibold ${todoPriority?.bg_color} rounded-md text-white`}
        >
          {todoPriority?.text}
        </button>
        <h3
          className={`font-semibold transition-colors text-lg ${
            isSelected ? 'text-white' : ''
          }`}
        >
          {todo.title}
        </h3>
        <p className='line-clamp-1 text-slate-500 text-sm'>
          {todo.description}
        </p>
        <div className='mt-2 flex items-center justify-between'>
          <div className='flex items-center'>
            <BsCalendar2Week
              className={`${
                isPastDue ? 'text-red-500' : 'text-slate-500'
              } text-sm mr-2`}
            />
            <span
              className={`${
                isPastDue ? 'text-red-500' : 'text-slate-500'
              }  text-xs font-medium`}
            >
              {formatDate(todo.due_date, { withDateTime: true })}
            </span>
          </div>

          {isPastDue && (
            <p className='text-sm font-medium text-red-500'>Past due</p>
          )}
          {isCompleteLate && (
            <p className='text-sm font-medium text-red-500'>Complete late</p>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 mt-3'>
            <button
              className={`border ${todoStatus?.text_color} shrink-0 ${todoStatus?.border} rounded-md px-3 font-medium text-xs`}
            >
              {todoStatus?.text}
            </button>
            <button
              className='w-6 h-6 rounded-md border border-gray-500  grid place-items-center'
              onClick={handleViewTodoDetail}
            >
              <IoMdEye className='text-gray-500  text-sm' />
            </button>
            <button
              className='w-6 h-6 rounded-md border border-purple-600 grid place-items-center'
              onClick={handleEditTodo}
            >
              <MdOutlineEdit className='text-purple-600 text-sm' />
            </button>
            <button
              className='w-6 h-6 rounded-md border border-red-500 grid place-items-center'
              onClick={handleDeleteTodo}
            >
              <BsTrash className='text-red-500 text-sm' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
