import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import useManyInputs from 'hooks/useManyInputs';
import { Autocomplete } from '@material-ui/lab';
import styles from 'styles/commonStyles';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataContext } from 'contexts/DataContext';
import axios from 'axios';
import { API_BASE_URL } from 'utils/makeReq';
import useToggle from 'hooks/useToggle';
import { DevRequestsContext } from 'contexts/DevRequestsContext';
const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 5,
  },
  uploadFile: {
    '& input': {
      display: 'none',
    },
  },
  uploadFileBox: {
    flexDirection: 'row',
    gap: 20,
    /* border: 1px solid #ccc; */
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

const CreateJob = () => {
  const classes = styles();
  const classes_s = useStyles();
  const { user } = useContext(AuthContext);
  const { createDevRequest } = useContext(DevRequestsContext);
  const { categories } = useContext(DataContext);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCats, toggleLoadingSubCats] = useToggle(false);

  const initialState = {
    description: '',
    budget: '',
    expectedDays: '',
    image: '',
  };

  const [image, setImage] = useState();

  const [
    inputState,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setInputstate,
  ] = useManyInputs(initialState);
  const [isSubmitting, toggleSubmitting] = useToggle(false);

  useEffect(() => {
    if (!inputState.category) return;

    fetchSubCategories(inputState.category._id);
  }, [inputState.category]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate(`/login?redirect=/jobs/create`);
  }, [user]);

  const fetchSubCategories = async (id) => {
    toggleLoadingSubCats();
    try {
      const res = await axios.get(
        `${API_BASE_URL}/categories/${id}/subcategories`
      );
      console.log(`res`, res);
      setSubCategories(res.data.subcategories);
    } catch (err) {
      setSubCategories([]);
    } finally {
      toggleLoadingSubCats();
    }
  };

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.includes('image/'))
      return toast.error('Only Image Files are acceptable');

    changeInput('image', e.target.files[0]);

    // * Convert to Base64 because we have to show it here
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async (e) => {
      console.log(`result onLoadEnd`, e.target.result);
      const file = e.target.result;
      console.log(`file`, file);
      setImage(file);
    };

    // * if we dont want to show right now ,then go
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`inputState`, inputState);
    if (!inputState.image) return toast.error('Image is required!');
    toggleSubmitting();

    createDevRequest(
      {
        ...inputState,
        category: inputState.category._id,
        subCategory: inputState.subCategory._id,
      },
      () => {
        resetState();
        toast.success('Success');
        toggleSubmitting();
        setTimeout(() => {
          navigate('/jobs');
        }, 1500);
      }
    );
  };

  return (
    <Box>
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
          <form id='form1' onSubmit={handleSubmit}>
            <Box
              sx={{
                pt: 3,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 20,
              }}
            >
              <Box item xs={12} sm={6}>
                <Typography
                  variant='subtitle2'
                  style={{ marginBottom: '1rem' }}
                >
                  Describe the service you're looking to purchase - please be as
                  detailed as possible:
                </Typography>
                <TextField
                  name='description'
                  value={inputState.description}
                  label="I'm looking for...."
                  multiline
                  rows={5}
                  onChange={handleTxtChange}
                  variant='outlined'
                  fullWidth
                  size='small'
                  required
                />
              </Box>

              <Box
                display='flex'
                justifyContent='space-between'
                flexWrap='wrap'
                style={{ rowGap: 20 }}
              >
                {' '}
                <Autocomplete
                  style={{ flexBasis: '45%', minWidth: 250 }}
                  options={categories}
                  getOptionLabel={(option) => option.title}
                  id='category'
                  value={inputState.category}
                  onChange={(e, newValue) => {
                    changeInput('category', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select a Category'
                      variant='outlined'
                      size='small'
                      required
                      InputProps={{ ...params.InputProps }}
                    />
                  )}
                />
                <Autocomplete
                  style={{ flexBasis: '45%', minWidth: 250 }}
                  options={subCategories}
                  getOptionLabel={(option) => option.title}
                  id='subCategory'
                  value={inputState.subCategory}
                  onChange={(e, newValue) => {
                    changeInput('subCategory', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select a Subcategory'
                      variant='outlined'
                      size='small'
                      required
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
              </Box>
              <Box
                display='flex'
                justifyContent='space-between'
                flexWrap='wrap'
                style={{ gap: 20 }}
              >
                <Box style={{ flexBasis: '45%', minWidth: 250 }}>
                  <Typography variant='subtitle2'>
                    when would you like your service delivered?
                  </Typography>

                  <TextField
                    style={{ marginTop: '1rem' }}
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
                </Box>

                <Box style={{ flexBasis: '45%', minWidth: 250 }}>
                  <Typography variant='subtitle2'>
                    What is your budget for this service?
                  </Typography>

                  <FormControl
                    style={{ marginTop: '1rem' }}
                    fullWidth
                    variant='outlined'
                    size='small'
                  >
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
                      size='small'
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box item xs={12} sm={6} style={{ display: 'flex' }}>
                <div className={classes_s.uploadFile}>
                  <input id='fileuploadBtn' type='file' onChange={uploadFile} />
                </div>
                <Box className={classes_s.uploadFileBox}>
                  <label htmlFor='fileuploadBtn'>
                    <Button
                      variant='contained'
                      color='primary'
                      component='span'
                      endIcon={<Publish />}
                    >
                      Attach Image
                    </Button>
                  </label>{' '}
                  {image && <img src={image} />}
                </Box>
              </Box>
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button
                  type='submit'
                  form='form1'
                  variant='contained'
                  color='primary'
                  align='center'
                  disabled={isSubmitting}
                >
                  Submit Request
                </Button>
                <Button
                  type='submit'
                  form='form1'
                  variant='contained'
                  color='secondary'
                  align='center'
                  onClick={() => navigate(-1)}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateJob;
