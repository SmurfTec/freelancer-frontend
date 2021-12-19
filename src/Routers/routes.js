import Loading from 'components/common/Loading';
import CreateGig from 'components/Gigs/CreateGig';
import LandingPage from 'components/LandingPage';
import Login from 'components/Login';
import Logout from 'components/Logout';
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
  { path: '/gigs/create', element: <CreateGig /> },
  { path: '/logout', element: <Logout /> },
  { path: '*', element: <Navigate to='/profile' /> },
];

export const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: '*', element: <Navigate to='/' /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
