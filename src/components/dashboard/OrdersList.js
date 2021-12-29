import React, { useState, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { v4 } from 'uuid';

import Countdown from 'components/common/CountDown';
import { Avatar, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const OrdersList = ({ data, loading }) => {
  const navigate = useNavigate();
  return (
    <>
      {loading
        ? Array(5)
            .fill()
            .map(() => <Skeleton key={v4()} variant='rect' />)
        : data?.map((order) => (
            <Box
              key={order._id}
              display='flex'
              justifyContent='space-around'
              alignItems='center'
              style={{
                border: '3px solid #f3f3f3',
                minHeight: '8rem',
                padding: '0.5rem',
                margin: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Avatar
                src={
                  order.seller.photo ||
                  `https://ui-avatars.com/api/?rounded=true&name=${order.seller.fullName
                    .split(' ')
                    .join('+')}`
                }
                alt={'asda'}
                style={{ minWidth: '2rem', minHeight: '2rem', marginRight: 10 }}
              />
              <Typography varaint='h5'>{order.seller.fullName}</Typography>
              <Box>
                <Typography
                  variant='h5'
                  align='center'
                  style={{
                    color: '#8c8c8c',
                    marginBottom: '0.5rem',
                  }}
                >
                  Deadline
                </Typography>
                <Countdown deadline={new Date(order.deadline)} />
                {/* <Typography variant='h6'>
                  {new Date(order.deadline).toDateString()}
                </Typography> */}
              </Box>
              <Button
                variant='contained'
                color='primary'
                onClick={() => navigate(`/orders/${order._id}`)}
                style={{
                  flexBasis: '21%',
                  marginLeft: 'auto',
                }}
              >
                View
              </Button>
            </Box>
          ))}
    </>
  );
};

export default OrdersList;
