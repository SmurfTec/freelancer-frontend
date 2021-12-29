import { Avatar, Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';

const Review = ({ review }) => {
  return (
    <Box style={{ marginBottom: '2rem', marginTop: '1rem', marginLeft: 20 }}>
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

export default Review;
