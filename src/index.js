import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from 'contexts/AuthContext';
import { DataProvider } from 'contexts/DataContext';
import { DevRequestsProvider } from 'contexts/DevRequestsContext';
import { OffersProvider } from 'contexts/OffersContext';
import { SocketProvider } from 'contexts/SocketContext';

// * Style Sheets for different Packages
import 'react-toastify/dist/ReactToastify.css';
// *
import { OrdersProvider } from 'contexts/OrdersContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <DevRequestsProvider>
            <OffersProvider>
              <OrdersProvider>
                <SocketProvider>
                  <App />
                </SocketProvider>
              </OrdersProvider>
            </OffersProvider>
          </DevRequestsProvider>
        </DataProvider>
      </AuthProvider>
      <ToastContainer position='top-left' />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
