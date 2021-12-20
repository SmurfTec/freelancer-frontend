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
import { months } from 'data';
import GigCard from 'components/Gigs/GigCard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { AuthContext } from 'contexts/AuthContext';
import Loading from 'components/common/Loading';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import faker from 'faker';
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
    top: 0,
    right: 0,
    position: 'absolute',
    marginTop: 10,
    display: 'flex',
    gap: 5,
    alignItems: 'center',
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

const Dashboard = () => {
  const classes = styles();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  if (!user) return <Loading noTitle />;

  const handleCreateGig = () => {
    navigate(`/mygigs/create`);
  };

  return (
    <section>
      <Navbar user='user' />
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box
              className={classes.paper}
              style={{
                border: '1px solid #ccc',
                backgroundColor: '#fff',
              }}
            >
              <Box className={classes.userBox}>
                <Box aria-label='delete' className={classes.editBtn}>
                  <StarIcon
                    style={{
                      color: '#FFC100',
                    }}
                  />
                  <Typography
                    variant='h5'
                    style={{
                      color: '#FFC100',
                    }}
                    fontWeight='normal'
                  >
                    {user.ratingsAverage}
                  </Typography>
                </Box>

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
                      <Typography
                        variant='subtitle1'
                        component='p'
                        fontWeight='normal'
                      >
                        Total Orders
                      </Typography>
                    </Box>
                    <Typography variant='body1'>
                      {faker.datatype.number({
                        min: 10,
                        max: 1000,
                        precision: 100,
                      })}
                    </Typography>
                  </Box>
                  <Box className={classes.MoreInfoBox}>
                    <Box className={classes.MoreInfoTitle}>
                      <Typography
                        variant='subtitle1'
                        component='p'
                        fontWeight='normal'
                      >
                        Completed Orders
                      </Typography>
                    </Box>
                    <Typography variant='body1'>
                      {faker.datatype.number({
                        min: 10,
                        max: 1000,
                        precision: 100,
                      })}
                    </Typography>
                  </Box>
                  <Box className={classes.MoreInfoBox}>
                    <Box className={classes.MoreInfoTitle}>
                      <Typography
                        variant='subtitle1'
                        component='p'
                        fontWeight='normal'
                      >
                        Active Orders
                      </Typography>
                    </Box>
                    <Typography variant='body1'>
                      {faker.datatype.number({
                        min: 10,
                        max: 100,
                        precision: 10,
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              className={classes.Paper}
              style={{
                padding: 20,
                border: '1px solid #ccc',
                backgroundColor: '#fff',
              }}
            >
              <Typography variant='h5'>Active Orders 10 </Typography>
            </Box>

            <Box sx={{ mt: 4 }} />
            {Array(5)
              .fill()
              .map((el) => (
                <>
                  {/* <Box
                    display='flex'
                    justifyContent='space-around'
                    alignItems='center'
                    style={{
                      border: '3px solid #f3f3f3',
                      minHeight: '8rem',
                      padding: '0.5rem',
                      margin: '1rem',
                    }}
                  >
                    <Avatar
                      src={`https://ui-avatars.com/api/?rounded=true&name=${faker.name
                        .findName()
                        .split(' ')
                        .join('+')}`}
                      alt={'asda'}
                      style={{ minWidth: '5rem', minHeight: '5rem' }}
                    />
                    <Typography varaint='h5'>
                      {faker.name.findName}
                    </Typography>
                    <Box>
                      <Typography
                        variant='h5'
                        style={{
                          color: '#8c8c8c',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Deadline
                      </Typography>
                      <Typography variant='h6'>
                        {new Date(faker.date.soon()).toDateString()}
                      </Typography>
                    </Box> */}

                  {/* <Paper
                    className={classes.Paper}
                    style={{
                      padding: 20,
                      border: '1px solid #ccc',
                      backgroundColor: '#fff',
                      marginBottom: '2rem',
                    }}
                  >
                    <Box>
                      <Avatar
                        src={`https://ui-avatars.com/api/?rounded=true&name=${faker.name
                          .findName()
                          .split(' ')
                          .join('+')}`}
                      ></Avatar>
                      <Typography variant='h5'>
                        {faker.name.findName()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='h5'>
                        {new Date(faker.date.soon()).toDateString()}
                      </Typography>
                      <Typography variant='h5'>Deadline</Typography>
                    </Box>
                  </Paper> */}
                  {/* </Box> */}
                </>
              ))}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Dashboard;
