import React, { useContext, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Add from '@material-ui/icons/Add';
import { Box, Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { SocketContext } from 'contexts/SocketContext';
import v4 from 'uuid/dist/v4';
import useTextInput from 'hooks/useTextInput';
import useToggleInput from 'hooks/useToggle';
import { AuthContext } from 'contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { makeReq } from 'utils/makeReq';
import CreateOfferDialog from 'components/Offers/CreateOffer';
import useStyles from './styles';
import ChatItem from './ChatItem';
import ChatMessage from './ChatMessage';
// import AddGameToAgreement from '../../screens/dashboard/modals/AddGameToAgreement';
// import CreateAgreement from '../../screens/dashboard/modals/CreateAgreement';

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

  return (
    <Container sx={{ paddingTop: 2, maxWidth: 'unset' }}>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Divider />
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
          <Divider />
          <List>
            {/* {1 === 5 */}
            {chats
              ? chats.map((chat) => (
                  <React.Fragment key={chat._id}>
                    <ChatItem
                      chat={chat}
                      isMe={isMe}
                      activeChat={activeChat}
                      handleChatClick={handleChatClick}
                    />
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
                  <ChatMessage
                    classes={classes}
                    user={user}
                    isMyMsg={isMyMsg}
                    message={message}
                    handleOffer={handleOffer}
                  />
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
