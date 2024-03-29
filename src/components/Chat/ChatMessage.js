import React from 'react';
import {
  Avatar,
  Box,
  Grid,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import clsx from 'clsx';

const ChatMessage = ({ classes, user, isMyMsg, message, handleOffer }) => {
  const msgTime = new Date(message.createdAt).toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  let msgDate = new Date(message.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <ListItem component={Box} className={classes.messageBox}>
      {isMyMsg(message) === false && (
        <ListItemIcon>
          <Avatar
            alt={user?.fullName}
            src={`https://ui-avatars.com/api/?rounded=true&name=${message.sender.fullName
              ?.split(' ')
              .join('+')}`}
            style={{
              height: 35,
              width: 35,
            }}
          />
        </ListItemIcon>
      )}
      <Grid
        container
        className={clsx({
          // classes.drawer is applied always
          [classes.message]: !message.isOffer || message.isOffer === false, // classes.drawerOpen is applied always, bool = true
          [classes.agreementMessage]: message.isOffer === true, // classes.drawerOpen is applied always, bool = true
          [classes.myMessage]: isMyMsg(message) === true, // classes.drawerOpen is applied always, bool = true
          [classes.otherMessage]: isMyMsg(message) === false, // you can also use boolean variable
        })}
      >
        {isMyMsg(message) === true ? (
          message.isOffer && message.offer ? (
            <Grid item xs={12}>
              <Typography
              // style={{
              //   fontSize: 18,
              // }}
              >
                Here's your custom Offer
              </Typography>
              <Tooltip title={`${msgDate}, ${msgTime}`}>
                <Box className={classes.Agreement}>
                  <Box className={classes.AgreementHeader}>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {message.offer.description}
                    </Typography>
                    <Typography
                      variant='h3'
                      style={{
                        minWidth: 'fit-content',
                      }}
                    >
                      $ {message.offer.budget}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}
                  >
                    <Typography
                      // variant='h6'
                      component='span'
                      style={{
                        color:
                          message.offer.status === 'pending'
                            ? 'orange'
                            : message.offer.status === 'accepted'
                            ? 'green'
                            : 'red',
                        textTransform: 'Capitalize',
                      }}
                    >
                      <b>{message.offer.status}</b>
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
              {/* <Box mt={1}>
                <ListItemText
                  align={'right'}
                  secondary={`${msgDate}, ${msgTime}`}
                />
              </Box> */}
              <div className={`${classes.messageTime} ${classes.myTime}`}>
                {/* <ListItemText secondary={`${msgDate}, ${msgTime}`} /> */}
                <ListItemText secondary={`${msgTime.split(' ')[0]}`} />
              </div>

              {/* <Box
                              style={{
                                backgroundColor: '#fff',
                                border: '1px solid black',
                                padding: 10,
                              }}
                            >
                              <Typography variant='h5'>Agreement</Typography>
                              <Typography variant='h5'>
                                <b>Description :</b>{' '}
                                {message.offer.description}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Cost :</b> {message.offer.cost}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Days :</b> {message.offer.days}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Sent at :</b>{' '}
                                {new Date(
                                  message.offer.createdAt
                                ).toLocaleString()}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Status :</b> {message.offer.status}
                              </Typography>
                            </Box> */}
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <Tooltip title={`${msgDate}, ${msgTime}`}>
                  <ListItemText align={'right'} primary={message.text} />
                </Tooltip>
              </Grid>
              <div className={`${classes.messageTime} ${classes.myTime}`}>
                {/* <ListItemText secondary={`${msgDate}, ${msgTime}`} /> */}
                <ListItemText secondary={`${msgTime.split(' ')[0]}`} />
              </div>
            </>
          )
        ) : message.isOffer && message.offer ? (
          <Grid item xs={12}>
            <Typography
              style={{
                fontSize: 18,
              }}
            >
              Agreement
            </Typography>

            <Box className={classes.Agreement}>
              <Box className={classes.AgreementHeader}>
                <Typography variant='h6' fontWeight='bold'>
                  {message.offer.description}
                </Typography>
                <Typography variant='h6'>$ {message.offer.budget}</Typography>
              </Box>
              {/* <Box className={classes.AgreementExpansion}>
                              <Typography variant='subtitle'>
                              {message.offer.days}
                              <b>Days :</b>
                              </Typography>
                            </Box> */}
              {message.offer.status === 'pending' ? (
                <Box
                  style={{
                    padding: 10,
                    display: 'flex',
                    gap: 10,
                  }}
                >
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: 'green',
                      color: '#fff',
                    }}
                    onClick={() =>
                      handleOffer('accepted', message.offer, message._id)
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: 'red',
                      color: '#fff',
                    }}
                    onClick={() =>
                      handleOffer('rejected', message.offer, message._id)
                    }
                  >
                    Reject
                  </Button>
                </Box>
              ) : (
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingInline: 10,
                  }}
                >
                  <Typography
                    // variant='h6'
                    component='span'
                    style={{
                      color:
                        message.offer.status === 'pending'
                          ? 'orange'
                          : message.offer.status === 'accepted'
                          ? 'green'
                          : 'red',
                      textTransform: 'Capitalize',
                    }}
                  >
                    <b>{message.offer.status}</b>
                  </Typography>
                  {/* <Typography
                    variant='subtitle2'
                    style={{
                      marginLeft: 'auto',
                      textAlign: 'right',
                    }}
                    >
                    {new Date(message.offer.createdAt).toLocaleTimeString()}
                  </Typography> */}
                </Box>
              )}
            </Box>
            {/* <Box mt={1}>
              <ListItemText
                align={'right'}
                secondary={`${msgDate}, ${msgTime}`}
              />
            </Box> */}
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Tooltip title={`${msgDate}, ${msgTime}`}>
                <ListItemText align={'left'} primary={`${message.text} fff`} />
              </Tooltip>
            </Grid>
            <div className={`${classes.messageTime} ${classes.otherTime}`}>
              <ListItemText secondary={`${msgTime.split(' ')[0]}`} />
            </div>
            {/* <Grid item xs={12}>
              <Box mt={1} sx={{ color: '#fff' }}>
                <ListItemText secondary={`${msgDate}, ${msgTime}`} />
              </Box>
            </Grid> */}
          </>
        )}
      </Grid>
      {isMyMsg(message) === true && (
        <ListItemIcon>
          <Avatar
            alt='Remy Sharp'
            src={`https://ui-avatars.com/api/?rounded=true&name=${user?.fullName
              .split(' ')
              .join('+')}`}
            style={{
              height: 35,
              width: 35,
            }}
          />
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default ChatMessage;
