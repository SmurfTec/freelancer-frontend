import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import styles from 'styles/commonStyles';

const Banner = () => {
  const classes = styles();

  return (
    <section className={`${classes.bannerImgCntr} ${classes.bannerImg}`}>
      <span className={classes.overlay} />
      <div className={classes.bannerContent}>
        <Typography variant='h3'>
          Find the perfect freelance services for your business
        </Typography>
        {/* <div className={classes.dec}> */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2, fontStyle: 'italic' }}
            //   component={Link}
            to='/tours/create'
          >
            Discover
          </Button>
        </Box>
        {/* </div> */}
      </div>
    </section>
  );
};

export default Banner;
