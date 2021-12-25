import { Box } from '@material-ui/core';
import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const LandingPageLayout = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box style={{ marginTop: '2rem' }} />
      <Outlet />

      <Box style={{ marginTop: '2rem' }} />

      <Footer />
    </Box>
  );
};

export default LandingPageLayout;
