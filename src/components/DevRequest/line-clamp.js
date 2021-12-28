import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const LineClamp = ({ className, text, component }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}
    >
      <Typography variant='body1'>{text}</Typography>
    </Box>
  );
};

export default LineClamp;
