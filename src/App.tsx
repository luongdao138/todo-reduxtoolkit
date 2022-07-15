import ToastContainer from '~/components/Toast';
import { NotificationPosition } from '~/context/ToastContext';
import DateTime from '~/components/Datetime';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const TodoList = lazy(() => import('~/pages/TodoList'));
const TodoTrash = lazy(() => import('~/pages/TodoTrash'));

const App = () => {
    return (
        <div className="bg-slate-200 min-h-screen py-4">
            <DateTime />
            <ToastContainer position={NotificationPosition.TOP_RIGHT} />

            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/trash" element={<TodoTrash />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
