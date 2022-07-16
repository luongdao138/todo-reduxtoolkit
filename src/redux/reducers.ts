import { combineReducers } from '@reduxjs/toolkit';
import metaReducer from '~/redux/meta/meta.slice';
import todoReducer from '~/redux/todo/todo.slice';
import todoActionReducer from '~/redux/todoAction/todoAction.slice';

const rootReducer = combineReducers({
    todo: todoReducer,
    todoAction: todoActionReducer,
    metadata: metaReducer,
});

export default rootReducer;
