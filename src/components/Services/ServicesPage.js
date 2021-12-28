import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Grid, Popover, Typography, Button } from '@material-ui/core';

import useStyles from '../BuyerHome/styles';
import { v4 } from 'uuid';
import CarouselLayout from '../BuyerHome/Carousel/CarouselLayout';
import GigCard from './GigCard';
import { DataContext } from 'contexts/DataContext';
import { Skeleton } from '@material-ui/lab';
import { AuthContext } from 'contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ServicesFilter from './ServicesFilter';
import { FilterList } from '@material-ui/icons';

const filterPopoverId = 'ServicesPopOver';

const Services = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isFilterOpen = Boolean(anchorEl);
  const { user } = useContext(AuthContext);
  const { services, loadingServices, categories } = useContext(DataContext);
  const [filteredServices, setFilteredServices] = useState([]);
  const location = useLocation();

  const parsedQuery = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  useEffect(() => {
    if (!services) return;

    setFilteredServices(services);
  }, [services]);

  useEffect(() => {
    console.log(`parsedQuery`, parsedQuery);
    if (!parsedQuery.q) return setFilteredServices(services);

    setFilteredServices(
      services?.filter((el) => el.title.toLowerCase().includes(parsedQuery.q))
    );
  }, [parsedQuery]);

  const applyCategoryFilter = (e) => {
    const { catid } = e.currentTarget.dataset;
    // let allData = user?.role === 'buyer' ? usersRequests : services;

    console.log(`catid`, catid);
    setFilteredServices(services?.filter((el) => el.category._id === catid));
  };

  const applyPriceFilter = (pricesLevels) => {
    // * level 1 => 5k +
    // let allData = user?.role === 'buyer' ? usersRequests : services;
    let allData = services;
    console.log(`allData`, allData);
    let updatedData = [];
    console.log(`pricesLevels`, pricesLevels);

    if (!pricesLevels.length) updatedData = allData;
    else
      pricesLevels.forEach((el) => {
        switch (el) {
          case 'level1':
            updatedData = allData.filter((el) => el.budget >= 1000);
            break;

          case 'level2':
            updatedData = allData.filter(
              (el) => el.budget >= 500 && el.budget < 1000
            );

            break;

          case 'level3':
            updatedData = allData.filter(
              (el) => el.budget >= 100 && el.budget < 500
            );
            break;

          case 'level4':
            updatedData = allData.filter(
              (el) => el.budget >= 50 && el.budget < 100
            );
            break;

          case 'level5': {
            updatedData = allData.filter((el) => el.budget < 50);
            break;
          }
        }
      });

    updatedData = [...new Set(updatedData)];
    console.log(
      `updatedData.map()`,
      updatedData.map((el) => el.budget)
    );

    setFilteredServices(updatedData);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={{ paddingInline: 50 }}>
      {/* <Grid container spacing={2} style={{ marginBlock: '2rem' }}>
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
      </Typography> */}
      {!parsedQuery ||
        (!parsedQuery.q && (
          <>
            <Typography
              variant='h5'
              style={{ marginTop: '2rem', marginBottom: '1rem' }}
            >
              Most Popular Services
            </Typography>
            <CarouselLayout>
              {loadingServices
                ? Array(18)
                    .fill()
                    .map(() => (
                      <div key={v4()} className={classes.carouselCard}>
                        <Skeleton variant='rect' width='100%' height={200} />
                      </div>
                    ))
                : services &&
                  services.map((el) => (
                    <div key={el.value} className={classes.carouselCard}>
                      <GigCard gig={el} />
                    </div>
                  ))}
            </CarouselLayout>
          </>
        ))}
      <Typography
        variant='h5'
        style={{ marginTop: '2rem', marginBottom: '1rem' }}
      >
        Services You May Like
      </Typography>
      <Box style={{ marginBottom: '2rem', textAlign: 'right' }}>
        <Button
          variant='contained'
          color='primary'
          aria-describedby={filterPopoverId}
          variant='contained'
          color='primary'
          onClick={handleClick}
          endIcon={<FilterList />}
          style={{
            marginRight: '5%',
          }}
        >
          Filter
        </Button>
      </Box>
      <Popover
        id={filterPopoverId}
        open={isFilterOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: 400,
          },
        }}
      >
        <ServicesFilter
          applyPriceFilter={applyPriceFilter}
          applyCategoryFilter={applyCategoryFilter}
          categories={categories}
        />
      </Popover>

      <Grid container spacing={2}>
        {loadingServices ? (
          Array(18)
            .fill()
            .map(() => (
              <Grid item sm={2} key={v4()}>
                <Skeleton variant='rect' width='100%' height={200} />
              </Grid>
            ))
        ) : filteredServices.length > 0 ? (
          filteredServices.map((el) => (
            <Grid item sm={2} key={el.value}>
              <GigCard gig={el} />
            </Grid>
          ))
        ) : (
          <Typography
            variant='h5'
            style={{ marginTop: '2rem', marginBottom: '1rem' }}
          >
            No Services found against serch
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Services;
