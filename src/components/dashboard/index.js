import React, { useContext } from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from 'contexts/AuthContext';
import Loading from 'components/common/Loading';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import faker from 'faker';
import Review from 'components/Gigs/GigReview';
import DashboardOrders from './Order';
import { OrdersContext } from 'contexts/OrdersContext';
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
  const { user, token } = useContext(AuthContext);
  const { orders } = useContext(OrdersContext);

  const navigate = useNavigate();
  if (!user) return <Loading noTitle />;

  const handleCreateGig = () => {
    navigate(`/mygigs/create`);
  };

  return (
    <section>
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
                      {orders?.length || 0}
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
                      {orders?.filter((el) => el.status === 'completed')
                        ?.length || 0}
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
                      {orders?.filter((el) => el.status === 'active')?.length ||
                        0}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
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
            {/* <Box
              style={{
                border: '1px solid #ccc',
                marginTop: '2rem',
                padding: 20,
              }}
            >
              <Typography
                variant='h5'
                fontWeight='normal'
                align='center'
                style={{ marginBottom: '1rem' }}
              >
                Reviews
              </Typography> */}
            {/* <Divider /> */}
            {/* {user?.reviews.length > 0 ? (
                user?.reviews?.map((el) => (
                  <React.Fragment key={el._id}>
                    <Review review={el} />
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Typography variant='subtitle1'>No Reviews yet</Typography>
              )}
            </Box> */}
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
              <Typography variant='h5'>
                Active Orders{' '}
                {orders?.filter((el) =>
                  ['active', 'delivered', 'notAccepted'].includes(el.status)
                )?.length || 0}{' '}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }} />
            <DashboardOrders user={user} token={token} />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Dashboard;
