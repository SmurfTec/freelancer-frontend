import { Typography } from '@material-ui/core';
import React, { useState } from 'react';

const LineClamp = ({ className, text, component }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <Typography variant='body1'>
        {expanded ? text : text.length > 30 ? `${text.slice(0, 30)}...` : text}
      </Typography>
      {/* {text.length > 30 && (
        <Typography
          variant='body2'
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
        >
          {expanded ? 'Read Less' : 'Read More'}
        </Typography>
      )} */}
    </div>
  );
};

export default LineClamp;
