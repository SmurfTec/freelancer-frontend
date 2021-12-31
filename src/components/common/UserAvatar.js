import { Avatar } from '@material-ui/core';
import React from 'react';

const UserAvatar = ({
  user,
  photoKey = 'photo',
  nameKey = 'name',
  height = 40,
  width = 40,
  styles = {},
}) => {
  return (
    <Avatar
      style={{
        height,
        width,
        ...styles,
      }}
      src={
        user[photoKey] ||
        `https://ui-avatars.com/api/?rounded=true&name=${user[nameKey]
          .split(' ')
          .join('+')}`
      }
    />
  );
};

export default UserAvatar;
