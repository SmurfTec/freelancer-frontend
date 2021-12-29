import React, { useContext, useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from 'styles/NavBarStyles';
import { Box, Button, Typography } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountPopover from './AccountPopover';
import Logo from './Logo';
import { AuthContext } from 'contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { v4 } from 'uuid';
import SearchBar from 'material-ui-search-bar';

const Navbar = (props) => {
  const classes = useStyles();
  const { user, updateMe } = useContext(AuthContext);
  const [searchVal, setSearchVal] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const sellerNavItems = [
    {
      _id: v4(),
      link: '/messages',
      text: 'Messages',
    },
  ];
  const buyerNavItems = [
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const searchBarPlaceholder = useMemo(() => {
    return user?.role === 'seller' ? 'Search Jobs' : 'Search Services';
  }, [location.pathname, user]);

  const showSearchBar = useMemo(() => {
    let condition = false;
    // * If user is logged In then , only in '/' and '/jobs'
    if (user) {
      if (['/', '/services', '/jobs'].includes(location.pathname.toLowerCase()))
        condition = true;
    } else {
      if (['/', '/services', '/jobs'].includes(location.pathname.toLowerCase()))
        condition = true;
    }
    // * else only in homepage and services , jobs

    return condition;
  }, [location.pathname, user]);

  const handleSearch = () => {
    console.log(`searchVal`, searchVal);
    navigate(`?q=${searchVal}`);
  };

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

  const handleSwitchUser = () => {
    const role = user.role === 'buyer' ? 'seller' : 'buyer';
    updateMe({ role });
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
              <NavLink to='/services/me'>Services</NavLink>
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
                onClick={handleSwitchUser}
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
              marginInline: '10px auto',
            }}
            className={classes.SearchBar}
          >
            {showSearchBar && (
              <SearchBar
                value={searchVal}
                onChange={(newValue) => setSearchVal(newValue)}
                onRequestSearch={handleSearch}
                placeholder={searchBarPlaceholder}
              />
            )}
          </div>
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
                      onClick={handleSwitchUser}
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
