import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './Carousel/cardStyles';
import { Box, CardContent } from '@material-ui/core';

const DesignCard = ({ gig }) => {
  const classes = styles();

  return (
    <Box
      style={{
        gap: 10,
        marginBottom: '1rem',
        backgroundColor: '#fff',
        border: '1px solid #000',
        minWidth: 200,
        textAlign: 'center',
        display: 'flex',
        /* align-items: center; */
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: 150,
        // background : `url$`
      }}
    >
      <Typography gutterBottom variant='body1' component='h2'>
        Web Designing
      </Typography>
    </Box>
  );
};

export default DesignCard;
