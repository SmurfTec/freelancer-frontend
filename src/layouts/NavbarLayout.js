import { Box } from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Box style={{ marginTop: '2rem' }} />

      <Outlet />
    </>
  );
};

export default NavbarLayout;
