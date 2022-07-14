import {
  ActionCreatorWithPayload,
  createAction,
  PrepareAction,
} from '@reduxjs/toolkit';
import {
  AddTodoParams,
  Todo,
  TodoActionType,
  TodoHistoryType,
  TodoStatus,
  UpdateTodoParams,
} from './types';
import { v4 as uuid } from 'uuid';

export const addTodo = createAction(
  TodoActionType.ADD_TODO,
  (params: AddTodoParams): ReturnType<PrepareAction<Todo>> => {
    return {
      payload: {
        ...params,
        created_at: new Date().toISOString(),
        id: uuid(),
        is_deleted: false,
        status: TodoStatus.NEW,
        status_histories: [
          {
            time: new Date().toISOString(),
            type: TodoHistoryType.CREATED,
          },
        ],
        updated_at: new Date().toISOString(),
      },
    };
  }
);

export const updateTodo = createAction(
  TodoActionType.UPDATE_TODO,
  (params: UpdateTodoParams): ReturnType<PrepareAction<UpdateTodoParams>> => {
    return {
      payload: {
        id: params.id,
        data: {
          ...params.data,
          updated_at: new Date().toISOString(),
        },
      },
    };
  }
);
