import Loading from 'components/common/Loading';
import { AuthContext } from 'contexts/AuthContext';
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router';

// * This is the route which will be avaible only if User is NOT logged in
// * e,g landing page, will only show if not loggedIn
// * If logged IN then dashboard will be shown

const PublicRoute = ({ path, component: Component, ...rest }) => {
  const { token, user } = useContext(AuthContext);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return token ? (
          user ? (
            <Navigate to='/' />
          ) : (
            <Loading />
          )
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PublicRoute;
