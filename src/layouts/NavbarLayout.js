import Navbar from 'components/common/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const NavbarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavbarLayout;
