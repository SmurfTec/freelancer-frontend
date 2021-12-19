import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
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
import { DataContext } from 'contexts/DataContext';
import useToggle from 'hooks/useToggle';
import axios from 'axios';
import { API_BASE_URL } from 'utils/makeReq';
import { v4 } from 'uuid';
import { AuthContext } from 'contexts/AuthContext';
// import { categories, sub_categories } from 'data';
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
      '& .MuiInputBase-root': {
        paddingLeft: 10,
      },
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
  const { createGig } = useContext(AuthContext);
  const { categories } = useContext(DataContext);
  const classes_s = useStyles();
  const [disable, setDisable] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCats, toggleLoadingSubCats] = useToggle(false);
  // const [category, setCategory] = useState(categories[0]);
  // const [subCategory, setSubCategory] = useState([]);
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
    description: '',
    packages: [
      { name: 'basic', description: '', deliveryTime: '', price: '' },
      { name: 'standard', description: '', deliveryTime: '', price: '' },
      { name: 'premium', description: '', deliveryTime: '', price: '' },
    ],
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
    createGig({
      ...inputState,
      categoryId: inputState.category._id,
      subCategoryId: inputState.subCategory._id,
    });
    // resetState();
  };

  const fetchSubCategories = async (id) => {
    toggleLoadingSubCats();
    try {
      const res = await axios.get(
        `${API_BASE_URL}/categories/${id}/subcategories`
      );
      console.log(`res`, res);
      setSubCategories(res.data.subcategories);
    } catch (err) {
    } finally {
      toggleLoadingSubCats();
    }
  };
  useEffect(() => {
    if (!inputState.category) return;

    fetchSubCategories(inputState.category._id);
  }, [inputState.category]);

  const handleCategoryChange = (e, value) => {
    setInputstate((st) => ({
      ...st,
      category: value,
    }));
  };

  const handlePackageChange = (e, packageName) => {
    console.log(`e.target.name`, e.target.name);
    console.log(`e.target.value`, e.target.value);
    console.log(`packageName`, packageName);
    setInputstate((st) => ({
      ...st,
      packages: st.packages.map((el) =>
        el.name === packageName
          ? { ...el, [e.target.name]: e.target.value }
          : el
      ),
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
                rows={2}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
              />
              <TextField
                name='description'
                value={inputState.description}
                label='DESCRIPTION'
                multiline
                rows={3}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
              />

              <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.title}
                id='category'
                data-typeid='category'
                value={inputState.category}
                onChange={handleCategoryChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='SELECT A CATEGORY'
                    variant='outlined'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingSubCats ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <Autocomplete
                options={subCategories}
                getOptionLabel={(option) => option.title}
                id='subCategory'
                value={inputState.subCategory}
                onChange={handleAutoComplete}
                loading
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='SELECT A SUBCATEGORY'
                    variant='outlined'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingSubCats ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
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
                    Basic
                    <span />
                  </Typography>

                  <TextField
                    name='description'
                    value={inputState.packages[0].description}
                    label='DESCRIPTION'
                    multiline
                    rows={5}
                    onChange={(e) => handlePackageChange(e, 'basic')}
                    variant='outlined'
                    size='small'
                    type='text'
                  />
                  <TextField
                    name='expectedDays'
                    value={inputState.packages[0].expectedDays}
                    label='DELIVERY TIME'
                    onChange={(e) => handlePackageChange(e, 'basic')}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                  <TextField
                    name='price'
                    value={inputState.packages[0].price}
                    label='PRICE'
                    onChange={(e) => handlePackageChange(e, 'basic')}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                </div>
                <div>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    color='textSecondary'
                  >
                    Standard
                    <span />
                  </Typography>

                  <TextField
                    name='description'
                    value={inputState.packages[1].description}
                    label='DESCRIPTION'
                    multiline
                    rows={5}
                    onChange={(e) => handlePackageChange(e, 'standard')}
                    variant='outlined'
                    size='small'
                    type='text'
                  />
                  <TextField
                    name='expectedDays'
                    value={inputState.packages[1].expectedDays}
                    label='DELIVERY TIME'
                    onChange={(e) => handlePackageChange(e, 'standard')}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                  <TextField
                    name='price'
                    value={inputState.packages[1].price}
                    label='PRICE'
                    onChange={(e) => handlePackageChange(e, 'standard')}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                </div>
                <div>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    color='textSecondary'
                  >
                    Premium
                    <span />
                  </Typography>

                  <TextField
                    name='description'
                    value={inputState.packages[2].description}
                    label='DESCRIPTION'
                    multiline
                    rows={5}
                    onChange={(e) => handlePackageChange(e, 'premium')}
                    variant='outlined'
                    size='small'
                    type='text'
                  />
                  <TextField
                    name='expectedDays'
                    value={inputState.packages[2].expectedDays}
                    label='DELIVERY TIME'
                    onChange={(e) => handlePackageChange(e, 'premium')}
                    variant='outlined'
                    type='number'
                    size='small'
                  />
                  <TextField
                    name='price'
                    value={inputState.packages[2].price}
                    label='PRICE'
                    onChange={(e) => handlePackageChange(e, 'premium')}
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
