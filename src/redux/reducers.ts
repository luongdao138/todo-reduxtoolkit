import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todo.slice';
import todoActionReducer from './todoAction/todoAction.slice';

const rootReducer = combineReducers({
    todo: todoReducer,
    todoAction: todoActionReducer,
});

export default rootReducer;
