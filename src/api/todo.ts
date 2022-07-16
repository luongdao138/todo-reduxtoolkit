import { readClient, writeClient } from '~/api/client';
import { Todo, TodoHistoryType, TodoPriority, TodoStatus } from '~/redux/todo/actions/types';
import { v4 as uuid } from 'uuid';
import { write } from 'fs';

export interface Pagination {
    from: number;
    to: number;
    total: number;
}

export interface GetTodoParams {
    from: number;
    to: number;
}

export interface GetTodoResponse {
    data: Todo[];
    pagination: Pagination;
}

export interface AddTodoParams {
    title: string;
    due_date: any;
    description: string;
    priority: TodoPriority;
}

export interface AddTodoResponse {}

// get todos with parameters
const getTodosQuery = `{
  "data": *[_type == 'todo']{
     "id": _id,
     title, description, due_date, status, priority, is_deleted 
    }[$from...$to],
  "pagination": {
     "total_results": count(*[_type == 'todo']),
     "from": $from,
     "to": $to
  }
}`;

export const getTodos = async (params: GetTodoParams): Promise<GetTodoResponse> => {
    const res = await readClient.fetch<GetTodoResponse>(getTodosQuery, params);
    return res;
};

// add new todo
export const createTodo = async (params: AddTodoParams): Promise<void> => {
    const newTodo = {
        ...params,
        created_at: new Date().toISOString(),
        is_deleted: false,
        status: TodoStatus.NEW,
        updated_at: new Date().toISOString(),
    };
    const todoRes = await writeClient.create({
        _type: 'todo',
        ...newTodo,
    });

    await writeClient.create({
        _type: 'todoHistory',
        time: new Date().toISOString(),
        type: TodoHistoryType.CREATED,
        todo_id: {
            _ref: todoRes._id,
        },
    });
};
