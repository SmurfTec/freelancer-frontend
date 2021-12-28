import React, { useMemo, useContext, useEffect, useState } from 'react';
import { Box, Grid, makeStyles, Button, Popover } from '@material-ui/core';
import { Container } from '@material-ui/core';

import { v4 } from 'uuid';
import { DataContext } from 'contexts/DataContext';
import { Skeleton } from '@material-ui/lab';
import DevReqCard from '../DevRequest/DevReqCard';
import { AuthContext } from 'contexts/AuthContext';
import { DevRequestsContext } from 'contexts/DevRequestsContext';
import JobsFilter from './JobsFilter';
import { FilterList } from '@material-ui/icons';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  filter: {
    marginTop: theme.spacing(3),
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
    },
  },
}));
const filterPopoverId = 'filterPopOver';

const RenderDevRequests = ({ loading, data }) => {
  return (
    <Grid container spacing={2}>
      {loading
        ? Array(20)
            .fill()
            .map(() => (
              <Grid item xs={6} sm={3} md={3} lg={2} key={v4()}>
                <Skeleton variant='react' height={200} />
              </Grid>
            ))
        : data?.map((el) => (
            <Grid item xs={6} sm={4} md={3} lg={3} key={el.value}>
              <DevReqCard devRequest={el} />
            </Grid>
          ))}
    </Grid>
  );
};

const JobsPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { devRequests, loadingDevRequests, categories } =
    useContext(DataContext);
  const { myDevRequests: usersRequests, loadingMyRequests } =
    useContext(DevRequestsContext);

  const [filteredData, setFilteredData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isFilterOpen = Boolean(anchorEl);
  const parsedQuery = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  const applyCategoryFilter = (e) => {
    const { catid } = e.currentTarget.dataset;
    // let allData = user?.role === 'buyer' ? usersRequests : devRequests;
    let allData = devRequests;

    console.log(`catid`, catid);
    setFilteredData(allData?.filter((el) => el.category._id === catid));
  };

  const applyPriceFilter = (pricesLevels) => {
    // * level 1 => 5k +
    // let allData = user?.role === 'buyer' ? usersRequests : devRequests;
    let allData = devRequests;
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

    setFilteredData(updatedData);
  };

  const applyDaysFilter = (daysLevels) => {
    // * level 1 => 5k +
    // let allData = user?.role === 'buyer' ? usersRequests : devRequests;
    let allData = devRequests;

    console.log(`allData`, allData);
    let updatedData = [];
    console.log(`daysLevels`, daysLevels);

    if (!daysLevels.length) updatedData = allData;
    else
      daysLevels.forEach((el) => {
        switch (el) {
          case 'level1':
            updatedData = allData.filter((el) => el.expectedDays >= 60);
            break;

          case 'level2':
            updatedData = allData.filter(
              (el) => el.expectedDays >= 30 && el.expectedDays < 60
            );

            break;

          case 'level3':
            updatedData = allData.filter(
              (el) => el.expectedDays >= 10 && el.expectedDays < 30
            );
            break;

          case 'level4':
            updatedData = allData.filter((el) => el.expectedDays < 10);
            break;
        }
      });

    updatedData = [...new Set(updatedData)];
    console.log(
      `updatedData.map()`,
      updatedData.map((el) => el.expectedDays)
    );

    setFilteredData(updatedData);
  };

  useEffect(() => {
    console.log(`parsedQuery`, parsedQuery);
    if (!parsedQuery.q) return setFilteredData(devRequests);

    setFilteredData(
      devRequests?.filter((el) =>
        el.description.toLowerCase().includes(parsedQuery.q)
      )
    );
  }, [parsedQuery]);

  useEffect(() => {
    if (!user) return setFilteredData(devRequests);

    setFilteredData(devRequests);
    // if (user.role === 'buyer') setFilteredData(usersRequests);
    // else setFilteredData(devRequests);
  }, [user, devRequests, usersRequests]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Container maxWidth='1400'>
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
              width: 600,
            },
          }}
        >
          <JobsFilter
            applyPriceFilter={applyPriceFilter}
            applyCategoryFilter={applyCategoryFilter}
            applyDaysFilter={applyDaysFilter}
            categories={categories}
          />
        </Popover>
        {/* <Grid item sm={12} md={10}>
        {/* <Grid container spacing={1}> */}

        <RenderDevRequests
          loading={
            loadingDevRequests
            // user?.role === 'buyer' ? loadingMyRequests : loadingDevRequests
          }
          data={filteredData}
          // data={user?.role === 'buyer' ? usersRequests : devRequests}
        />
        {/* </Grid> */}
        {/* </Grid>{' '} */}
      </Container>
    </React.Fragment>
  );
};

export default JobsPage;
