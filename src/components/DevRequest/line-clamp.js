import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const LineClamp = ({ text, lines, variant }) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: lines || 2,
        WebkitBoxOrient: 'vertical',
      }}
    >
      <Typography variant={variant || 'body1'}>{text}</Typography>
    </Box>
  );
};

export default LineClamp;
