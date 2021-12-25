import {
  Avatar,
  Box,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import useToggle from 'hooks/useToggle';
import React, { useEffect, useState } from 'react';
import { makeReq } from 'utils/makeReq';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  OfferBox: {
    width: 600,
    padding: 20,
    border: '1px solid #ccc',
    margin: 'auto',
  },
  OfferUser: {
    display: 'flex',
    gap: 10,
    marginBottom: '1rem',
    width: 'fit-content',
  },
  OfferDetails: {
    textAlign: 'left',
    gap: 10,
  },
}));

const JobBids = ({ job }) => {
  const classes = useStyles();
  const [offers, setOffers] = useState([]);
  const [loading, toggleLoading] = useToggle(true);

  useEffect(() => {
    if (!job) return;

    (async () => {
      try {
        const resData = await makeReq(`/devRequests/${job._id}/offers`);
        setOffers(resData.offers);
      } catch (err) {
      } finally {
        toggleLoading();
      }
    })();
  }, [job]);

  return (
    <Box className={classes.root}>
      {/* {loading ? ( */}
      {false ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant='subtitle1'>Offers</Typography>
          {offers?.map((offer) => (
            <Box key={offer._id} className={classes.OfferBox}>
              <Box
                className={classes.OfferUser}
                component={Link}
                to={`/users/${offer.user?._id}`}
              >
                <Avatar
                  src={
                    offer.user?.photo ||
                    `https://ui-avatars.com/api/?rounded=true&name=${offer.user?.fullName
                      .split(' ')
                      .join('+')}`
                  }
                  style={{ height: '30px', width: '30px' }}
                />
                <Typography gutterBottom variant='body1' component='h2'>
                  {offer?.user.fullName}
                </Typography>
              </Box>

              <Box className={classes.OfferDetails}>
                <Typography component='h5' variant='body1'>
                  {offer.description}
                </Typography>
                <Typography component='h5' variant='body1'>
                  {offer.expectedDays}
                </Typography>
                <Typography component='h5' variant='body1'>
                  ${offer.budget}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default JobBids;
