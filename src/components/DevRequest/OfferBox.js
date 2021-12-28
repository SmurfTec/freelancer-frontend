import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  OfferBox: {
    width: 600,
    padding: 20,
    border: '1px solid #ccc',
    margin: 'auto',
    marginTop: '2rem',
  },
  OfferUser: {
    display: 'flex',
    gap: 10,
    marginBottom: '1rem',
    width: 'fit-content',
    color: '#000',
  },
  OfferDetails: {
    textAlign: 'left',
    gap: 10,
  },
}));

const OfferBox = ({ offer }) => {
  const classes = useStyles();
  console.log(`offer`, offer);
  if (!offer) return <> </>;
  return (
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
  );
};

export default OfferBox;
