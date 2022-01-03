import { useContext, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { alpha } from '@material-ui/core/styles';
import {
  Button,
  Box,
  Divider,
  Typography,
  Avatar,
  IconButton,
} from '@material-ui/core';
import MenuPopover from './MenuPopover';
// import { useAuth } from 'Context/AuthContext';
import { toast } from 'react-toastify';
import { AuthContext } from 'contexts/AuthContext';

export default function AccountPopover({ classes }) {
  const { user, logoutUser } = useContext(AuthContext);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          width: 44,
          height: 44,
          padding: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={user.photo} alt='User' />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        // style={{ width: 300 }}
        PaperProps={{
          style: {
            width: 150,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {/* <Typography variant='subtitle1' noWrap>
            {user.fullName.toUpperCase()}
          </Typography> */}
          <Typography variant='body1' className={classes.NavItem}>
            <Link to='/dashboard'>Dashboard</Link>
          </Typography>
          <Typography variant='body1' className={classes.NavItem}>
            <Link to='/profile'>Profile</Link>
          </Typography>
          <Typography variant='body1' className={classes.NavItem}>
            <Link to='/orders'>Orders</Link>
          </Typography>
          {user?.role === 'seller' ? (
            <>
              <Typography variant='body1' className={classes.NavItem}>
                <Link to='/'>Jobs</Link>
              </Typography>
              <Typography variant='body1' className={classes.NavItem}>
                <Link to='/offers'>Offers</Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant='body1' className={classes.NavItem}>
                <Link to='/jobs/me'>My Jobs</Link>
              </Typography>
              <Typography variant='body1' className={classes.NavItem}>
                <Link to='/'>Services</Link>
              </Typography>
            </>
          )}
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Typography
            onClick={handleLogout}
            variant='body1'
            className={classes.NavItem}
          >
            Logout
          </Typography>
        </Box>
        {error !== null &&
          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
          })}
      </MenuPopover>
    </>
  );
}
