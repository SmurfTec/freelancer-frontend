import Loading from 'components/common/Loading';
import Login from 'components/Login';
import Logout from 'components/Logout';
import ModifyProfile from 'components/Profile';
import Register from 'components/Register';
import { Navigate } from 'react-router-dom';

export const protechtedRoutes = [
  {
    path: '/profile',
    element: <ModifyProfile />,
  },
  // {path  : '/gigs' , element : <Gigs />},
  { path: 'logout', element: <Logout /> },
  { path: '*', element: <Navigate to='/profile' /> },
];

export const publicRoutes = [
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: '*', element: <Navigate to='/login' /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
