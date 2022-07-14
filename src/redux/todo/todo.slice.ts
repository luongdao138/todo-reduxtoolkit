import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeleteTodoParams, Todo, TodoHistoryType } from './actions/types';
import mockTodos from '../../data/todo.json';
import * as actions from './actions';
import _ from 'lodash';

interface SliceState {
  todos: Todo[];
  selectedTodos: string[];
}

const initialState: SliceState = {
  // todos: mockTodos as Todo[],
  todos: [],
  selectedTodos: [],
};

const todoSlice = createSlice({
  initialState,
  name: 'todo',
  reducers: {
    selectTodos(state, action: PayloadAction<string | string[]>) {
      if (Array.isArray(action.payload)) {
        state.selectedTodos = _.concat(state.selectedTodos, action.payload);
      } else {
        const index = state.selectedTodos.findIndex(
          (id) => id === action.payload
        );
        if (index !== -1) {
          state.selectedTodos.splice(index, 1);
        } else {
          state.selectedTodos.push(action.payload);
        }
      }
    },
    clearSelectedTodos(state) {
      state.selectedTodos = [];
    },
    selectAllTodos(state) {
      state.selectedTodos = state.todos
        .filter((todo) => !todo.is_deleted)
        .map((todo) => todo.id);
    },
    updateTodo(
      state,
      action: PayloadAction<{ id: string; data: Partial<Todo> }>
    ) {
      let todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo = { ...todo, ...action.payload.data };
      }
    },
    deleteTodo(state, action: PayloadAction<DeleteTodoParams>) {
      if (action.payload.type === 'temp') {
        state.todos = state.todos.map((t) =>
          t.id === action.payload.id
            ? {
                ...t,
                is_deleted: true,
                status_histories: [
                  ...t.status_histories,
                  {
                    time: new Date().toISOString(),
                    type: TodoHistoryType.DELETED,
                  },
                ],
              }
            : t
        );
      } else {
        state.todos = state.todos.filter((t) => t.id !== action.payload.id);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(actions.addTodo, (state, action) => {
      state.todos.push(action.payload);
    });

    builder.addCase(actions.updateTodo, (state, action) => {
      state.todos = state.todos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            ...action.payload.data,
            status_histories: [
              ...t.status_histories,
              {
                time: new Date().toISOString(),
                type: TodoHistoryType.UPDATED,
              },
            ],
          };
        } else {
          return t;
        }
      });
    });
  },
});

export const {
  selectTodos,
  clearSelectedTodos,
  selectAllTodos,
  updateTodo,
  deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
