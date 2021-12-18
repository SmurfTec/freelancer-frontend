import React from 'react';
import NavBar from 'components/common/Navbar';
import Banner from './common/Banner';
import CarouselLayout from 'components/Carousel/CarouselLayout';
import CategoryCard from 'components/common/CategoryCard';
import { services } from 'data';
import styles from 'styles/commonStyles';
import { Box, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CircleIcon from '@material-ui/icons/CheckCircleOutline';
import img from 'assets/serviceDesc.jpg';
import { categories } from 'data';
import SubCategoryCard from './common/SubCategoryCard';
import { Container } from '@material-ui/core';
import Footer from './common/Footer';

import img1 from 'assets/airbus-logo2.svg';
import img2 from 'assets/amazon_logo2.svg';
import img3 from 'assets/deloitte-logo2.svg';
import img4 from 'assets/facebook-corporate-logo2.svg';
import img5 from 'assets/fujitsu-logo.svg';
import img6 from 'assets/google-logo.svg';
import img7 from 'assets/ibm-logo2.svg';
import { v4 } from 'uuid';

const supporters = [img1, img2, img3, img4, img5, img6, img7];

const LandingPage = () => {
  const classes = styles();
  const handleCatClick = () => {};

  return (
    <React.Fragment>
      <NavBar />
      <Banner />
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {supporters.map((el) => (
          <img src={el} alt='partner' key={v4()} />
        ))}
      </Box>

      <Container className={classes.marginBet}>
        <Typography variant='h4'>Popular Professional Services</Typography>
        <CarouselLayout>
          {services &&
            services.map((e) => (
              <div key={e.value} className={classes.carouselCard}>
                <CategoryCard cat={e} handleClick={handleCatClick} />
              </div>
            ))}
        </CarouselLayout>
      </Container>
      <div className={classes.serviceDetails}>
        <Container className={classes.marginBet}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant='h5'>
                  A whole world of freelance talent at your fingertips
                </Typography>
                <div className={classes.serviceSubHead}>
                  <CircleIcon />
                  <Typography variant='subtitle1'>
                    The best for every budget
                  </Typography>
                </div>
                <Typography variant='subtitle2' color='textSecondary'>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing.
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <div className={classes.serviceSubHead}>
                  <CircleIcon />
                  <Typography variant='subtitle1'>
                    Quality work done quickly
                  </Typography>
                </div>
                <Typography variant='subtitle2' color='textSecondary'>
                  Find the right freelancer to begin working on your project
                  within minutes.
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <div className={classes.serviceSubHead}>
                  <CircleIcon />
                  <Typography variant='subtitle1'>24/7 support</Typography>
                </div>
                <Typography variant='subtitle2' color='textSecondary'>
                  Questions? Our round-the-clock support team is available to
                  help anytime, anywhere.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  height: '100%',
                  // maxWidth: 380,
                  '& img': {
                    maxHeight: 390,
                  },
                }}
              >
                <img src={img} alt='Convenience' />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container className={classes.marginBet}>
        <Typography variant='h4'>Explore the Marketplace</Typography>

        <ul className={classes.catContainer}>
          {categories &&
            categories.map((c) => (
              <li key={c.id}>
                <SubCategoryCard {...c} key={c.id} />
              </li>
            ))}
        </ul>
      </Container>

      <Box sx={{ mt: 4 }}>
        <Footer />
      </Box>
    </React.Fragment>
  );
};

export default LandingPage;
