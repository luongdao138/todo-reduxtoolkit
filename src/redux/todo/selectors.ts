import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.todo;

export const getTodoSelector = createSelector(getRoot, (state) => state.todos?.data);

export const getTodoPagination = createSelector(getRoot, (state) => state.todos?.pagination);

export const getSelectedTodos = createSelector(getRoot, (state) => state.selectedTodos);
