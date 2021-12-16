import { Avatar, Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import faker from 'faker';
import React from 'react';

const GigReview = ({ review }) => {
  return (
    <Box style={{ marginBottom: '2rem' }}>
      <Box>
        <Avatar src={review.user.photo} />
        <Typography variant='body2'>{review.user.fullName}</Typography>
        <Rating
          name='half-rating'
          defaultValue={review.rating}
          readOnly
          precision={0.5}
          size='small'
        />
      </Box>
      <Typography variant='body2'>{review.description}</Typography>
      <Typography variant='body2'>
        {new Date(review.createdAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default GigReview;
