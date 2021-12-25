import { AuthContext } from 'contexts/AuthContext';
import React, { useContext } from 'react';
import JobsPage from './JobsPage';
import Services from './ServicesPage';

const UserHome = () => {
  const { user } = useContext(AuthContext);
  console.log(`user.role`, user?.role);
  return <>{user?.role === 'seller' ? <JobsPage /> : <Services />}</>;
};

export default UserHome;
