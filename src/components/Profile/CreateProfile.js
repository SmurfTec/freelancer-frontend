import React from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Avatar,
  TextField,
  Chip,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'styles/commonStyles';
import { userProfile, countries } from 'data';
import useManyInputs from 'hooks/useManyInputs';
import { Autocomplete } from '@material-ui/lab';

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

  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(userProfile);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`state`, state);
  };

  const chk = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];

  const handleCountryChange = (e, value) => {
    changeInput('country', value);
  };

  const handleSkills = (e, newValue) => {
    const arr = new Set(newValue);
    changeInput('skills', [...arr]);
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
                name='description'
                value={state.description}
                label='DESCRIPTION'
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
                    InputProps={{ ...params.InputProps, type: 'search' }}
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
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default CreateProfile;
