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
    <Card className={classes.root}>
      <CardContent>
        <Box
          display='flex'
          alignItems='center'
          style={{
            gap: 10,
            marginBottom: '1rem',
          }}
        >
          <Typography gutterBottom variant='body1' component='h2'>
            Web Designing
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions></CardActions> */}
    </Card>
  );
};

export default DesignCard;
