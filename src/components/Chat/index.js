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
    color: '#fff',
    border: '1px solid #ccc',
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
    height: '70vh',
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
    },
    '& .MuiListItemText-secondary': {
      fontSize: 14,
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
    },
    '& .MuiListItemText-secondary': {
      fontSize: 14,
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
  const { chats, sendNewMessage, updateAgreementMessage, loadingChatId } =
    useContext(SocketContext);
  const [messageTxt, handleTxtChange, resetMessageTxt] = useTextInput('');
  const [isAgreementOpen, toggleSendAgreement] = useToggleInput(false);

  const [isAddGameOpen, toggleAddGameOpen] = useToggleInput(false);
  const [agreement, setAgreement] = useState(null);

  const [currentAgreementUser, setCurrentAgreementUser] = useState(null);
  const [acceptAgreementState, setAcceptAgreementState] = useState(null);
  const [activeChat, setActiveChat] = useState();

  const handleAgreement = async (status, msgAgreement, messageId) => {
    console.log(`status`, status);
    console.log(`messageId`, messageId);
    if (status === 'rejected') {
      // * reject msgAgreement
      updateAgreementMessage(
        msgAgreement,
        activeChat._id,
        user._id,
        'rejected',
        messageId
      );
    } else {
      setAcceptAgreementState({
        msgAgreement,
        chatId: activeChat._id,
        userId: user._id,
        status: 'accepted',
        messageId,
      });

      setAgreement(msgAgreement);

      toggleAddGameOpen();
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

  const sendAgreement = () => {
    let targetUser =
      isMe(activeChat) === true
        ? activeChat.participants?.[1]._id
        : activeChat.participants?.[0]._id;

    console.log(`targetUser`, targetUser);
    setCurrentAgreementUser([targetUser, activeChat._id]);
    toggleSendAgreement();
  };

  return (
    <Container sx={{ paddingTop: 2 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            marginBottom: '3rem',
            marginTop: '1rem',
          }}
        >
          <Typography variant='h5' className='header-message'>
            Messaging
          </Typography>
        </Grid>
      </Grid>
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
                              ? chat.participants?.[1].name
                              : chat.participants?.[0].name.split(' ').join('+')
                          }`}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          isMe(chat) === true
                            ? chat.participants?.[1].name
                            : chat.participants?.[0].name
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
                          alt={user?.name}
                          src={`https://ui-avatars.com/api/?rounded=true&name=${message.sender.name
                            ?.split(' ')
                            .join('+')}`}
                          style={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      </ListItemIcon>
                    )}
                    <Grid
                      container
                      className={clsx({
                        // classes.drawer is applied always
                        [classes.message]: message.isAgreement === false, // classes.drawerOpen is applied always, bool = true
                        [classes.agreementMessage]:
                          message.isAgreement === true, // classes.drawerOpen is applied always, bool = true
                        [classes.myMessage]: isMyMsg(message) === true, // classes.drawerOpen is applied always, bool = true
                        [classes.otherMessage]: isMyMsg(message) === false, // you can also use boolean variable
                      })}
                    >
                      {isMyMsg(message) === true ? (
                        message.isAgreement && message.agreement ? (
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
                                  {message.agreement.description}
                                </Typography>
                                <Typography
                                  variant='h6'
                                  style={{
                                    minWidth: 'fit-content',
                                  }}
                                >
                                  $ {message.agreement.cost}
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
                                      message.agreement.status === 'pending'
                                        ? 'orange'
                                        : message.agreement.status ===
                                          'accepted'
                                        ? 'green'
                                        : 'red',
                                    textTransform: 'Capitalize',
                                  }}
                                >
                                  <b>{message.agreement.status}</b>
                                </Typography>
                                <Typography
                                  variant='subtitle2'
                                  style={{
                                    marginLeft: 'auto',
                                    textAlign: 'right',
                                  }}
                                >
                                  {new Date(
                                    message.agreement.createdAt
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
                                {message.agreement.description}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Cost :</b> {message.agreement.cost}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Days :</b> {message.agreement.days}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Sent at :</b>{' '}
                                {new Date(
                                  message.agreement.createdAt
                                ).toLocaleString()}
                              </Typography>
                              <Typography variant='h5'>
                                <b>Status :</b> {message.agreement.status}
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
                      ) : message.isAgreement && message.agreement ? (
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
                                {message.agreement.description}
                              </Typography>
                              <Typography variant='h6'>
                                $ {message.agreement.cost}
                              </Typography>
                            </Box>
                            {/* <Box className={classes.AgreementExpansion}>
                              <Typography variant='subtitle'>
                                {message.agreement.days}
                                <b>Days :</b>
                              </Typography>
                            </Box> */}
                            {message.agreement.status === 'pending' ? (
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
                                    handleAgreement(
                                      'accepted',
                                      message.agreement,
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
                                    handleAgreement(
                                      'rejected',
                                      message.agreement,
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
                                      message.agreement.status === 'pending'
                                        ? 'orange'
                                        : message.agreement.status ===
                                          'accepted'
                                        ? 'green'
                                        : 'red',
                                    textTransform: 'Capitalize',
                                  }}
                                >
                                  <b>{message.agreement.status}</b>
                                </Typography>
                                <Typography
                                  variant='subtitle2'
                                  style={{
                                    marginLeft: 'auto',
                                    textAlign: 'right',
                                  }}
                                >
                                  {new Date(
                                    message.agreement.createdAt
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
                          src={`https://ui-avatars.com/api/?rounded=true&name=${user?.name
                            .split(' ')
                            .join('+')}`}
                          style={{
                            height: 50,
                            width: 50,
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
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          )}
          {activeChat && (
            <ListItem>
              <Button
                color='primary'
                aria-label='add'
                variant='contained'
                onClick={sendAgreement}
                size='small'
                disabled={loadingChatId}
                endIcon={<Add />}
                style={{
                  background: 'dodgerblue',
                }}
              >
                {loadingChatId ? 'Sending' : 'Agreement'}
              </Button>
              {loadingChatId && (
                <div style={{ marginLeft: 10 }} className='loaderSmall'></div>
              )}
            </ListItem>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;