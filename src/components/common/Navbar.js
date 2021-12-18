import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import useStyles from 'styles/NavBarStyles';
import { Box, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AccountPopover from './AccountPopover';
import Logo from './Logo';

const Navbar = (props) => {
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
      {props.user ? (
        <MenuItem>
          <AccountPopover />
        </MenuItem>
      ) : (
        <MenuItem>
          <Button
            variant='contained'
            className={classes.RegisterBtn}
            onClick={() => navigate('/login')}
          >
            Login / Register
          </Button>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={`${classes.root}`}>
      <AppBar position='fixed' className={classes.Appbar}>
        <Toolbar>
          <Logo variant={'h4'} color='textPrimary' />

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
              {props.user ? (
                <AccountPopover />
              ) : (
                <Box
                  display='flex'
                  justifyContent='space-around'
                  maxWidth='300px'
                  minWidth='200px'
                >
                  <Button variant='outlined' onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button
                    variant='contained'
                    className={classes.RegisterBtn}
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </Box>
              )}
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
