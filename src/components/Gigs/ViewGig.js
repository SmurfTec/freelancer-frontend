import {
  Avatar,
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React, { useState } from 'react';
import faker from 'faker';
import gig1 from 'assets/gig1.jpg';
import useStyles from './viewStyles';
import { Rating } from '@material-ui/lab';
import Carousel from 'react-material-ui-carousel';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import img1 from 'assets/gigdetail1.jpg';
import img2 from 'assets/gigdetail2.jpg';
import img3 from 'assets/gigdetails3.jpg';
import GigReview from './GigReview';

var items = [
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img3,
  },
];

const package1 = {
  _id: faker.datatype.uuid(),
  title: 'Basic',
  description: faker.random.words(10),
  price: faker.datatype.number({ min: 10, max: 100 }),
  deliveryTime: faker.datatype.number({ min: 10, max: 100 }),
};
const package2 = {
  _id: faker.datatype.uuid(),
  title: 'Standard',
  description: faker.random.words(10),
  price: faker.datatype.number({ min: 10, max: 100 }),
  deliveryTime: faker.datatype.number({ min: 10, max: 100 }),
};
const package3 = {
  _id: faker.datatype.uuid(),
  title: 'Premium',
  description: faker.random.words(10),
  price: faker.datatype.number({ min: 10, max: 100 }),
  deliveryTime: faker.datatype.number({ min: 10, max: 100 }),
};

function Item({ item }) {
  return (
    <Paper>
      <img
        style={{ height: 300, width: '100%' }}
        src={item.img}
        alt='gig image'
      />
    </Paper>
  );
}

const gig = {
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
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { item, children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h6'>{item.title}</Typography>
            <Typography variant='h5' fontWeight='normal'>
              ${item.price}
            </Typography>
          </Box>
          <Typography>{item.description}</Typography>
          <Box
            style={{
              display: 'flex',
              marginTop: 10,
              gap: 10,
            }}
          >
            <AccessTimeIcon />
            <Typography fontWeight='bold'>
              {item.deliveryTime} Days Delivery
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
}

const ViewGig = () => {
  const classes = useStyles();
  const [packageTab, setPackageTab] = useState(0);
  return (
    <Box style={{ paddingBottom: '2rem' }}>
      <Navbar />
      <Container style={{ marginTop: '2rem', maxWidth: '1200px' }}>
        <Grid container spacing={2}>
          <Grid item sm={7}>
            <Typography variant='h4'>{gig.title}</Typography>
            <Box
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <Avatar src={gig.user.photo} />
              <Typography variant='body2'>{gig.user.fullName}</Typography>
              <Rating
                name='half-rating'
                defaultValue={gig.rating}
                readOnly
                precision={0.5}
                size='small'
              />
              <Typography variant='h6' style={{ color: '#FFB400' }}>
                {gig.rating}
              </Typography>
            </Box>
            <Box style={{ marginBlock: '2rem' }}>
              <Carousel navButtonsAlwaysVisible>
                {items.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </Carousel>
            </Box>
            <Typography variant='h5' style={{ marginBottom: '1rem' }}>
              About this gig
            </Typography>
            <Typography variant='h5'>{gig.description}</Typography>
            <Typography
              variant='h5'
              fontWeight='normal'
              style={{ marginTop: '2rem', marginBottom: '1rem' }}
            >
              Reviews
            </Typography>
            <GigReview
              review={{
                user: {
                  fullName: faker.name.findName(),
                  photo: faker.internet.avatar(),
                },
                description: faker.random.words(10),
                createdAt: new Date(),
                rating: faker.datatype.number({
                  min: 3,
                  max: 5,
                  precision: 0.1,
                }),
              }}
            />
            <GigReview
              review={{
                user: {
                  fullName: faker.name.findName(),
                  photo: faker.internet.avatar(),
                },
                description: faker.random.words(10),
                createdAt: new Date(),
                rating: faker.datatype.number({
                  min: 3,
                  max: 5,
                  precision: 0.1,
                }),
              }}
            />
            <GigReview
              review={{
                user: {
                  fullName: faker.name.findName(),
                  photo: faker.internet.avatar(),
                },
                description: faker.random.words(10),
                createdAt: new Date(),
                rating: faker.datatype.number({
                  min: 3,
                  max: 5,
                  precision: 0.1,
                }),
              }}
            />
          </Grid>
          <Grid
            item
            sm={5}
            style={{
              border: '1px solid #ccc',
              padding: 0,
              height: 400,
            }}
          >
            <Tabs
              value={packageTab}
              onChange={(e, val) => setPackageTab(val)}
              aria-label='gig packages'
              indicatorColor=''
              textColor='primary'
              fullWidth
              className={classes.Tabs}
            >
              <Tab label='Basic' {...a11yProps(0)} />
              <Tab label='Standard' {...a11yProps(1)} />
              <Tab label='Premium' {...a11yProps(2)} />
            </Tabs>
            <TabPanel item={package1} value={packageTab} index={0}></TabPanel>
            <TabPanel item={package2} value={packageTab} index={1}></TabPanel>
            <TabPanel item={package3} value={packageTab} index={2}></TabPanel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewGig;
