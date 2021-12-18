import Loading from 'components/common/Loading';
import { AuthContext } from 'contexts/AuthContext';
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router';

const ProtechtedRoute = ({ path, component: Component, ...rest }) => {
  const { token, user } = useContext(AuthContext);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return token ? (
          user ? (
            <Component {...props} />
          ) : (
            <Loading />
          )
        ) : (
          <Navigate to={`/auth/login?redirect=${props.location.pathname}`} />
        );
      }}
    />
  );
};

export default ProtechtedRoute;
