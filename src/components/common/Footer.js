import React from 'react';
import styles from 'styles/commonStyles';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import logoImg from 'assets/logobright.svg';
const Footer = () => {
  const classes = styles();
  return (
    <section className={classes.footer}>
      <div id='logo'>
        <ButtonBase disableRipple component={Link} to='/'>
          <img src={logoImg} width='133px' height='31px' alt='Logo' />
        </ButtonBase>
      </div>
      <div>Copyright © 2022 Freelancer Technology Pty Limited</div>
    </section>
  );
};

export default Footer;
