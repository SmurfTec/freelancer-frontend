import React from 'react';
import styles from 'styles/commonStyles';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import logoImg from 'assets/logobright.svg';
import Logo from './Logo';
const Footer = () => {
  const classes = styles();
  return (
    <section className={classes.footer}>
      <Logo variant='h3' color='light ' />
      <div>Copyright © 2022 Freelancer Technology Pty Limited</div>
    </section>
  );
};

export default Footer;
