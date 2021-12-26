import React, { useContext, useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Add from '@material-ui/icons/Add';
import { Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { SocketContext } from 'contexts/SocketContext';
import v4 from 'uuid/dist/v4';
import clsx from 'clsx';
import useTextInput from 'hooks/useTextInput';
import useToggleInput from 'hooks/useToggle';
import { AuthContext } from 'contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { makeReq } from 'utils/makeReq';
import CreateOfferDialog from 'components/Offers/CreateOffer';
// import AddGameToAgreement from '../../screens/dashboard/modals/AddGameToAgreement';
// import CreateAgreement from '../../screens/dashboard/modals/CreateAgreement';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    // height: '80vh',
    boxShadow: 'unset',
    // padding: 20,
    background: '#f2f2f2',
    // color: '#fff',
    border: '1px solid #ccc',
    '& .MuiTypography-colorTextSecondary': {
      color: '#fff',
    },
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    background: 'dodgerblue',
  },
  searchField: {
    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  },
  messageArea: {
    height: '65vh',
    overflowY: 'auto',
    paddingInline: 20,
  },
  messageBox: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: 20,
    padding: 0,
  },
  message: {
    // width: '50%',
    // marginLeft: 'auto',
    color: '#4d4d4d',
    width: 'fit-content',
    background: '#f2f2f2',
    borderRadius: 20,
    marginBottom: '1rem',
    padding: 10,
    paddingTop: 0,
    '& p': {
      fontSize: 14,
      color: '#000',
    },
    '& .MuiListItemText-secondary': {
      fontSize: 14,
      color: '#000',
    },
  },

  agreementMessage: {
    width: '50%',
    // marginLeft: 'auto',
    color: '#4d4d4d',
    borderRadius: 20,
    marginBottom: '1rem',
    padding: 10,
    paddingTop: 0,
    '& p': {
      fontSize: 14,
      color: '#000',
    },
    '& .MuiListItemText-secondary': {
      fontSize: 14,
      color: '#000',
    },
  },

  myMessage: {
    marginLeft: 'auto',
  },
  otherMessage: {
    marginRight: 'auto',
  },
  Agreement: {
    backgroundColor: '#fff',
    border: '1px solid black',
    // padding: 10,
    minWidth: 450,
  },
  AgreementHeader: {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiTypography-root': {
      fontWeight: 'bold',
    },
  },
  AgreementExpansion: {},
});

