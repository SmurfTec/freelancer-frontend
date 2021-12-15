import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import useStyles from 'styles/NavBarStyles';
import { Box, Button } from '@material-ui/core';
import { useNavigate, NavLink } from 'react-router-dom';
import SiteLogo from 'components/common/SiteLogo';
// import logo from 'assets/logo.jpg';
// import { AuthContext } from 'contexts/AuthContext';
import theme from 'theme';

const Navbar = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //   const { logoutUser, user } = useContext(AuthContext);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleSearch = (searchValue) => {
    console.log(`searchValue`, searchValue);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.MobileMenu}
    >
      <MenuItem>
        <Button
          variant='contained'
          className={classes.RegisterBtn}
          onClick={() => navigate('/login')}
        >
          Login / Register
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={`${classes.root}`}>
      <AppBar position='fixed' className={classes.Appbar}>
        <Toolbar>
          <SiteLogo w={100} h={60} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginInline: 'auto',
            }}
            className={classes.SearchBar}
          />
          <div className={classes.sectionDesktop}>
            <Box
              display='flex'
              justifyContent='space-around'
              alignItems='center'
              sx={{ marginLeft: 'auto' }}
            >
              <Box
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  justifyContent: 'space-around',
                  flexBasis: '25%',
                  maxWidth: 300,
                  minWidth: 200,
                }}
              >
                {/* {true && (
                  <Typography
                    variant='subtitle1'
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}
                  >
                    <NavLink
                      to='/menus'
                      // activeStyle={{
                      //   color: 'red',
                      // }}
                      style={({ isActive }) => ({
                        color: isActive ? theme.palette.primary.main : '#000',
                        textDecoration: 'none',
                      })}
                    >
                      Menus
                    </NavLink>
                  </Typography>
                )} */}
                {false ? (
                  <Button
                    variant='contained'
                    className={classes.RegisterBtn}
                    // onClick={logoutUser}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      variant='outlined'
                      //   className={classes.RegisterBtn}
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      variant='contained'
                      className={classes.RegisterBtn}
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              style={{
                marginLeft: 'auto',
                color: '#000',
              }}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Box paddingTop={'64px'}> </Box>
    </div>
  );
};
export default Navbar;
