import todoReducer from './todo/todo.slice';
import todoActionReducer from './todoAction/todoAction.slice';

const rootReducer = {
  todo: todoReducer,
  todoAction: todoActionReducer
};

export default rootReducer;
