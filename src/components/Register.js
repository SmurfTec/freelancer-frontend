import React, { useState } from 'react';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Register = () => {
  const classes = styles();
  const initialState = {
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'buyer',
  };

  // const history = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    console.log(`inputState`, inputState);
    resetState();
    // if (password.trim().length < 8) {
    //   return setError('Password should be alteast 8 characters long');
    // }
    // if (password !== confirmpassword) {
    //   return setError('Password do not match');
    // } else {
    //   try {
    //     setLoading(true);
    //     await signUp(email, password);
    //     history.push('/');
    //   } catch (error) {
    //     setError(error.message);
    //     setLoading(false);
    //   }
    // }
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
              {error !== '' && <Alert severity='error'>{error}</Alert>}
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
