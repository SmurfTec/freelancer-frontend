import { AuthContext } from 'contexts/AuthContext';
import React, { useContext } from 'react';
import LandingPageLayout from './LandingPageLayout';
import NavbarLayout from './NavbarLayout';

const CommonLayout = () => {
  const { user } = useContext(AuthContext);
  return <>{user ? <NavbarLayout /> : <LandingPageLayout />}</>;
};

export default CommonLayout;
