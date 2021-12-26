import Loading from 'components/common/Loading';
import ManageGig from 'components/Gigs/ManageGig';
import JobsPage from 'components/JobsPage';
import GigTable from 'components/Gigs/MyGigs';
import DevRequest from 'components/DevRequest/CreateRequest';
import Login from 'components/Login';
import Logout from 'components/Logout';
import OrdersTable from 'components/Orders/MyOrders';
import ViewProfile from 'components/Profile';
import CreateProfile from 'components/Profile/CreateProfile';
import Register from 'components/Register';
import { Navigate } from 'react-router-dom';
import DevRequestsTable from 'components/DevRequest/MyDevRequests';
import Dashboard from 'components/dashboard';
import LandingPageLayout from 'layouts/LandingPageLayout';
import NavbarLayout from 'layouts/NavbarLayout';
import SingleRequest from 'components/DevRequest/SingleRequest';
import UserHome from 'components/UserHome';
import Services from 'components/ServicesPage';
import MyOffers from 'components/Offers/MyOffers';
import Chat from 'components/Chat';
import ViewUser from 'components/Profile/ViewUser';

const NotFound = () => <h1>Not Found</h1>;

export const protechtedRoutes = [
  {
    path: '/',
    element: <NavbarLayout />,
    children: [
      {
        path: '/',
        element: <UserHome />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/offers',
        element: <MyOffers />,
      },
      {
        path: '/messages',
        element: <Chat />,
      },
      // { path: '/services/:id', element: <ManageGig  /> },

      {
        path: '/dashboard',
        element: <Dashboard />,
      },

      {
        path: '/profile',
        element: <ViewProfile />,
      },
      {
        path: '/profile/create',
        element: <CreateProfile />,
      },
      // * Users
      {
        path: '/users/:id',
        element: <ViewUser />,
      },

      // * GIGS
      { path: '/mygigs', element: <GigTable /> },
      { path: '/mygigs/create', element: <ManageGig /> },
      { path: '/mygigs/:id', element: <ManageGig isUpdate /> },
      { path: '/gigs/manage', element: <GigTable /> },

      // * DevRequests
      { path: '/jobs', element: <JobsPage /> },
      { path: '/jobs/create', element: <DevRequest /> },
      { path: '/jobs/:id', element: <SingleRequest /> },
      { path: '/requests', element: <DevRequestsTable /> },
      // { path: '/requests/mygigs', element: <MyGigs /> },
      // { path: '/mygigs', element: <GigTable /> },
      // { path: '/requests/mygigs/:id', element: <ManageGig isUpdate /> },

      // * Orders
      { path: '/orders', element: <OrdersTable /> },
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
        element: <JobsPage />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      { path: '/jobs/:id', element: <SingleRequest /> },
    ],
  },
  { path: 'register', element: <Register /> },
  { path: '*', element: <Navigate to='/' /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
