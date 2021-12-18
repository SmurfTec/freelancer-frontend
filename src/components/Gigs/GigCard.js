import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Box,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const styles = makeStyles((theme) => ({
  gigCard: {
    width: 230,
    position: 'relative',
  },
  price: {
    fontSize: theme.spacing(3),
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  modifyGig: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    zIndex: 1,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    flexGrow: 1,
    padding: 5,
  },
}));

const GigCard = (gig) => {
  const classes = styles();
  const { title, images, price } = gig;

  const handleGigModify = (e) => {
    e.stopPropagation();
  };
  return (
    <Card className={classes.gigCard}>
      <IconButton
        aria-label='show more'
        aria-haspopup='true'
        onClick={handleGigModify}
        className={classes.modifyGig}
        size='small'
      >
        <EditIcon />
      </IconButton>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={title}
          height='170'
          image={images}
          title={title}
        />
        <CardContent>
          <Typography variant='subtitle1' color='textSecondary' component='p'>
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ paddingInline: 2, display: 'flex' }}>
            <Typography variant='body2' color='primary' align='right'>
              STARTING AT <span className={classes.price}>{price}</span>
            </Typography>
          </Box>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default GigCard;
