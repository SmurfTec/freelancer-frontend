import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Avatar,
  TextField,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import useTextInput from 'hooks/useTextInput';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import uuid from 'uuid/dist/v4';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {},
  DialogContent: {},
  reviewBox: { display: 'flex', alignItems: 'center' },
  Title: {
    // width: '300px',
    '& h2': {
      fontFamily: 'sans-serif',
    },
  },
  List: {
    '& span': {
      fontFamily: 'sans-serif',
    },
  },
});

const CreateReview = ({ open, toggleDialog, handleCreate }) => {
  const [review, handleChange, resetReview] = useTextInput('');

  const [rating, setRating] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate({ review, rating });
    resetReview();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Give Review</DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <form id='myform' onSubmit={handleSubmit}>
          <Box>
            <Box className={classes.reviewBox}>
              <Rating
                name='hover-feedback'
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {rating !== null && (
                <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
              )}
            </Box>
            <TextField
              variant='outlined'
              value={review}
              onChange={handleChange}
              multiline
              minRows={4}
              required
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          size='small'
          variant='contained'
          color='primary'
          startIcon={<CheckIcon />}
          type='submit'
          form='myform'
        >
          Confirm
        </Button>
        <Button
          size='small'
          variant='contained'
          color='secondary'
          onClick={toggleDialog}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateReview;
