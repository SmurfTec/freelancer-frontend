import { AuthContext } from 'contexts/AuthContext';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ location, history }) => {
  const { logoutUser, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) logoutUser();
    else navigate('/');
  }, [user, location]);

  return <div></div>;
};

export default Logout;
