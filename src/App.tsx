import ToastContainer from '~/components/Toast';
import { NotificationPosition } from '~/context/ToastContext';
import DateTime from '~/components/Datetime';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadinSpinner';

const TodoList = lazy(() => import('~/pages/TodoList'));
const TodoTrash = lazy(() => import('~/pages/TodoTrash'));

const LoadingFallBack = () => {
    return (
        <div className="h-screen w-screen grid place-items-center">
            <LoadingSpinner width={100} />
        </div>
    );
};

const App = () => {
    return (
        <div className="bg-slate-200 min-h-screen">
            <Suspense fallback={<LoadingFallBack />}>
                <DateTime />
                <ToastContainer position={NotificationPosition.TOP_RIGHT} />
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/trash" element={<TodoTrash />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
