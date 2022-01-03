import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React from 'react';

const ChatItem = ({ chat, handleChatClick, isMe, activeChat }) => {
  return (
    <ListItem
      button
      // sx={{ marginBlock: 2 }}
      data-selected={chat._id}
      onClick={handleChatClick}
      style={{
        backgroundColor: activeChat?._id === chat._id && 'red !important',
      }}
    >
      <ListItemIcon>
        <Avatar
          alt='Remy Sharp'
          src={`https://ui-avatars.com/api/?rounded=true&name=${
            isMe(chat) === true
              ? chat.participants?.[1].fullName
              : chat.participants?.[0].fullName.split(' ').join('+')
          }`}
        />
      </ListItemIcon>

      <ListItemText
        primary={
          isMe(chat) === true
            ? chat.participants?.[1].fullName
            : chat.participants?.[0].fullName
        }
        secondary={chat.messages[chat.messages.length - 1]?.text?.slice(0, 15)}
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
  );
};

export default ChatItem;
