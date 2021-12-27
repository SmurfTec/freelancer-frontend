import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from 'styles/NavBarStyles';
import { Box, Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AccountPopover from './AccountPopover';
import Logo from './Logo';
import { AuthContext } from 'contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { v4 } from 'uuid';

const Navbar = (props) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const sellerNavItems = [
    {
      _id: v4(),
      link: '/',
      text: 'Dashboard',
    },
    {
      _id: v4(),
      link: '/messages',
      text: 'Messages',
    },
  ];
  const buyerNavItems = [
    {
      _id: v4(),
      link: '/dashboard',
      text: 'Dashboard',
    },
    {
      _id: v4(),
      link: '/jobs/create',
      text: 'Create Job',
    },
    {
      _id: v4(),
      link: '/messages',
      text: 'Messages',
    },
  ];

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleSwitchUser = () => {};

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
      {user ? (
        <>
          <MenuItem>
            <AccountPopover classes={classes} />
          </MenuItem>
          <MenuItem>
            <Typography variant='subtitle2' className={classes.NavItem}>
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </Typography>
          </MenuItem>

          <MenuItem>
            <Typography variant='subtitle2' className={classes.NavItem}>
              <NavLink to='/mygigs'>Services</NavLink>
            </Typography>
          </MenuItem>

          <MenuItem>
            <Typography variant='subtitle2' className={classes.NavItem}>
              <NavLink to='/orders'>Orders</NavLink>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant='subtitle2' className={classes.NavItem}>
              <NavLink to='/chat'>Messages</NavLink>
            </Typography>
          </MenuItem>

          <MenuItem>
            <NavLink to='/'>
              <Typography
                variant='subtitle1'
                color='primary'
                // className={classes.NavItem}
                style={{ fontWeight: 500, cursor: 'pointer' }}
              >
                Switch To
                {user.role === 'seller' ? 'Buyer' : 'Seller'}
              </Typography>
            </NavLink>
          </MenuItem>
        </>
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
              {user ? (
                <>
                  <Box
                    display='flex'
                    justifyContent='space-around'
                    sx={{
                      marginInline: 20,
                      columnGap: 25,
                      alignItems: 'end',
                    }}
                  >
                    {user.role === 'seller'
                      ? sellerNavItems.map((el) => (
                          <Typography
                            key={el._id}
                            variant='subtitle2'
                            className={classes.NavItem}
                          >
                            <NavLink to={el.link}>{el.text}</NavLink>
                          </Typography>
                        ))
                      : buyerNavItems.map((el) => (
                          <Typography
                            key={el._id}
                            variant='subtitle2'
                            className={classes.NavItem}
                          >
                            <NavLink to={el.link}>{el.text}</NavLink>
                          </Typography>
                        ))}
                    <Typography
                      variant='subtitle1'
                      color='primary'
                      style={{ fontWeight: 500, cursor: 'pointer' }}
                    >
                      Switch To {user.role === 'seller' ? 'Buyer' : 'Seller'}
                    </Typography>
                  </Box>
                  <AccountPopover classes={classes} />
                </>
              ) : (
                <Box
                  display='flex'
                  justifyContent='space-around'
                  sx={{
                    marginInline: 20,
                    columnGap: 25,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='subtitle2' className={classes.NavItem}>
                    <NavLink to='/'>Jobs</NavLink>
                  </Typography>
                  <Typography variant='subtitle2' className={classes.NavItem}>
                    <NavLink to='/services'>Services</NavLink>
                  </Typography>
                  <Button
                    variant='outlined'
                    style={{
                      minWidth: 100,
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant='contained'
                    className={classes.RegisterBtn}
                    style={{
                      minWidth: 100,
                    }}
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
