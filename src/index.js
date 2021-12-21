import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'contexts/AuthContext';
import { DataProvider } from 'contexts/DataContext';
import { DevRequestsProvider } from 'contexts/DevRequestsContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <DevRequestsProvider>
            <App />
          </DevRequestsProvider>
        </DataProvider>
      </AuthProvider>
      <ToastContainer position='top-left' />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