const Chat = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const {
    chats,
    sendNewMessage,
    updateOfferMessage,
    loadingChatId,
    addNewChat,
    sendNewOffer,
  } = useContext(SocketContext);
  const [messageTxt, handleTxtChange, resetMessageTxt] = useTextInput('');
  const [sendOfferOpen, toggleSendOffer] = useToggleInput(false);

  const [offer, setOffer] = useState(null);

  const [currentOfferUser, setCurrentOfferUser] = useState(null);
  const [acceptOfferState, setAcceptOfferState] = useState(null);
  const [activeChat, setActiveChat] = useState();

  const location = useLocation();

  useEffect(() => {
    (async () => {
      let newMessageUser = location.search && location.search.split('=')[1];
      console.log(`newMessageUser`, newMessageUser);

      if (!newMessageUser) return;

      // * Find Chat in the chats
      let chat = chats.find(
        (el) => !!el.participants.find((p) => p._id === newMessageUser)
      );

      console.log(`chat`, chat);

      if (!chat) {
        // * Create New Chat
        const resData = await makeReq(
          `/chats`,
          {
            body: {
              receiver: newMessageUser,
            },
          },
          'POST'
        );
        console.log(`resData`, resData);
        addNewChat(resData.chat);
      }
    })();
  }, [location.search]);

  const handleCreateOffer = (inputState) => {
    console.log(`inputState`, inputState);
    let targetUser =
      isMe(activeChat) === true
        ? activeChat.participants?.[1]._id
        : activeChat.participants?.[0]._id;

    console.log(`targetUser`, targetUser);

    sendNewOffer(inputState, activeChat._id, targetUser);
    toggleSendOffer();
  };

  const handleOffer = async (status, msgOffer, messageId) => {
    console.log(`status`, status);
    console.log(`messageId`, messageId);
    if (status === 'rejected') {
      // * reject msgOffer
      updateOfferMessage(
        msgOffer,
        activeChat._id,
        user._id,
        'rejected',
        messageId
      );
    } else {
      updateOfferMessage(
        msgOffer,
        activeChat._id,
        user._id,
        'accepted',
        messageId
      );
      // setAcceptOfferState({
      //   msgOffer,
      //   chatId: activeChat._id,
      //   userId: user._id,
      //   status: 'accepted',
      //   messageId,
      // });

      // setOffer(msgOffer);
    }
  };

  useEffect(() => {
    if (!chats?.length) return;

    // * Update Active Chat (if any)
    if (activeChat)
      setActiveChat(chats.find((el) => el._id === activeChat._id));
    // setActiveChat(chats[0]);
  }, [chats]);

  const scrollChat = () => {
    const messagedContainer = document.getElementById('messageArea');
    messagedContainer.scrollTop = messagedContainer.scrollHeight;
  };

  useEffect(() => {
    scrollChat();
  }, [activeChat?.messages]);

  const handleChatClick = (e) => {
    const { selected } = e.currentTarget.dataset;
    // console.log(`selected`, selected);
    setActiveChat(chats.find((el) => el._id === selected));
  };

  const isMyMsg = (msg) => {
    return msg.sender._id === user?._id;
  };

  const handleCreateMessage = (e) => {
    e.preventDefault();

    sendNewMessage(
      messageTxt,
      // * No need to add receiver bcoz receiver will be the 2nd participant of chat
      // receiver:
      //   isMe(activeChat) === true
      //     ? activeChat.participants[1]._id
      //     : activeChat.participants[1]._id,
      activeChat._id
    );

    resetMessageTxt();
  };

  const isMe = (chat) => {
    // console.log(`chat.participants`, chat.participants);
    return chat.participants?.[0]._id === user?._id;
  };

  const sendOffer = () => {
    let targetUser =
      isMe(activeChat) === true
        ? activeChat.participants?.[1]._id
        : activeChat.participants?.[0]._id;

    console.log(`targetUser`, targetUser);
    setCurrentOfferUser([targetUser, activeChat._id]);
    toggleSendOffer();
  };

  return (
    <Container sx={{ paddingTop: 2, maxWidth: 'unset' }}>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          {/* <Divider />
          <Box sx={{ margin: 1, marginLeft: 0 }}>
            <TextField
              id='outlined-basic-email'
              label='Search'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ marginBottom: 2 }}
              className={classes.searchField}
            />
          </Box>
          <Divider /> */}
          <List>
            {/* {1 === 5 */}
            {chats
              ? chats.map((chat) => (
                  <React.Fragment key={chat._id}>
                    <ListItem
                      button
                      // sx={{ marginBlock: 2 }}
                      data-selected={chat._id}
                      onClick={handleChatClick}
                      style={{
                        backgroundColor:
                          activeChat?._id === chat._id && 'red !important',
                      }}
                    >
                      <ListItemIcon>
                        <Avatar
                          alt='Remy Sharp'
                          src={`https://ui-avatars.com/api/?rounded=true&name=${
                            isMe(chat) === true
                              ? chat.participants?.[1].fullName
                              : chat.participants?.[0].fullName
                                  .split(' ')
                                  .join('+')
                          }`}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          isMe(chat) === true
                            ? chat.participants?.[1].fullName
                            : chat.participants?.[0].fullName
                        }
                        secondary={chat.messages[
                          chat.messages.length - 1
                        ]?.text?.slice(0, 15)}
                      />
                      <ListItemText
                        // secondary={'08:55'}
                        align='right'
                        // secondary={new Date(
                        //   chat.messages[chat.messages.length - 1].createdAt
                        // ).toLocaleString()}
                        align='right'
                      ></ListItemText>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              : Array(5)
                  .fill()
                  .map(() => (
                    <Skeleton
                      key={v4()}
                      variant='rect'
                      width='200px'
                      height='50px'
                      sx={{
                        marginBottom: 2,
                        marginInline: 'auto',
                        borderRadius: '5px',
                      }}
                    />
                  ))}
          </List>
        </Grid>
        <Grid item xs={9} style={{ backgroundColor: '#fff' }}>
          <List id='messageArea' className={classes.messageArea}>
            {activeChat?.messages &&
              activeChat.messages.map((message) => (
                <React.Fragment key={message._id}>
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
                        [classes.message]: message.isOffer === false, // classes.drawerOpen is applied always, bool = true
                        [classes.agreementMessage]: message.isOffer === true, // classes.drawerOpen is applied always, bool = true
                        [classes.myMessage]: isMyMsg(message) === true, // classes.drawerOpen is applied always, bool = true
                        [classes.otherMessage]: isMyMsg(message) === false, // you can also use boolean variable
                      })}
                    >
                      {isMyMsg(message) === true ? (
                        message.isOffer && message.offer ? (
                          <Grid item xs={12}>
                            <Typography
                              style={{
                                fontSize: 18,
                              }}
                            >
                              Offer
                            </Typography>
                            <Box className={classes.Agreement}>
                              <Box className={classes.AgreementHeader}>
                                <Typography variant='h6' fontWeight='bold'>
                                  {message.offer.description}
                                </Typography>
                                <Typography
                                  variant='h6'
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
                                <Typography
                                  variant='subtitle2'
                                  style={{
                                    marginLeft: 'auto',
                                    textAlign: 'right',
                                  }}
                                >
                                  {new Date(
                                    message.offer.createdAt
                                  ).toLocaleTimeString()}
                                </Typography>
                              </Box>
                            </Box>
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
                              <ListItemText
                                align={'right'}
                                primary={message.text}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align={'right'}
                                secondary={new Date(
                                  message.createdAt
                                ).toLocaleTimeString()}
                              />
                            </Grid>
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
                              <Typography variant='h6'>
                                $ {message.offer.budget}
                              </Typography>
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
                                    handleOffer(
                                      'accepted',
                                      message.offer,
                                      message._id
                                    )
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
                                    handleOffer(
                                      'rejected',
                                      message.offer,
                                      message._id
                                    )
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
                                <Typography
                                  variant='subtitle2'
                                  style={{
                                    marginLeft: 'auto',
                                    textAlign: 'right',
                                  }}
                                >
                                  {new Date(
                                    message.offer.createdAt
                                  ).toLocaleTimeString()}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      ) : (
                        <>
                          <Grid item xs={12}>
                            <ListItemText
                              align={'left'}
                              primary={message.text}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <ListItemText
                              align={'left'}
                              secondary={new Date(
                                message.createdAt
                              ).toLocaleTimeString()}
                            />
                          </Grid>
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
                </React.Fragment>
              ))}
          </List>
          <Divider />
          {activeChat && (
            <Grid container style={{ padding: '20px', alignItems: 'center' }}>
              <Grid item xs={10}>
                <form id='messageForm' onSubmit={handleCreateMessage}>
                  <TextField
                    id='outlined-basic-email'
                    label='Type Something'
                    fullWidth
                    value={messageTxt}
                    onChange={handleTxtChange}
                    required
                  />
                </form>
              </Grid>

              <Grid item xs={1} align='right'>
                <Button
                  color='primary'
                  aria-label='add'
                  type='submit'
                  form='messageForm'
                  variant='contained'
                  sx={{ marginLeft: 1 }}
                  style={{
                    background: 'dodgerblue',
                  }}
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          )}
          {activeChat && user?.role === 'seller' && (
            <ListItem>
              <Button
                color='primary'
                aria-label='add'
                variant='contained'
                onClick={toggleSendOffer}
                size='small'
                disabled={loadingChatId}
                endIcon={<Add />}
                style={{
                  background: 'dodgerblue',
                }}
              >
                {loadingChatId ? 'Sending' : 'Offer'}
              </Button>
              {loadingChatId && (
                <div style={{ marginLeft: 10 }} className='loaderSmall'></div>
              )}
            </ListItem>
          )}
        </Grid>
      </Grid>
      <CreateOfferDialog
        open={sendOfferOpen}
        toggleDialog={toggleSendOffer}
        handleCreate={handleCreateOffer}
      />
    </Container>
  );
};

export default Chat;
