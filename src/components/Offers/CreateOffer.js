import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Box,
  OutlinedInput,
  makeStyles,
} from '@material-ui/core';
import useManyInputs from 'hooks/useManyInputs';
import useToggle from 'hooks/useToggle';
import React from 'react';
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

const CreateOfferDialog = ({ open, toggleDialog, handleCreate }) => {
  const classes = useCommonStyles();
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
    e.preventDefault();

    handleCreate(inputState);
    //  handleCreate(devRequestId, inputState, () => {
    //    toast.success('Offer Sent successfully!');
    //    toggleDialog();
    //  });
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Create an offer</DialogTitle>
      <DialogContent>
        <Box
          className={`${classes_s.paper}`}
          sx={{ borderRadius: 0, boxShadow: 'none' }}
        >
          <form id='form1' onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 20,
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                  gap: 20,
                }}
              >
                <TextField
                  name='expectedDays'
                  value={inputState.expectedDays}
                  label='Delivery Time'
                  onChange={handleTxtChange}
                  variant='outlined'
                  type='number'
                  size='small'
                  required
                  inputProps={{ min: 1 }}
                />

                <FormControl variant='outlined' size='small'>
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
              <TextField
                name='description'
                value={inputState.description}
                label='Description'
                multiline
                rows={5}
                inputProps={{ resize: 'vertical' }}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
                required
              />
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
