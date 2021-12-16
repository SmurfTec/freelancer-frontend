import React, { useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import ItemsCarousel from 'react-items-carousel';

import useStyles from './styles';
import { v4 } from 'uuid';
import faker from 'faker';
import CarouselLayout from './Carousel/CarouselLayout';
import GigCard from './Carousel/GigCard';
import gig1 from 'assets/gig1.jpg';
import gig2 from 'assets/gig2.jpg';
import gig3 from 'assets/gig3.png';
import gig4 from 'assets/gig4.jpg';
import gig5 from 'assets/gig5.png';
import gig6 from 'assets/gig6.png';
import gig7 from 'assets/gig7.jpg';
import gig8 from 'assets/gig8.png';
import gig9 from 'assets/gig9.jpg';
import DesignCard from './designCard';

const gigs = [
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    images: [gig1],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig2],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig3],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig4],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig5],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig6],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig7],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig8],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
  {
    _id: faker.datatype.uuid(),
    title: faker.random.words(5),
    description: faker.random.words(5),
    images: [gig9],
    user: {
      fullName: faker.name.findName(),
      photo: faker.internet.avatar(),
    },
    description: faker.random.words(10),
    ratingsAverage: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 3, max: 5, precision: 0.1 }),
    startingPrice: faker.datatype.number({
      min: 100,
      max: 1000,
      precision: 500,
    }),
  },
];

const BuyerHome = () => {
  const handleCatClick = () => {};

  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <Box style={{ paddingInline: 50 }}>
      <Navbar />
      <Grid container spacing={2} style={{ marginBlock: '2rem' }}>
        <Grid item sm={2} className={classes.Section1A}>
          <Typography variant='h5'>Hi uahmadsoft</Typography>
          <Typography variant='body1' align='center' component='h5'>
            Get offers from sellers for your project
          </Typography>
          <Button variant='outlined' color='primary'>
            Post a Request
          </Button>
        </Grid>
        <Grid item sm={10}>
          <Box>
            <Typography variant='h5'>
              Here's what you need to build your website
            </Typography>
          </Box>
          <Box className={classes.carouselCard}>
            <DesignCard />
          </Box>
        </Grid>
      </Grid>
      <Typography variant='h5'>Continue browsing</Typography>
      <CarouselLayout>
        {gigs &&
          gigs.map((el) => (
            <div key={el.value} className={classes.carouselCard}>
              <GigCard gig={el} handleClick={handleCatClick} />
            </div>
          ))}
      </CarouselLayout>
    </Box>
  );
};

export default BuyerHome;
