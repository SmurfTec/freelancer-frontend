import Loading from 'components/common/Loading';
import DevRequest from 'components/DevRequest';
import GigTable from 'components/Gigs/GigTable';
import Login from 'components/Login';
import Logout from 'components/Logout';
import OrdersTable from 'components/Orders/OrdersTable';
import ViewProfile from 'components/Profile';
import CreateProfile from 'components/Profile/CreateProfile';
import Register from 'components/Register';
import { Navigate } from 'react-router-dom';

export const protechtedRoutes = [
  {
    path: '/profile',
    element: <ViewProfile />,
  },
  {
    path: '/profile/create',
    element: <CreateProfile />,
  },
  // {path  : '/gigs' , element : <Gigs />},
  { path: '/gigs/manage', element: <GigTable /> },
  { path: '/manageOrders', element: <OrdersTable /> },
  { path: '/postRequest', element: <DevRequest /> },
  { path: '/logout', element: <Logout /> },
  { path: '*', element: <Navigate to='/profile' /> },
];

export const publicRoutes = [
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: '*', element: <Navigate to='/login' /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
