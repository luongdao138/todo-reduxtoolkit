import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store, persitor } from './redux/store';
import ToastContextProvider from './context/ToastContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persitor}>
                    <ToastContextProvider>
                        <App />
                    </ToastContextProvider>
                </PersistGate>
            </Provider>
        </Router>
    </React.StrictMode>,
);
