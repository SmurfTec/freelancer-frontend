import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './cardStyles';
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const CategoryCard = ({ gig, handleClick }) => {
  const classes = styles();
  const {
    _id,
    title,
    images,
    user,
    description,
    ratingsAverage,
    rating,
    startingPrice,
  } = gig;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={images[0]}
          title={title}
        />
      </CardActionArea>
      <CardContent>
        <Box
          display='flex'
          alignItems='center'
          style={{
            gap: 10,
            marginBottom: '1rem',
          }}
        >
          <Avatar src={user.photo} style={{ height: '30px', width: '30px' }} />
          <Typography gutterBottom variant='body1' component='h2'>
            {user.fullName}
          </Typography>
        </Box>
        <Typography variant='body1' fontWeight='bold' component='p'>
          {title}
          {/* {trimString(description, 40)}... */}
          {/* {description?.slice(0, 30)}... */}
        </Typography>
        <Box
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Rating
            name='half-rating'
            defaultValue={gig.rating}
            readOnly
            precision={0.5}
          />
          <Typography variant='h5' style={{ color: '#FFB400' }}>
            {gig.rating}
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions></CardActions> */}
    </Card>
  );
};

export default CategoryCard;
