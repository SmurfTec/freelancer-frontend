import {
  Avatar,
  Box,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import UserAvatar from 'components/common/UserAvatar';
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
      <UserAvatar
        user={offer.user}
        photoKey='photo'
        nameKey='fullName'
        height={50}
        width={50}
        styles={{
          float: 'left',
          marginRight: 10,
        }}
      />

      <Box className={classes.OfferDetails}>
        <Typography gutterBottom variant='body1' component='h2'>
          {offer?.user.fullName}
        </Typography>
        <Typography component='h5' variant='body1'>
          {offer.description}
        </Typography>
        <Divider />
        <Box
          style={{
            display: 'flex',
            gap: 10,
            marginTop: '1rem',
          }}
        >
          <Typography variant='subtitle1'>Price :</Typography>
          <Typography variant='body1'>${offer.budget}</Typography>
          <Typography variant='subtitle1'>Delivery Time :</Typography>
          <Typography variant='body1'>{offer.expectedDays} days</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OfferBox;
