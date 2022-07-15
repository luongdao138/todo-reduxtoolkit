import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import ToastContextProvider from './context/ToastContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <ToastContextProvider>
                    <App />
                </ToastContextProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
);
