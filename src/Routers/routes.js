import Loading from 'components/common/Loading';
import ManageGig from 'components/Gigs/ManageGig';
import LandingPageNew from 'components/NewLandingPage';
import GigTable from 'components/Gigs/MyGigs';
import DevRequest from 'components/DevRequest/CreateRequest';
import Login from 'components/Login';
import Logout from 'components/Logout';
import OrdersTable from 'components/Orders/OrdersTable';
import ViewProfile from 'components/Profile';
import CreateProfile from 'components/Profile/CreateProfile';
import Register from 'components/Register';
import { Navigate } from 'react-router-dom';
import DevRequestsTable from 'components/DevRequest/MyDevRequests';
import Dashboard from 'components/dashboard';
import BuyerHome from 'components/BuyerHome';
import Navbar from 'components/common/Navbar';
import LandingPageLayout from 'layouts/LandingPageLayout';
import NavbarLayout from 'layouts/NavbarLayout';
import SingleRequest from 'components/DevRequest/SingleRequest';

const NotFound = () => <h1>Not Found</h1>;

export const protechtedRoutes = [
  {
    path: '/',
    element: <NavbarLayout />,
    children: [
      {
        path: '/',
        element: <LandingPageNew />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/home',
        element: <BuyerHome />,
      },
      {
        path: '/profile',
        element: <ViewProfile />,
      },
      {
        path: '/profile/create',
        element: <CreateProfile />,
      },
      // * GIGS
      { path: '/mygigs', element: <GigTable /> },
      { path: '/mygigs/create', element: <ManageGig /> },
      { path: '/mygigs/:id', element: <ManageGig isUpdate /> },

      // * DevRequests
      { path: '/jobs/create', element: <DevRequest /> },
      { path: '/jobs/:id', element: <SingleRequest /> },

      { path: '/requests', element: <DevRequestsTable /> },
      // { path: '/requests/mygigs', element: <MyGigs /> },
      // { path: '/mygigs', element: <GigTable /> },
      // { path: '/requests/mygigs/:id', element: <ManageGig isUpdate /> },

      // {path  : '/gigs' , element : <Gigs />},
      { path: '/gigs/manage', element: <GigTable /> },
      { path: '/manageOrders', element: <OrdersTable /> },
      { path: '/logout', element: <Logout /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <Navigate to='/profile' /> },
];

export const commonRotues = [{ path: 'login', element: <Login /> }];

export const publicRoutes = [
  // { path: '/', element: <LandingPage /> },
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      {
        path: '/',
        element: <LandingPageNew />,
      },
      { path: '/jobs/:id', element: <SingleRequest /> },
    ],
  },
  { path: 'register', element: <Register /> },
  { path: '*', element: <Navigate to='/' /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
