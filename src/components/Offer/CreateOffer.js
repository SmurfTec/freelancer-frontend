import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Box,
  OutlinedInput,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { OffersContext } from 'contexts/OffersContext';
import useManyInputs from 'hooks/useManyInputs';
import useToggle from 'hooks/useToggle';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import useCommonStyles from 'styles/commonStyles';

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

const CreateOfferDialog = ({ open, toggleDialog, devRequestId }) => {
  const classes = useCommonStyles();
  const { createOffer } = useContext(OffersContext);
  const classes_s = useStyles();
  const initialState = {
    description: '',
    budget: '',
    expectedDays: '',
  };

  const [isSubmitting, toggleSubmitting] = useToggle(false);

  const [
    inputState,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setInputstate,
  ] = useManyInputs(initialState);

  const handleSubmit = (e) => {
    createOffer(devRequestId, inputState, () => {
      toast.success('Offer Sent successfully!');
      toggleDialog();
    });
    e.preventDefault();
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Create an offer</DialogTitle>
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
                name='description'
                value={inputState.description}
                label='Description'
                multiline
                rows={3}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
                required
              />

              <TextField
                name='expectedDays'
                value={inputState.expectedDays}
                label='Delivery Time'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                type='number'
                size='small'
                required
                inputProps={{ min: 1 }}
              />

              <FormControl fullWidth variant='outlined'>
                <InputLabel htmlFor='budget'>Budget</InputLabel>
                <OutlinedInput
                  id='budget'
                  name='budget'
                  type='number'
                  value={inputState.budget}
                  onChange={handleTxtChange}
                  startAdornment={
                    <InputAdornment position='start'>USD</InputAdornment>
                  }
                  required
                  inputProps={{ min: 0 }}
                  labelWidth={60}
                />
              </FormControl>
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isSubmitting}
          form='form1'
          type='submit'
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
        <Button
          onClick={toggleDialog}
          form='form'
          type='submit'
          variant='contained'
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOfferDialog;
