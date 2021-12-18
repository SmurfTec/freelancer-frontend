import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PointSpreadLoading } from 'react-loadingg';
import { useTheme } from '@material-ui/styles';

const Loading = ({ noTitle }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        className='cPhARM'
        style={{
          margin: 'auto',
          position: 'absolute',
          inset: 0,
          minWidth: 'fit-content',
          transform: 'translateY(-40px)',
        }}
      >
        {!noTitle && (
          <Typography variant='h3' color='primary'>
            Freelance App
          </Typography>
        )}
      </Box>
      <PointSpreadLoading color={theme.palette.primary.main} />
    </Box>
  );
};

export default Loading;
