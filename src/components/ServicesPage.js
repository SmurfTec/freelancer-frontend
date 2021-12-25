import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import ItemsCarousel from 'react-items-carousel';

import useStyles from './BuyerHome/styles';
import { v4 } from 'uuid';
import faker from 'faker';
import CarouselLayout from './BuyerHome/Carousel/CarouselLayout';
import GigCard from './BuyerHome/Carousel/GigCard';
import gig1 from 'assets/gig1.jpg';
import gig2 from 'assets/gig2.jpg';
import gig3 from 'assets/gig3.png';
import gig4 from 'assets/gig4.jpg';
import gig5 from 'assets/gig5.png';
import gig6 from 'assets/gig6.png';
import gig7 from 'assets/gig7.jpg';
import gig8 from 'assets/gig8.png';
import gig9 from 'assets/gig9.jpg';
import DesignCard from './BuyerHome/designCard';

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

const Services = () => {
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
        <Grid
          item
          sm={10}
          style={{
            padding: '30px 15px',
            display: 'flex',
            gap: '30px',
            display: 'flex',
            gap: '30px',
            padding: '0',
            paddingInline: '50px',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              flexBasis: '40%',
            }}
          >
            <Typography variant='h5'>
              Here's what you need to build your website
            </Typography>
          </Box>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: 20,
            }}
          >
            <DesignCard />
            <DesignCard />
          </Box>
        </Grid>
      </Grid>
      <Typography variant='h5' style={{ marginTop: '2rem' }}>
        Continue browsing
      </Typography>
      <CarouselLayout>
        {gigs &&
          gigs.map((el) => (
            <div key={el.value} className={classes.carouselCard}>
              <GigCard gig={el} handleClick={handleCatClick} />
            </div>
          ))}
      </CarouselLayout>
      <Typography
        variant='h5'
        style={{ marginTop: '2rem', marginBottom: '1rem' }}
      >
        Most Popular Gigs
      </Typography>
      <Grid container spacing={2}>
        {gigs &&
          gigs.map((el) => (
            <Grid item sm={2} key={el.value}>
              <GigCard gig={el} handleClick={handleCatClick} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Services;
