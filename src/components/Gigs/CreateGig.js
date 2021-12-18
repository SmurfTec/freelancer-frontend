import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import styles from 'styles/commonStyles';
import useManyInputs from 'hooks/useManyInputs';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { categories, sub_categories } from 'data';
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 700,
  },
  packageColumns: {
    // display: 'grid',
    // gridAutoFlow: 'column',
    // gridAutoColumns: '1fr',
    // margin: '0 auto',
    // border: '1px solid #000',
    display: 'flex',
    flexWrap: 'no-wrap',
    columnGap: 20,
    '& div': {
      flex: 1,
      display: 'flex',
      rowGap: 20,
      flexDirection: 'column',
      '& h6': {
        marginBottom: theme.spacing(2),
        position: 'relative',
        '& span': {
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          position: 'absolute',
          right: '25%',
          left: '25%',
          bottom: 0,
        },
      },
    },
  },
}));

const CreateGig = () => {
  const classes = styles();
  const classes_s = useStyles();
  const [disable, setDisable] = useState(true);
  const [category, setCategory] = useState(categories[0]);
  const [subCategory, setSubCategory] = useState(sub_categories[0]);
  const [custom, setCustom] = useState({
    user: {
      name: {
        fname: '',
        lname: '',
      },
    },
  });

  const initialState = {
    title: '',
    // ^ Package State To be reviewed and need correction,......
    // ^ Couldnot set the sub states of package state......
    package: {
      basic: {
        description: '',
        deliveryTime: '',
        price: '',
      },
      standard: {
        description: '',
        deliveryTime: '',
        price: '',
      },
      premium: {
        description: '',
        deliveryTime: '',
        price: '',
      },
    },
  };
  const [
    inputState,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setInputstate,
  ] = useManyInputs(initialState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`inputState`, inputState);
    resetState();
  };

  const handleCategoryChange = (e, value) => {
    setInputstate((st) => ({
      ...st,
      category: value,
    }));
  };

  const handleAutoComplete = (e, value) => {
    // ^ To be reviewed and need correction......
    const { id } = e.target;
    if (!!value) {
      setInputstate((st) => ({
        ...st,
        [id.split('-')[0]]: value,
      }));
    }
  };

  return (
    <React.Fragment>
      <Navbar user='user' />
      <Container className={`${classes.container} ${classes_s.container}`}>
        <Paper className={classes.paper}>
          <Box sx={{ pt: 3 }}>
            <Typography variant='h4' align='center'>
              Describe your Gig
            </Typography>
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                rowGap: 40,
                flexDirection: 'column',
              }}
            >
              <TextField
                name='title'
                value={inputState.title}
                label='TITLE'
                multiline
                rows={3}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
              />

              <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name}
                id='category'
                data-typeid='category'
                value={inputState.category}
                onChange={handleCategoryChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='SELECT A CATEGORY'
                    variant='outlined'
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
              <Autocomplete
                options={sub_categories}
                getOptionLabel={(option) => option.title}
                id='subCategory'
                value={inputState.subCategory}
                onChange={handleAutoComplete}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='SELECT A SUBCATEGORY'
                    variant='outlined'
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />

              <Typography variant='h5'>Package Details</Typography>

              <div className={classes_s.packageColumns}>
                {/* // * Basic Package info */}
                <div>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    color='textSecondary'
                  >
                    BASIC
                    <span />
                  </Typography>

                  <TextField
                    name='package.basic.description'
                    value={inputState.package.basic.description}
                    label='DESCRIPTION'
                    multiline
                    rows={5}
                    onChange={handleTxtChange}
                    variant='outlined'
                    size='small'
                    type='text'
                  />
                  <TextField
                    name='deliveryTime'
                    value={inputState.package.basic.deliveryTime}
                    label='DELIVERY TIME'
                    onChange={handleTxtChange}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                  <TextField
                    name='price'
                    value={inputState.package.basic.price}
                    label='PRICE'
                    onChange={handleTxtChange}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                </div>
                {/* // * Standard Package info */}
                <div>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    color='textSecondary'
                  >
                    STANDARD
                    <span />
                  </Typography>
                  <TextField
                    name='description'
                    value={inputState.package.standard.description}
                    label='DESCRIPTION'
                    multiline
                    rows={5}
                    onChange={handleTxtChange}
                    variant='outlined'
                    size='small'
                  />
                  <TextField
                    name='deliveryTime'
                    value={inputState.package.standard.deliveryTime}
                    label='DELIVERY TIME'
                    onChange={handleTxtChange}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                  <TextField
                    name='price'
                    value={inputState.package.standard.price}
                    label='PRICE'
                    onChange={handleTxtChange}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                </div>
                {/* // * Premium Package info */}
                <div>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    color='textSecondary'
                  >
                    PREMIUM
                    <span />
                  </Typography>
                  <TextField
                    name='description'
                    value={inputState.package.premium.description}
                    label='DESCRIPTION'
                    multiline
                    rows={5}
                    onChange={handleTxtChange}
                    variant='outlined'
                    size='small'
                  />
                  <TextField
                    name='deliveryTime'
                    value={inputState.package.premium.deliveryTime}
                    label='DELIVERY TIME'
                    onChange={handleTxtChange}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                  <TextField
                    name='price'
                    value={inputState.package.premium.price}
                    label='PRICE'
                    onChange={handleTxtChange}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                </div>
              </div>

              <Button
                variant='contained'
                color='primary'
                type='submit'
                sx={{ mt: 2 }}
              >
                Create
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default CreateGig;
