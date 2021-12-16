import React from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  Divider,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from 'components/common/Navbar';
import EditIcon from '@material-ui/icons/Edit';
import { userProfile, gigs } from 'data';
import GigCard from 'components/Gigs/GigCard';

const styles = makeStyles((theme) => ({
  avatarImg: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  paper: {
    paddingInline: theme.spacing(3),
    borderRadius: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  editBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 10,
  },
  userBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    paddingBlock: theme.spacing(5),
  },
}));

const handleClick = () => {
  //    history.push(`/tours/details/${_id}`);
};

const ModifyProfile = () => {
  const classes = styles();
  return (
    <section>
      <Navbar />
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Box className={classes.userBox}>
                <IconButton aria-label='delete' className={classes.editBtn}>
                  <EditIcon />
                </IconButton>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: 15,
                  }}
                >
                  <Avatar
                    className={classes.avatarImg}
                    alt={userProfile.fullName}
                    src={userProfile.userImg}
                  />
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h5'>{userProfile.fullName}</Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                      {userProfile.email}
                    </Typography>
                    <Typography variant='subtitle2'>
                      ( {userProfile.country} )
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Divider />
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant='h5'>Description</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant='body1'>
                    {userProfile.description}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Divider />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant='h5'>Skills</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant='body1'>
                      {userProfile.skills &&
                        userProfile.skills.map((us) => (
                          <span>
                            {us} <strong> | </strong>{' '}
                          </span>
                        ))}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <Box
                sx={{ pt: 5, display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant='h4'>YOUR GIGS</Typography>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.createGigBtn}
                >
                  Create New Gig
                </Button>
              </Box>

              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap' }}>
                {gigs && gigs.map((g) => <GigCard {...g} />)}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default ModifyProfile;
