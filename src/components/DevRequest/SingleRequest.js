import { Box, Button, Container, Divider, Typography } from '@material-ui/core';
import CreateOfferDialog from 'components/Offers/CreateOffer';
import { AuthContext } from 'contexts/AuthContext';
import { DataContext } from 'contexts/DataContext';
import { DevRequestsContext } from 'contexts/DevRequestsContext';

import useToggle from 'hooks/useToggle';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobBids from './JobBids';

import useStyles from './styles/SingleRequestStyles';

const SingleRequest = () => {
  const classes = useStyles();
  const {
    getRequestById,
    loadingDevRequests: loading,
    devRequests,
  } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState();
  const navigate = useNavigate();
  const [notFound, toggleNotFound] = useToggle(false);
  const [isBidOpen, toggleBidOpen] = useToggle(false);

  const { id } = useParams();

  useEffect(() => {
    console.log(`loading`, loading);
    if (loading) return;

    const req = getRequestById(id);
    console.log(`req`, req);
    if (!req) return toggleNotFound();

    setJob(req);
  }, [getRequestById, devRequests, id, loading]);

  const handleClick = () => {
    if (!user) navigate(`/login?redirect=/jobs/${id}`);

    toggleBidOpen();
  };

  const isOwner = useMemo(() => {
    if (!user || !job) return false;

    return user._id === job.user._id;
  }, [user, job]);

  return (
    <Container style={{ paddingBottom: '3rem' }}>
      {loading && <div className='loader'></div>}
      {notFound && <Typography variant='h5'>404 Not Found</Typography>}
      {job && (
        <>
          <Box className={classes.JobMain}>
            <Typography variant='h5' align='center'>
              Job Details
            </Typography>
            <Box style={{ width: '100%' }}>
              <Typography variant='subtitle2'>
                Posted By :{' '}
                {job.user.fullName === user.fullName
                  ? 'You'
                  : job.user.fullName}
              </Typography>
            </Box>
            <Divider
              flexItem
              style={{
                height: 1,
                margin: 10,
              }}
            />
            <Box
              style={{
                display: 'flex',
                gap: 20,
              }}
            >
              <Typography
                variant='h5'
                style={{
                  fontWeight: 'normal',
                }}
              >
                {job.description}
              </Typography>
              <img
                src={job.image?.url}
                style={{
                  height: 200,
                  width: 300,
                  objectFit: 'cover',
                }}
              />
            </Box>

            <Divider
              flexItem
              style={{
                height: 1,
                margin: 10,
              }}
            />

            <Typography variant='h6'>Price : ${job.budget}</Typography>
            <Typography variant='h6'>
              Delivery Time :{job.expectedDays} days
            </Typography>
            <Typography variant='body1'>
              Posted on {new Date(job.createdAt).toDateString()}
            </Typography>

            {user &&
              !isOwner !==
              (
                <>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClick}
                  >
                    Apply
                  </Button>
                  <CreateOfferDialog
                    devRequestId={id}
                    open={isBidOpen}
                    toggleDialog={toggleBidOpen}
                  />
                </>
              )}
          </Box>
          {isOwner && <JobBids job={job} />}
        </>
      )}
    </Container>
  );
};

export default SingleRequest;
