import React, { useContext } from 'react';
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
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from 'components/common/Navbar';
import EditIcon from '@material-ui/icons/Edit';
import { user, gigs } from 'data';
import GigCard from 'components/Gigs/GigCard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { Icon } from '@material-ui/core';
import { AuthContext } from 'contexts/AuthContext';
import Loading from 'components/common/Loading';

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
    paddingBlock: theme.spacing(5),
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

const handleClick = () => {
  //    history.push(`/tours/details/${_id}`);
};

const handleCreateGig = () => {
  //    history.push(`/gigs/create`);
};

const ModifyProfile = () => {
  const classes = styles();
  const { user } = useContext(AuthContext);

  if (!user) return <Loading noTitle />;

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
                        fontweight='normal'
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
                        fontweight='normal'
                      >
                        Member Since
                      </Typography>
                    </Box>
                    <Typography variant='body1'>
                      {new Date(user.createdAt).toDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
            <Paper className={classes.paper} style={{ marginTop: '2rem' }}>
              <Box sx={{ py: 2 }}>
                <Typography variant='h5' gutterBottom>
                  Description
                </Typography>
                <Box>
                  <Typography variant='body1'>{user.description}</Typography>
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
                            <span>
                              {us} <strong> | </strong>{' '}
                            </span>
                          ))
                        : 'You dont have any skill yet !'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {user.gigs.map((g) => (
                <GigCard {...g} />
              ))}
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
                    <Typography variant='body1'>Create a new Gig</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default ModifyProfile;
