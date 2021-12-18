import React from 'react';
import { ButtonBase, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import LogoImg from 'assets/logo.svg';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  logoTitle: {
    fontFamily: "'Lobster', cursive",
  },
}));
function Logo({ variant, color }) {
  const classes = styles();
  return (
    <div id='logo'>
      <ButtonBase disableRipple component={Link} to='/'>
        <Typography
          variant={variant}
          color={color}
          style={{ color: color === 'light' && '#fff' }}
          className={classes.logoTitle}
        >
          Freelancer
        </Typography>
      </ButtonBase>
    </div>
  );
}

export default Logo;
