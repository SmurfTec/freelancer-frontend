import { AuthContext } from 'contexts/AuthContext';
import React, { useContext } from 'react';
import JobsPage from './Jobs/JobsPage';
import Services from './Services/ServicesPage';

const UserHome = () => {
  const { user } = useContext(AuthContext);
  console.log(`user.role`, user?.role);
  return <>{user?.role === 'seller' ? <JobsPage /> : <Services />}</>;
};

export default UserHome;
