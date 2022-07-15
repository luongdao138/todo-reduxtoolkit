import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoPriority, TodoStatus } from "../todo/actions/types";

export interface SortParams {
    field: string;
    order: 'asc' | 'desc'
}

export interface FilterParams {
        status?: TodoStatus[],
        priority?: TodoPriority[],
        is_due?: boolean,
        title?: string
}

export interface SliceState {
   filter?: FilterParams,
   sort?: SortParams
}

const initialState: SliceState = {} 

const todoActionSlide = createSlice({
      name: 'todoAction',
      initialState,
      reducers: {
         updateSort(state, action: PayloadAction<SortParams>) {
             state.sort = action.payload
         },
         updateFilter(state, action: PayloadAction<FilterParams>) {
            state.filter = action.payload
         },
      },
});

export const { updateFilter,updateSort } = todoActionSlide.actions
export default todoActionSlide.reducer;