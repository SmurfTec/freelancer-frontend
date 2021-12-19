import Loading from 'components/common/Loading';
import GigTable from 'components/Gigs/GigTable';
import Login from 'components/Login';
import Logout from 'components/Logout';
import ViewProfile from 'components/Profile/ViewProfile';
import Register from 'components/Register';
import { Navigate } from 'react-router-dom';

export const protechtedRoutes = [
  {
    path: '/profile',
    element: <ViewProfile />,
  },
  // {path  : '/gigs' , element : <Gigs />},
  { path: 'logout', element: <Logout /> },
  { path: '*', element: <Navigate to='/profile' /> },
];

export const publicRoutes = [
  { path: '/gigs/manage', element: <GigTable /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: '*', element: <Navigate to='/login' /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
