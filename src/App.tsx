import { useState } from 'react';
import AddTodoForm from '~/components/AddTodoForm';
import ConfirmAction from '~/components/ConfirmAction';
import Modal from '~/components/Modal';
import ToastContainer from '~/components/Toast';
import TodoDetail from '~/components/TodoDetail';
import TodoItem from '~/components/TodoItem';
import { NotificationPosition, NotificationType, useToastContext } from '~/context/ToastContext';
import useBoolean from '~/hooks/useBoolean';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { Todo } from '~/redux/todo/actions/types';
import { getSelectedTodos, getTodoSelector } from '~/redux/todo/selectors';
import { clearSelectedTodos, deleteTodo, selectAllTodos } from '~/redux/todo/todo.slice';
import { v4 as uuid } from 'uuid';
import DateTime from '~/components/Datetime';
import SearchTodo from '~/components/SearchTodo';

const App = () => {
    const { handleAddToast } = useToastContext();
    const dispatch = useAppDispatch();
    const todos = useAppSelector(getTodoSelector);
    const selectedTodos = useAppSelector(getSelectedTodos);
    const [selectedItem, setSelectedItem] = useState<Todo | undefined>();
    const { value: showAddForm, setTrue: handleOpenAddForm, setFalse: handleCloseAddForm } = useBoolean(false);
    const { value: showEditForm, setTrue: handleOpenEditForm, setFalse: handleCloseEditForm } = useBoolean(false);
    const { value: showTodoDetail, setTrue: handleOpenTodoDetail, setFalse: handleCloseTodoDetail } = useBoolean(false);
    const { value: openDelete, setFalse: handleCloseDelete, setTrue: handleOpenDelete } = useBoolean(false);

    const handleUnCheckedAllTodos = () => {
        dispatch(clearSelectedTodos());
    };

    const handleSelectAllTodos = () => {
        dispatch(selectAllTodos());
    };

    const changeSelectedItem = (item: Todo) => {
        setSelectedItem(item);
    };

    const handleDeleteTodo = () => {
        dispatch(
            deleteTodo({
                type: 'temp',
                id: selectedItem?.id || '',
            }),
        );

        handleCloseDelete();
        handleAddToast({
            type: NotificationType.SUCCESS,
            title: 'Success',
            id: uuid(),
            desc: 'Delete todo successfully!',
        });
    };

    return (
        <div className="bg-slate-200 min-h-screen py-4">
            <DateTime />
            <ToastContainer position={NotificationPosition.TOP_RIGHT} />
            <Modal open={showAddForm} closeOnClickBackdrop onClose={handleCloseAddForm}>
                <AddTodoForm onCloseModal={handleCloseAddForm} />
            </Modal>
            <Modal open={showEditForm} closeOnClickBackdrop onClose={handleCloseEditForm}>
                <AddTodoForm isEdit selectedItem={selectedItem} onCloseModal={handleCloseEditForm} />
            </Modal>
            <Modal onClose={handleCloseDelete} open={openDelete} closeOnClickBackdrop>
                <ConfirmAction
                    cancelAction={handleCloseDelete}
                    okAction={handleDeleteTodo}
                    title="Are you sure to delete this todo?"
                />
            </Modal>
            <Modal open={showTodoDetail} closeOnClickBackdrop onClose={handleCloseTodoDetail}>
                <TodoDetail selectedItem={selectedItem} onCloseModal={handleCloseTodoDetail} />
            </Modal>
            <div style={{ width: '550px' }} className="m-auto">
                <h1 className="text-3xl font-semibold text-center mb-8">Todo App</h1>
                {!selectedTodos.length ? (
                    <div className="flex items-center justify-between">
                        <button className="px-4 py-2 rounded-md bg-green-500 text-white" onClick={handleOpenAddForm}>
                            Add todo
                        </button>
                        <div>
                            {todos.length ? (
                                <button className="mr-2 px-4 py-2 rounded-md bg-purple-600 text-white">
                                    Filter todo
                                </button>
                            ) : null}
                            <button className="px-4 py-2 mr-2 rounded-md bg-gray-500 text-white">To do trash</button>
                            {Boolean(todos.length) ? (
                                <button
                                    onClick={handleSelectAllTodos}
                                    className="px-4 py-2 rounded-md bg-orange-500 text-white"
                                >
                                    Check All
                                </button>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <button className="px-4 mr-2 py-2 rounded-md bg-red-500 text-white">Delete</button>
                            <button className="px-4 py-2 rounded-md bg-amber-600 text-white">Permanent Delete</button>
                        </div>
                        <button
                            className="px-4 py-2 rounded-md bg-green-500 text-white"
                            onClick={handleUnCheckedAllTodos}
                        >
                            Unchecked All
                        </button>
                    </div>
                )}

                <SearchTodo />

                <div className="mt-4 grid gap-4">
                    {todos.map((todo) => (
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            changeSelectedItem={changeSelectedItem}
                            handleOpenEditForm={handleOpenEditForm}
                            handleOpenTodoDetail={handleOpenTodoDetail}
                            handleOpenDelete={handleOpenDelete}
                        />
                    ))}
                </div>

                {!todos.length ? (
                    <p className="text-center text-3xl font-medium mt-8">There are no todos in the list</p>
                ) : null}
            </div>
        </div>
    );
};

export default App;
