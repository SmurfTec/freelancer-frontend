import React, { useContext, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Avatar,
  TextField,
  Chip,
  Button,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'styles/commonStyles';
import { userProfile, countries } from 'data';
import useManyInputs from 'hooks/useManyInputs';
import { Autocomplete } from '@material-ui/lab';
import { AuthContext } from 'contexts/AuthContext';
import { Save } from '@material-ui/icons';
import { toast } from 'react-toastify';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 700,
  },
  paper: {
    paddingInline: theme.spacing(5),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  avatarImg: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const CreateProfile = () => {
  const classes = styles();
  const classes_s = useStyles();

  const { user, updateMe } = useContext(AuthContext);

  const initialState = {
    fullName: '',
    photo: '',
    email: '',
    country: countries[0],
    about: '',
    skills: [],
    createdAt: new Date(),
  };

  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);

  useEffect(() => {
    if (user) setState(user);
  }, [user]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // * 2nd argument is success callback func ,
    // * will be called if profile successfully updated
    updateMe(state, () => {
      toast.success('Profile Updated Successfully!');
    });

    console.log(`state`, state);
  };

  const handleCountryChange = (e, value) => {
    changeInput('country', value);
  };

  const handleSkills = (e, newValue) => {
    const arr = new Set(newValue);
    changeInput('skills', [...arr]);
  };

  const handleImage = async (e) => {
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          // console.log(`result onLoadEnd`, e.target.result);
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
          // console.log(`res`, res);

          // console.log(`resData`, resData);

          changeInput('photo', uploadedImage);
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      // console.log(`err`, err);
    }
  };

  return (
    <>
      <Navbar user='user' />
      <Container className={`${classes.container} ${classes_s.container}`}>
        <Paper className={`${classes.paper} ${classes_s.paper}`}>
          <Box sx={{ pt: 3 }}>
            <Typography variant='h4' align='center'>
              Profile
            </Typography>
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Box className={classes_s.box}>
              <input
                accept='image/*'
                style={{ display: 'none' }}
                id='contained-button-file'
                onChange={handleImage}
                type='file'
                name='photo'
              />
              <label htmlFor='contained-button-file'>
                {' '}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Avatar
                    className={classes_s.avatarImg}
                    alt={state.fullName}
                    src={state.photo}
                  />
                </Box>
              </label>{' '}
              <TextField
                name='fullName'
                value={state.fullName}
                label='FULL NAME'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
              />
              <TextField
                name='email'
                value={state.email}
                label='EMAIL'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                type='email'
              />
              <TextField
                name='about'
                value={state.about}
                label='About'
                multiline
                rows={6}
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
              />
              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option}
                id='country'
                defaultValue={countries[0]}
                value={state.country}
                onChange={handleCountryChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='SELECT COUNTRY'
                    variant='outlined'
                    InputProps={{ ...params.InputProps }}
                  />
                )}
              />
              <Autocomplete
                multiple
                id='skills'
                options={userProfile.skills}
                // defaultValue={state.skills}
                value={state.skills}
                getOptionLabel={(option) => option}
                // onChange={(event, newValue) => {
                //   setValue([
                //     ...fixedOptions,
                //     ...newValue.filter(
                //       (option) => fixedOptions.indexOf(option) === -1
                //     ),
                //   ]);
                // }}
                freeSolo
                onChange={handleSkills}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant='outlined'
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Skills'
                    placeholder='Skills'
                  />
                )}
              />
            </Box>
            <Box textAlign='right'>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                endIcon={<Save />}
                style={{
                  marginTop: '1rem',
                }}
              >
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default CreateProfile;
