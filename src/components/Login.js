import React, { useState } from 'react';
import { Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { Alert } from 'components/common/Alert';
import FormLayout from 'components/formLayout';
import useManyInputs from 'hooks/useManyInputs';
import { TextField } from '@material-ui/core';
import styles from 'styles/commonStyles';
const Login = () => {
  const classes = styles();
  const initialState = {
    email: '',
    password: '',
  };

  const [
    inputState,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setInputstate,
  ] = useManyInputs(initialState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(`inputState`, inputState);
      resetState();
    } catch (error) {
      setError('Failed to login\n', error);
      setLoading(false);
    }
  };
  return (
    <FormLayout>
      <Typography
        vaiant='subtitle2'
        sx={{ color: 'textSecondary' }}
        gutterBottom
        align='center'
      >
        Welcome Back
      </Typography>
      <section className={classes.wrapper}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            {error !== null && (
              <Grid item xs={12}>
                <Alert severity='error'>{error}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                name='email'
                value={inputState.email}
                label='Email'
                type='email'
                onChange={handleTxtChange}
                variant='outlined'
                fullWidth
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
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} color='inherit' />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Grid>
            <Grid item>
              <Link to='/forgotpassword' variant='body2'>
                Forgot password?
              </Link>
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
            <Link to='/register'>Register new account</Link>
          </Typography>
        </Box>
      </section>
    </FormLayout>
  );
};

export default Login;
