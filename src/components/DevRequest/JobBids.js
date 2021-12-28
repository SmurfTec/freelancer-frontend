import { Box, Divider, Typography } from '@material-ui/core';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import OfferBox from './OfferBox';

const JobBids = ({ offers, loading }) => {
  return (
    <Box
      style={{
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: 20,
        height: '100%',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant='h5'>Offers</Typography>
          <Divider style={{ margin: 10 }} />
          {offers?.map((offer) => (
            <React.Fragment key={offer._id}>
              <OfferBox offer={offer} />
              <Divider />
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default JobBids;
