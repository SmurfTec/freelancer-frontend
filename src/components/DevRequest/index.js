import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React, { useState } from 'react';
import useManyInputs from 'hooks/useManyInputs';
import { Autocomplete } from '@material-ui/lab';
import { categories, sub_categories } from 'data';
import styles from 'styles/commonStyles';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 5,
  },
  uploadFile: {
    '& input': {
      display: 'none',
    },
  },
  marginBetween: {
    marginBlock: theme.spacing(2),
  },
}));

const DevRequest = () => {
  const classes = styles();
  const classes_s = useStyles();
  const [category, setCategory] = useState(categories[0]);
  const [subCategory, setSubCategory] = useState(sub_categories[0]);

  const initialState = {
    reqDesc: '',
    budget: '',
    budget: '',
  };

  const [
    inputState,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setInputstate,
  ] = useManyInputs(initialState);

  const uploadFile = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`inputState`, inputState);
  };

  return (
    <Box>
      <Navbar />
      <Container className={classes.container}>
        <Box className={classes_s.marginBetween}>
          <Typography variant='h3'>
            What Service are you looking for ?
          </Typography>
        </Box>

        <Paper
          className={`${classes.paper} ${classes_s.paper} ${classes_s.marginBetween}`}
          sx={{ borderRadius: 0 }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                pt: 3,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 20,
              }}
            >
              <Typography variant='subtitle2'>
                Describe the service you're looking to purchase - please be as
                detailed as possible:
              </Typography>
              <TextField
                name='reqDesc'
                value={inputState.reqDesc}
                label="I'm looking for...."
                multiline
                rows={3}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
              />

              <div className={classes_s.uploadFile}>
                <input id='fileuploadBtn' type='file' onChange={uploadFile} />
              </div>
              <label htmlFor='fileuploadBtn'>
                <Button variant='contained' color='primary' component='span'>
                  Attach Files
                </Button>
              </label>

              <Box sx={{ mt: 3 }}>
                <Autocomplete
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  id='category'
                  value={category}
                  onChange={(e, newValue) => {
                    setCategory(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select a Category'
                      variant='outlined'
                      size='small'
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Autocomplete
                  options={sub_categories}
                  getOptionLabel={(option) => option.title}
                  id='subCategory'
                  value={subCategory}
                  onChange={(e, newValue) => {
                    setSubCategory(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select a Subcategory'
                      variant='outlined'
                      size='small'
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant='subtitle2'>
                  Once you place your order, when would you like your service
                  delivered?
                </Typography>
              </Box>

              <TextField
                name='deliveryTime'
                value={inputState.deliveryTime}
                label='Delivery Time'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                type='number'
                size='small'
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant='subtitle2'>
                  What is your budget for this service?
                </Typography>
              </Box>

              <FormControl fullWidth variant='outlined'>
                <InputLabel htmlFor='budget'>Budget</InputLabel>
                <OutlinedInput
                  id='budget'
                  name='budget'
                  type='number'
                  value={inputState.budget}
                  onChange={handleTxtChange}
                  startAdornment={
                    <InputAdornment position='start'>PKR</InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant='contained' color='primary' align='center'>
                  Submit Request
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default DevRequest;
