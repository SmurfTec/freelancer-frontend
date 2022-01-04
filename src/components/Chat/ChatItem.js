import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  chatItemRoot: {
    // paddingRight: 0,
    // paddingLeft: 0,
    color: '#000',
    borderRadius: 8,
    marginBottom: '0.5em',
    '&.MuiListItem-root.Mui-selected': {
      backgroundColor: '#f0f7f4',
    },
  },
  chatTime: {
    // color: theme.palette.text.secondary,
    '& .MuiTypography-body1': {
      fontSize: '0.95rem',
      fontWeight: 600,
    },
  },
}));

const ChatItem = ({ chat, handleChatClick, isMe, activeChat }) => {
  const classes = styles();
  let lastmsg = chat.messages[chat.messages.length - 1];
  console.log(`lastmsg`, lastmsg);
  console.log(`chat`, chat);
  let showMsgTim = new Date(lastmsg.createdAt).toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  let showMsgDate = new Date(lastmsg.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <ListItem
      button
      // sx={{ marginBlock: 2 }}
      selected={activeChat?._id === chat._id}
      data-selected={chat._id}
      onClick={handleChatClick}
      className={classes.chatItemRoot}
      style={{
        backgroundColor: activeChat?._id === chat._id && 'red !important',
      }}
    >
      <ListItemIcon>
        <Avatar
          className={classes.small}
          alt='Remy Sharp'
          src={`https://ui-avatars.com/api/?rounded=true&name=${
            isMe(chat) === true
              ? chat.participants?.[1].fullName
              : chat.participants?.[0].fullName.split(' ').join('+')
          }`}
          size='medium'
        />
      </ListItemIcon>

      <ListItemText
        className={classes.chatTime}
        primary={
          isMe(chat) === true
            ? chat.participants?.[1].fullName
            : chat.participants?.[0].fullName
        }
        secondary={chat.messages[chat.messages.length - 1]?.text?.slice(0, 15)}
      />

      <ListItemText
        className={classes.chatTime}
        primary={showMsgTim.split(' ')[0]}
        secondary={showMsgDate}
        align='right'
        // secondary={new Date(
        //   chat.messages[chat.messages.length - 1].createdAt
        // ).toLocaleString()}
      />
    </ListItem>
  );
};

export default ChatItem;
