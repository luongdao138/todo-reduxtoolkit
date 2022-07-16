import { createAction, createAsyncThunk, PrepareAction } from '@reduxjs/toolkit';
import { Todo, TodoActionType, TodoHistoryType, TodoStatus, UpdateTodoParams } from './types';
import { v4 as uuid } from 'uuid';
import * as services from '~/api/todo';

export const getTodos = createAsyncThunk<services.GetTodoResponse, services.GetTodoParams>(
    TodoActionType.GET_TODOS,
    async (params, { rejectWithValue }) => {
        try {
            const res = await services.getTodos(params);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const addTodo = createAction(
    TodoActionType.ADD_TODO,
    (params: services.AddTodoParams): ReturnType<PrepareAction<Todo>> => {
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
    },
);

export const addTodoAsync = createAsyncThunk<any, services.AddTodoParams>(
    TodoActionType.ADD_TODO,
    async (params, { rejectWithValue }) => {
        try {
            await services.createTodo(params);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
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
    },
);
