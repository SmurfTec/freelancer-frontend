import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Typography,
  Divider,
  makeStyles,
  Button,
} from '@material-ui/core';
import React, { useContext, useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

import GigCard from 'components/Gigs/GigCard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { months } from 'data';
import { AuthContext } from 'contexts/AuthContext';
import { Chat } from '@material-ui/icons';
import Review from 'components/Gigs/GigReview';

const styles = makeStyles((theme) => ({
  avatarImg: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },

  paper: {
    paddingInline: theme.spacing(3),
    // borderRadius: theme.spacing(2),
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
    paddingTop: theme.spacing(5),
  },
  MoreInfoBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  MoreInfoTitle: {
    display: 'flex',
    gap: 10,
    '& p': {
      fontWeight: 'normal',
    },
  },
}));

const UserProfile = ({ user }) => {
  const { user: loggedUser, deleteGig } = useContext(AuthContext);
  const classes = styles();

  const navigate = useNavigate();

  const handleCreateGig = () => {
    navigate(`/services/create`);
  };

  const isMyProfile = useMemo(() => {
    // console.log(`user._id`, user._id);
    // console.log(`loggedUser._id`, loggedUser._id);
    // console.log(`user?._id === loggedUser?._id`, user?._id === loggedUser?._id);
    return user?._id === loggedUser?._id;
  }, [loggedUser, user]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <Typography
          variant='h5'
          align='center'
          style={{ marginBottom: '1rem' }}
        >
          Profile
        </Typography>
        <Paper className={classes.paper}>
          <Box className={classes.userBox}>
            {isMyProfile && (
              <NavLink to='/profile/create'>
                <IconButton aria-label='delete' className={classes.editBtn}>
                  <EditIcon color='primary' />
                </IconButton>
              </NavLink>
            )}
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
                alt={user.fullName}
                src={
                  user.photo ||
                  `https://ui-avatars.com/api/?rounded=true&name=${user.fullName
                    .split(' ')
                    .join('+')}`
                }
              />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h5'>{user.fullName}</Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                  {user.email}
                </Typography>
              </Box>
              <Box style={{ width: '80%' }}>
                <Divider />
              </Box>
              <Box className={classes.MoreInfoBox}>
                <Box className={classes.MoreInfoTitle}>
                  <LocationOnIcon size='small' />
                  <Typography
                    variant='subtitle1'
                    component='p'
                    fontWeight='normal'
                  >
                    From
                  </Typography>
                </Box>
                <Typography variant='body1'>{user.country}</Typography>
              </Box>
              <Box className={classes.MoreInfoBox}>
                <Box className={classes.MoreInfoTitle}>
                  <PersonIcon size='small' />
                  <Typography
                    variant='subtitle1'
                    component='p'
                    fontWeight='normal'
                  >
                    Member Since
                  </Typography>
                </Box>
                <Typography variant='body1'>
                  {months[new Date(user.createdAt).getMonth()]}{' '}
                  {new Date(user.createdAt).getFullYear()}
                </Typography>
              </Box>
              {!isMyProfile && (
                <Button
                  component={Link}
                  to={`/messages?user=${user._id}`}
                  variant='contained'
                  color='primary'
                  endIcon={<Chat />}
                >
                  Message
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
        <Paper className={classes.paper} style={{ marginTop: '2rem' }}>
          <Box sx={{ py: 2 }}>
            <Typography variant='h5' gutterBottom>
              Description
            </Typography>
            <Box>
              <Typography variant='body1'>{user.about}</Typography>
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
                  {user.skills.length > 0
                    ? user.skills.map((us) => (
                        <span key={us}>
                          {us} <strong> | </strong>{' '}
                        </span>
                      ))
                    : 'You dont have any skills yet!'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography
          variant='h5'
          align='center'
          style={{ marginBottom: '1rem' }}
        >
          Services
        </Typography>
        <Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {isMyProfile
              ? loggedUser.gigs.map((g) => (
                  <GigCard
                    isOwner={isMyProfile}
                    gig={g}
                    key={g._id}
                    deleteGig={deleteGig}
                  />
                ))
              : user.gigs.map((g) => (
                  <GigCard
                    isOwner={isMyProfile}
                    gig={g}
                    key={g._id}
                    deleteGig={deleteGig}
                  />
                ))}
            {user.gigs.length < 5 &&
              isMyProfile &&
              loggedUser.role === 'seller' && (
                <Card
                  style={{
                    width: 230,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                  }}
                >
                  <CardContent>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100%',
                        gap: 10,
                        cursor: 'pointer',
                      }}
                      onClick={handleCreateGig}
                    >
                      <Box
                        style={{
                          color: 'rgb(255, 255, 255)',
                          borderRadius: '50%',
                          backgroundColor: 'rgb(51, 187, 119)',
                          width: 100,
                          textAlign: 'center',
                          height: 100,
                          fontSize: '20p',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2em',
                        }}
                      >
                        {' '}
                        <AddIcon size='large' />
                      </Box>
                      <Typography variant='body1'>
                        Create a new Service
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
          </Box>
        </Box>
        <Box style={{ maxWidth: 500 }}>
          <Typography
            variant='h5'
            fontWeight='normal'
            style={{ marginTop: '2rem', marginBottom: '1rem' }}
          >
            Reviews
          </Typography>
          {/* <Divider /> */}
          {user?.reviews.length > 0 ? (
            user?.reviews?.map((el) => (
              <React.Fragment key={el._id}>
                <Review review={el} />
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant='subtitle1'>
              No Reviews for this user yet
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
