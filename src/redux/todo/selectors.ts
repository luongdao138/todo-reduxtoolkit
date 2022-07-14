import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.todo;

export const getTodoSelector = createSelector(getRoot, (state) =>
  state.todos.filter((todo) => !todo.is_deleted)
);
export const getSelectedTodos = createSelector(
  getRoot,
  (state) => state.selectedTodos
);
