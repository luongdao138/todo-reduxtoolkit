export enum TodoActionType {
  ADD_TODO = 'todo/add-new',
  UPDATE_TODO = 'todo/update-todo',
}

export enum TodoStatus {
  NEW = 'new',
  DOING = 'doing',
  COMPLETE = 'complete',
}
export enum TodoPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}
export enum TodoHistoryType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  RESTORE = 'restored',
}

export interface TodoHistory {
  type: TodoHistoryType;
  time: CustomDate;
  content?: {
    field: keyof Todo;
    old_value: any;
    new_value: any;
    note: string;
  }[];
  note?: string;
}

type CustomDate = Date | string | number;

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  due_date: CustomDate;
  status: TodoStatus;
  priority: TodoPriority;
  created_at: CustomDate;
  updated_at: CustomDate;
  is_deleted: boolean;
  status_histories: TodoHistory[];
}

export interface AddTodoParams {
  title: string;
  due_date: any;
  description: string;
  priority: TodoPriority;
}

export interface UpdateTodoParams {
  id: string;
  data: Partial<Todo>;
}

export interface DeleteTodoParams {
  type: 'temp' | 'permanent';
  id: string;
}
