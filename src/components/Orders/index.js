import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React from 'react';

const useStyles = makeStyles((theme) => ({}));

const Index = () => {
  const classes = useStyles();
  return (
    <Box>
      <Navbar />
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant='h3'>What Service are you looking for ?</Typography>
        <Box className={classes.Form}></Box>
      </Container>
    </Box>
  );
};

export default Index;
