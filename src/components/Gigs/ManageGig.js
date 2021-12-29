import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
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
import { useNavigate, useParams } from 'react-router-dom';
import { Add, HighlightOff } from '@material-ui/icons';
import { toast } from 'react-toastify';
// import { categories, sub_categories } from 'data';
import LoadingOverlay from 'react-loading-overlay';

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

const CreateGig = ({ isUpdate }) => {
  const classes = styles();
  const { createGig, updateGig, user } = useContext(AuthContext);
  const { categories } = useContext(DataContext);
  const classes_s = useStyles();
  const [disable, setDisable] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCats, toggleLoadingSubCats] = useToggle(false);
  // const [category, setCategory] = useState(categories[0]);
  // const [subCategory, setSubCategory] = useState([]);
  const [isImageUploading, toggleImageUploading] = useToggle(false);
  const [uploadingText, setUploadingText] = useState('Uploading Image...');

  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const initialState = {
    title: '',
    description: '',
    packages: [
      { name: 'basic', description: '', deliveryTime: '', price: '' },
      { name: 'standard', description: '', deliveryTime: '', price: '' },
      { name: 'premium', description: '', deliveryTime: '', price: '' },
    ],
    images: [],
    category: '',
    subCategory: '',
  };

  useEffect(() => {
    let gig = user.gigs.find((el) => el._id === id);
    if (gig) {
      setInputstate(gig);
    }
  }, [id]);

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
    if (!inputState.images.length)
      return toast.error('Service must contain atleast 1 image!');
    if (isUpdate)
      updateGig(id, {
        ...inputState,
        category: inputState.category._id,
        subCategory: inputState.subCategory._id,
      });
    else
      createGig({
        ...inputState,
        category: inputState.category._id,
        subCategory: inputState.subCategory._id,
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

  const handleImageUpload = async (e, toggleFunc, cb) => {
    setUploadingText('Uploading Image ...');
    toggleFunc();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          //console.log(`result onLoadEnd`, e.target.result);
          const file = e.target.result;

          // TODO  Delete Image from cloudinary if it exists on this user

          // // * 1 Upload Image on Cloudinary
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const uploadedImage = res.data.url;
          console.log(`res`, res);

          setUploadingText('Updating Logo ...');

          cb(uploadedImage);
          toggleFunc();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      console.log(`err`, err);
    }
  };

  const filterImage = (e) => {
    const { img } = e.currentTarget.dataset;
    setInputstate((st) => ({
      ...st,
      images: st.images.filter((el) => el !== img),
    }));
  };

  return (
    <React.Fragment>
      <Container className={`${classes.container} ${classes_s.container}`}>
        <Paper className={classes.paper}>
          <Box sx={{ pt: 3 }}>
            <Typography variant='h4' align='center'>
              Describe your Service
            </Typography>
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                rowGap: 20,
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

              <Box
                display='flex'
                justifyContent='space-between'
                flexWrap='wrap'
                style={{ rowGap: 20 }}
              >
                <Autocomplete
                  style={{ flexBasis: '45%', minWidth: 250 }}
                  options={categories}
                  getOptionLabel={(option) => option.title}
                  id='category'
                  data-typeid='category'
                  value={inputState.category}
                  onChange={(e, newValue) => {
                    changeInput('category', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='SELECT A CATEGORY'
                      variant='outlined'
                      InputProps={{
                        ...params.InputProps,
                      }}
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
              </Box>

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

              <input
                accept='image/*'
                style={{ display: 'none' }}
                id='image'
                multiple
                type='file'
                onChange={(e) =>
                  handleImageUpload(e, toggleImageUploading, (img) => {
                    setInputstate((st) => ({
                      ...st,
                      images: [...st.images, img],
                    }));
                  })
                }
              />
              <Box>
                <label htmlFor='image' style={{ width: 'fit-content' }}>
                  {/* <LoadingOverlay
                    active={isImageUploading}
                    spinner
                    text={uploadingText}
                  > */}
                  <Box
                    style={{
                      marginBottom: '1rem',
                      display: 'flex',
                      gap: 10,
                      background: theme.palette.primary.main,
                      width: 'fit-content',
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    {' '}
                    <Add style={{ color: '#fff' }} />
                    <Typography style={{ color: '#fff' }}>Add Image</Typography>
                  </Box>
                  {/* </LoadingOverlay> */}
                </label>

                <Box
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 20,
                  }}
                >
                  {inputState.images.map((el) => (
                    <Box
                      key={el}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                      }}
                    >
                      <img src={el} style={{ width: 100, height: 70 }} />
                      <HighlightOff
                        data-img={el}
                        onClick={filterImage}
                        color='error'
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  sx={{ mt: 2 }}
                >
                  {isUpdate ? 'Update' : 'Create'}
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{ mt: 2 }}
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
    </React.Fragment>
  );
};

export default CreateGig;
