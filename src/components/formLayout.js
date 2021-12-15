import React from 'react';
import { Typography, Grid, Box, Card } from '@material-ui/core';
import SiteLogo from 'components/common/SiteLogo';
import { useStyles } from 'styles/FormLayoutStyles';

const FormLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <section className={classes.mainContainer}>
      <section className={classes.backImgContainer}>
        <Box className={classes.backImg}>
          <img
            src='http://brandio.io/envato/iofrm/html/images/graphic3.svg'
            alt='background'
          />
        </Box>
      </section>

      <Card className={classes.formContent}>
        <Grid container>
          <Grid item sx={{ mb: 5 }} colspacing={5} xs={12}>
            <SiteLogo w={130} h={80} />
          </Grid>
        </Grid>
        {children}
      </Card>
    </section>
  );
};

export default FormLayout;
