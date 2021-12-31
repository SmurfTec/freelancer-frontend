import React, { useState, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { v4 } from 'uuid';

import Countdown from 'components/common/CountDown';
import { Avatar, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import UserAvatar from 'components/common/UserAvatar';
import { Message } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #ccc',
    minHeight: '8rem',
    padding: '0.5rem',
    flexWrap: 'wrap',
    margin: 0,
    marginBottom: '1rem',
    display: 'flex',
    // alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
}));

const OrdersList = ({ data, loading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
      {loading
        ? Array(5)
            .fill()
            .map(() => (
              <Skeleton
                key={v4()}
                variant='rect'
                height={140}
                width={540}
                style={{ marginBottom: '1rem' }}
              />
            ))
        : data?.map((order) => (
            <Box key={order._id} className={classes.root}>
              <UserAvatar
                user={order.seller}
                photoKey='photo'
                nameKey='fullName'
                width={40}
                height={40}
                styles={{
                  marginRight: 10,
                  marginTop: 10,
                }}
              />
              <Box>
                <Typography
                  varaint='h5'
                  component={Link}
                  to={`/users/${order.seller._id}`}
                  gutterBottom
                >
                  {order.seller.fullName}
                </Typography>
                <Typography component='h5' varaint='body1'>
                  {order.offer.description}
                </Typography>
              </Box>

              <Box
                style={{
                  marginLeft: 'auto',
                }}
              >
                {new Date(order.deadline) >= new Date() ? (
                  <Countdown deadline={new Date(order.deadline)} />
                ) : (
                  <Typography
                    style={{
                      paddingBottom: 20,
                    }}
                    color='error'
                    variant='body2'
                  >
                    Late: {new Date(order.deadline).toDateString()}
                  </Typography>
                )}
              </Box>

              <Box textAlign='right' flexBasis='100%'>
                <Button
                  size='small'
                  variant='contained'
                  color='primary'
                  endIcon={<Message />}
                  style={{ marginRight: 10 }}
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  Chat
                </Button>
                <Button
                  size='small'
                  variant='contained'
                  color='info'
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  View
                </Button>
              </Box>
            </Box>
          ))}
    </>
  );
};

export default OrdersList;
