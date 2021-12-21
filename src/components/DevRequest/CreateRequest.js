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
  CircularProgress,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React, { useContext, useEffect, useState } from 'react';
import useManyInputs from 'hooks/useManyInputs';
import { Autocomplete } from '@material-ui/lab';
import { categories, sub_categories } from 'data';
import styles from 'styles/commonStyles';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
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

const DevRequest = () => {
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

  useEffect(() => {
    if (!inputState.category) return;

    fetchSubCategories(inputState.category._id);
  }, [inputState.category]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate(`/login?redirect=/devRequests/create`);
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

    createDevRequest(
      {
        ...inputState,
        category: inputState.category._id,
        subCategory: inputState.subCategory._id,
      },
      () => {
        resetState();
        toast.success('Success');
        setTimeout(() => {
          navigate('/devRequests');
        }, 1500);
      }
    );
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
          <form id='form1' onSubmit={handleSubmit}>
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
                name='description'
                value={inputState.description}
                label="I'm looking for...."
                multiline
                rows={3}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
                required
              />

              <div className={classes_s.uploadFile}>
                <input id='fileuploadBtn' type='file' onChange={uploadFile} />
              </div>
              <Box className={classes_s.uploadFileBox}>
                <label htmlFor='fileuploadBtn'>
                  <Button variant='contained' color='primary' component='span'>
                    Attach Image
                  </Button>
                </label>
                {image && <img src={image} />}
              </Box>

              <Box sx={{ mt: 3 }}>
                <Autocomplete
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
              </Box>
              <Box sx={{ mt: 2 }}>
                <Autocomplete
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

              <Box sx={{ mt: 2 }}>
                <Typography variant='subtitle2'>
                  Once you place your order, when would you like your service
                  delivered?
                </Typography>
              </Box>

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
                    <InputAdornment position='start'>USD</InputAdornment>
                  }
                  required
                  inputProps={{ min: 0 }}
                  labelWidth={60}
                />
              </FormControl>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  type='submit'
                  form='form1'
                  variant='contained'
                  color='primary'
                  align='center'
                >
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
