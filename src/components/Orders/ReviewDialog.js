import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  makeStyles,
} from '@material-ui/core';
import useTextInput from 'hooks/useTextInput';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 5,
    // boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
  },
  uploadFile: {
    '& input': {
      display: 'none',
    },
  },
  uploadFileBox: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 100,
      width: 100,
      objectFit: 'cover',
    },
  },
  marginBetween: {
    marginBlock: theme.spacing(2),
  },
}));

const GiveReview = ({ open, toggleDialog, handleCreate }) => {
  const classes_s = useStyles();

  const [review, handleReviewChange, resetReview] = useTextInput('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    handleCreate({ review, rating });

    e.preventDefault();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Give Review</DialogTitle>
      <DialogContent>
        <Box
          className={`${classes_s.paper} ${classes_s.marginBetween}`}
          sx={{ borderRadius: 0, boxShadow: 'none' }}
        >
          <form id='form1' onSubmit={handleSubmit}>
            <Box
              sx={{
                pt: 3,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 20,
              }}
            >
              <TextField
                autoFocus
                margin='dense'
                id='review'
                label='Review'
                name='review'
                onChange={handleReviewChange}
                type='text'
                required
              />
              <Rating
                name='rating'
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button form='form1' type='submit' variant='contained' color='primary'>
          Give Review
        </Button>
        <Button
          onClick={() => handleCreate()}
          form='form'
          type='submit'
          variant='contained'
        >
          No Thanks
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GiveReview;
