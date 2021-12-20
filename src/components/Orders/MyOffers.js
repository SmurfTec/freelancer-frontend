import { Box, Container, Typography, Menu, MenuItem } from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React from 'react';
import styles from 'styles/commonStyles';
import { makeStyles } from '@material-ui/core/styles';
import DevRequestsTabs from './Tabs';

const useStyles = makeStyles(() => ({
  gigImg: {
    float: 'left',
    borderRadius: 3,
    backgroundColor: '#fff',
    display: 'block',
    width: 45,
    height: 32,
    overflow: 'hidden',
  },
}));

const Orders = () => {
  const classes = styles();
  const classes_s = useStyles();

  const [actionMenu, setActionMenu] = React.useState(null);
  const isMenuOpen = Boolean(actionMenu);

  const handleMenuOpen = (event) => {
    setActionMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActionMenu(null);
  };

  const handleEditGig = (e) => {
    const { gigtitle } = e.currentTarget.dataset;
    console.log(`e.target`, e.target);
    console.log(gigtitle);
  };

  const menuId = 'gigActionMenu';
  const renderMenu = (
    <Menu
      anchorEl={actionMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEditGig}>EDIT</MenuItem>
      <MenuItem onClick={handleMenuClose}>REMOVE</MenuItem>
    </Menu>
  );

  return (
    <>
      <Navbar user='user' />
      <Container className={classes.container}>
        <Box sx={{ mt: 3 }}>
          <Typography variant='h4'>Buyer Requests</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <DevRequestsTabs />
        </Box>
      </Container>
      {renderMenu}
    </>
  );
};

export default Orders;
