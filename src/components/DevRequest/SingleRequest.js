import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import UserAvatar from 'components/common/UserAvatar';
import CreateOfferDialog from 'components/Offers/CreateOffer';
import { AuthContext } from 'contexts/AuthContext';
import { DataContext } from 'contexts/DataContext';
import { DevRequestsContext } from 'contexts/DevRequestsContext';
import { OffersContext } from 'contexts/OffersContext';

import useToggle from 'hooks/useToggle';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeReq } from 'utils/makeReq';
import JobBids from './JobBids';
import OfferBox from './OfferBox';

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
  const { createOffer } = useContext(OffersContext);
  const [offers, setOffers] = useState([]);
  const [loadingOffers, toggleLoadingOffers] = useToggle(true);

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

  const myOfferOnJob = useMemo(() => {
    if (!user || !offers) return undefined;

    console.log(`offers`, offers);
    return offers.find((el) => {
      console.log(` el.user._id`, el.user._id);
      console.log(` user._id`, user._id);
      console.log(` el.user._id === user._id`, el.user._id === user._id);
      return el.user._id === user._id;
    });
  }, [user, offers]);

  console.log(`myOfferOnJob`, myOfferOnJob);

  useEffect(() => {
    if (!job) return;

    (async () => {
      try {
        const resData = await makeReq(`/devRequests/${job._id}/offers`);
        setOffers(resData.offers);
      } catch (err) {
      } finally {
        toggleLoadingOffers();
      }
    })();
  }, [job]);

  const handleCreate = (inputState) => {
    createOffer(id, inputState, () => {
      toast.success('Offer Sent successfully!');
      toggleBidOpen();
    });
  };

  if (loading) return <div className='loader'></div>;
  if (notFound) return <Navigate to='/' />;

  return (
    <Box
      style={{
        paddingBottom: '3rem',
        maxWidth: 1300,
        marginInline: 'auto',
      }}
    >
      {job && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box className={classes.JobMain}>
              <Box>
                <Typography variant='h5' align='center'>
                  Job Details
                </Typography>
                {/* {user && !isOwner && ( */}
                {true && (
                  <>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleClick}
                      style={{
                        width: 'fit-content',
                        float: 'right',
                        marginLeft: 'auto',
                        marginTop: '-35px',
                      }}
                    >
                      Apply
                    </Button>
                    <CreateOfferDialog
                      open={isBidOpen}
                      toggleDialog={toggleBidOpen}
                      handleCreate={handleCreate}
                    />
                  </>
                )}
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
                  width: '100%',
                }}
              >
                <UserAvatar
                  user={job.user}
                  nameKey='fullName'
                  photoKey='photo'
                  height={60}
                  width={60}
                  styles={{ float: 'left', marginRight: 10 }}
                />
                <Box>
                  <Typography variant='subtitle2'>
                    {job.user?.fullName === user?.fullName
                      ? 'You'
                      : job.user?.fullName}
                  </Typography>
                </Box>
                <Typography
                  variant='h5'
                  style={{
                    fontWeight: 'normal',
                  }}
                >
                  {job.description}
                </Typography>
              </Box>

              <Divider
                flexItem
                style={{
                  height: 1,
                  margin: 10,
                }}
              />

              <img
                src={job.image?.url}
                style={{
                  // width: 300,
                  height: 200,
                  objectFit: 'cover',
                }}
              />
              <Divider
                flexItem
                style={{
                  height: 1,
                  margin: 10,
                }}
              />

              <Box>
                <Box width={200} display='flex' justifyContent='space-between'>
                  <Typography variant='subtitle1'>Price :</Typography>
                  <Typography variant='body1'>${job.budget}</Typography>
                </Box>
                <Box width={200} display='flex' justifyContent='space-between'>
                  <Typography variant='subtitle1'>Delivery Time :</Typography>
                  <Typography variant='body1'>
                    {job.expectedDays} days
                  </Typography>
                </Box>
                <Typography variant='body2'>
                  Posted on {new Date(job.createdAt).toDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
          {isOwner && (
            <Grid item xs={12} sm={6}>
              <JobBids offers={offers} loading={loadingOffers} />
            </Grid>
          )}
          {user && myOfferOnJob && (
            <Grid item xs={12} sm={6}>
              <JobBids offers={[myOfferOnJob]} loading={loadingOffers} />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default SingleRequest;
