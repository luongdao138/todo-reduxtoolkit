import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.todoAction;

export const getTodoFilter = createSelector(getRoot, state => state.filter)
export const getTodoSort = createSelector(getRoot, state => state.sort)
