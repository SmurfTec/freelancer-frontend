import React, { useContext, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
} from '@material-ui/core';

import { Link, useNavigate } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import MuiAlert from '@material-ui/lab/Alert';
import FormLayout from 'components/formLayout';
import useManyInputs from 'hooks/useManyInputs';
import styles from 'styles/commonStyles';
import useToggle from 'hooks/useToggle';
import axios from 'axios';
import { API_BASE_URL } from 'utils/makeReq';
import { AuthContext } from 'contexts/AuthContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Register = () => {
  const classes = styles();
  const { signInUser } = useContext(AuthContext);
  const initialState = {
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'buyer',
  };

  // const history = useNavigate();
  const [loading, toggleLoading] = useToggle(false);
  const [error, setError] = useState('');
  const [tabState, setTabState] = useState(0);

  const [
    inputState,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setInputstate,
  ] = useManyInputs(initialState);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log(`inputState`, inputState);
    if (inputState.password.trim().length < 8) {
      return setError('Password should be alteast 8 characters long');
    }
    if (inputState.password !== inputState.passwordConfirm) {
      return setError('Passwords do not match');
    } else {
      try {
        toggleLoading();
        const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
          ...inputState,
        });
        console.log(`res`, res);
        signInUser(res.data.token, res.data.user);

        resetState();
      } catch (error) {
        setError(error.message || 'Something Went Wrong');
      } finally {
        toggleLoading();
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabState(newValue);
    setInputstate((st) => ({
      ...st,
      role: newValue === 0 ? 'buyer' : 'seller',
    }));
  };

  return (
    <FormLayout>
      <div className={classes.separator}> Join as </div>

      <Grid item xs={12}>
        {error !== '' && <Alert severity='error'>{error}</Alert>}
      </Grid>
      <Tabs
        value={tabState}
        onChange={handleTabChange}
        indicatorColor=''
        textColor='primary'
        centered
        className={classes.Tabs}
      >
        <Tab label='Buyer' />
        <Tab label='Seller' />
      </Tabs>

      <section className={classes.wrapper}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                name='fullName'
                value={inputState.fullName}
                label='Full Name'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='email'
                value={inputState.email}
                label='Email'
                type='email'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='password'
                value={inputState.password}
                label='Password'
                type='password'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='passwordConfirm'
                value={inputState.passwordConfirm}
                label='Confirm Password'
                type='password'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
                size='small'
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                size='small'
                variant='contained'
                color='primary'
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} color='inherit' />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box
          sx={{
            mt: 6,
            color: 'primary.main',
          }}
        >
          <Typography variant='subtitle2'>
            <Link to='/login'>Login to account</Link>
          </Typography>
        </Box>
      </section>
    </FormLayout>
  );
};

export default Register;
