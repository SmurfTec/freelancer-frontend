import Loading from 'components/common/Loading';
import ManageGig from 'components/Gigs/ManageGig';
import JobsPage from 'components/Jobs/JobsPage';
import GigTable from 'components/Gigs/MyGigs';
import DevRequest from 'components/Jobs/CreateJob';
import Login from 'components/Login';
import Logout from 'components/Logout';
import OrdersTable from 'components/Orders/MyOrders';
import ViewProfile from 'components/Profile';
import CreateProfile from 'components/Profile/CreateProfile';
import Register from 'components/Register';
import { Navigate } from 'react-router-dom';
import DevRequestsTable from 'components/DevRequest/MyDevRequests';
import Dashboard from 'components/dashboard';
import SingleRequest from 'components/DevRequest/SingleRequest';
import UserHome from 'components/UserHome';
import Services from 'components/Services/ServicesPage';
import MyOffers from 'components/Offers/MyOffers';
import Chat from 'components/Chat';
import ViewUser from 'components/Profile/ViewUser';
import ViewService from 'components/Gigs/ViewGig';
import CommonLayout from 'layouts/CommonLayout';
import OrderDetails from 'components/Orders/OrderDetails';

const NotFound = () => <h1>Not Found</h1>;

export const protechtedRoutes = [
  {
    path: '/',
    element: <CommonLayout />,
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

      // * GIGS
      { path: '/services/me', element: <GigTable /> },
      { path: '/services/create', element: <ManageGig /> },
      { path: '/services/:id/edit', element: <ManageGig isUpdate /> },
      { path: '/gigs/manage', element: <GigTable /> },

      // * DevRequests
      { path: '/jobs', element: <JobsPage /> },
      { path: '/jobs/me', element: <JobsPage onlyMe /> },
      { path: '/jobs/create', element: <DevRequest /> },
      { path: '/jobs/:id', element: <SingleRequest /> },
      { path: '/requests', element: <DevRequestsTable /> },
      // { path: '/requests/mygigs', element: <MyGigs /> },
      // { path: '/mygigs', element: <GigTable /> },
      // { path: '/requests/mygigs/:id', element: <ManageGig isUpdate /> },

      // * Orders
      { path: '/orders', element: <OrdersTable /> },
      { path: '/orders/:id', element: <OrderDetails /> },
      { path: '/logout', element: <Logout /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <Navigate to='/profile' /> },
];

export const commonRotues = [
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <CommonLayout />,
    children: [
      {
        path: '/',
        element: <JobsPage />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/services/:id',
        element: <ViewService />,
      },
      { path: '/jobs/:id', element: <SingleRequest /> },
      {
        path: '/users/:id',
        element: <ViewUser />,
      },
    ],
  },
  { path: '*', element: <Navigate to='/' /> },

  // {path : '/' , element : <Nav}
];

export const publicRoutes = [
  // { path: '/', element: <LandingPage /> },
  { path: 'register', element: <Register /> },
];

export const loading = [{ path: '*', element: <Loading /> }];
