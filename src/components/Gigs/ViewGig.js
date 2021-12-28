import {
  Avatar,
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Divider,
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
import { Navigate, useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { API_BASE_URL } from 'utils/makeReq';
import Loading from 'components/common/Loading';

function Item({ item }) {
  return (
    <Paper>
      <img style={{ height: 300, width: '100%' }} src={item} alt='gig image' />
    </Paper>
  );
}

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
        <Box
          p={3}
          style={{
            height: 250,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            style={
              {
                // display: 'flex',
                // flexDirection: 'column',
                // height: 250,
              }
            }
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
              marginTop: 'auto',
              gap: 10,
            }}
          >
            <AccessTimeIcon />
            <Typography fontWeight='bold'>
              {item.expectedDays} Days Delivery
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
}

const ViewGig = () => {
  const classes = useStyles();
  const { id } = useParams();

  const {
    loading,
    error,
    value: service,
  } = useFetch(`${API_BASE_URL}/gigs/${id}`, {}, [id], 'gig');

  const [packageTab, setPackageTab] = useState(0);

  if (loading) return <Loading noTitle />;

  if (error) return <Navigate to='/services' />;

  console.log(`service`, service);

  return (
    <Box>
      {service && (
        <Container style={{ marginTop: '2rem', maxWidth: '1200px' }}>
          <Typography variant='h4'>{service.title}</Typography>
          <Box
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Avatar src={service.user.photo} />
            <Typography variant='body2'>{service.user.fullName}</Typography>
            <Rating
              name='half-rating'
              defaultValue={service.user.ratingsAverage}
              readOnly
              precision={0.5}
              size='small'
            />
            <Typography variant='h6' style={{ color: '#FFB400' }}>
              {service.user.ratingsAverage}
            </Typography>
          </Box>
          <Grid
            container
            spacing={4}
            style={{
              marginTop: '1rem',
            }}
          >
            <Grid item sm={8} style={{ height: 400 }}>
              <Box>
                <Carousel navButtonsAlwaysVisible>
                  {service.images.map((item, i) => (
                    <Item key={i} item={item} />
                  ))}
                </Carousel>
              </Box>
            </Grid>
            <Grid
              item
              sm={4}
              style={{
                height: 400,
              }}
            >
              <Box
                style={{
                  border: '1px solid #ccc',
                  height: 300,
                }}
              >
                <Tabs
                  value={packageTab}
                  onChange={(e, val) => setPackageTab(val)}
                  aria-label='gig packages'
                  indicatorColor=''
                  textColor='primary'
                  // fullWidth
                  className={classes.Tabs}
                >
                  <Tab label='Basic' {...a11yProps(0)} />
                  <Tab label='Standard' {...a11yProps(1)} />
                  <Tab label='Premium' {...a11yProps(2)} />
                </Tabs>
                <TabPanel
                  item={service.packages[0]}
                  value={packageTab}
                  index={0}
                ></TabPanel>
                <TabPanel
                  item={service.packages[1]}
                  value={packageTab}
                  index={1}
                ></TabPanel>
                <TabPanel
                  item={service.packages[2]}
                  value={packageTab}
                  index={2}
                ></TabPanel>
              </Box>
            </Grid>
          </Grid>
          <Typography variant='h5' style={{ marginBottom: '1rem' }}>
            About this Service
          </Typography>
          <Typography variant='body1'>{service.description}</Typography>
          <Box style={{ maxWidth: 500 }}>
            <Typography
              variant='h5'
              fontWeight='normal'
              style={{ marginTop: '2rem', marginBottom: '1rem' }}
            >
              Reviews
            </Typography>
            {service?.user.reviews.length === 0 ? (
              <Typography variant='subtitle1'>
                No Reviews for this user yet
              </Typography>
            ) : (
              <>
                {/* <Divider /> */}
                {service?.user.reviews.map((el) => (
                  <React.Fragment key={faker.name.findName()}>
                    {' '}
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
                    <Divider />
                  </React.Fragment>
                ))}
              </>
            )}
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default ViewGig;
