import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from '../BuyerHome/Carousel/cardStyles';
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  const classes = styles();
  const { title, images, user } = gig;

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/services/${gig._id}`}>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={images[0]}
          title={title}
        />
      </CardActionArea>
      <CardContent>
        <Box style={{}}>
          <Box
            display='flex'
            alignItems='center'
            style={{
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Avatar
              src={user.photo}
              style={{ height: '30px', width: '30px' }}
            />
            <Typography gutterBottom variant='body1' component='h2'>
              {user.fullName}
            </Typography>
          </Box>
          <Typography variant='body1' fontWeight='bold' component='body2'>
            {title}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <Rating
            name='half-rating'
            defaultValue={gig.user.ratingsAverage}
            readOnly
            precision={0.5}
            size='small'
          />
          <Typography variant='h6' style={{ color: '#FFB400' }}>
            {gig.user.ratingsAverage}
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions></CardActions> */}
    </Card>
  );
};

export default GigCard;
