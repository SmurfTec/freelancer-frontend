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
import { useNavigate } from 'react-router-dom';

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

const DevReqCard = (devRequest) => {
  const classes = styles();
  const { _id, title, image, description, budget, expectedDays } = devRequest;

  const navigate = useNavigate();
  const handleGigModify = (e) => {
    navigate(`/mygigs/${_id}`);
    e.stopPropagation();
  };
  return (
    <Card className={classes.gigCard}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={title}
          height='170'
          image={image}
          title={title}
        />
        <CardContent>
          <Typography variant='subtitle1' color='textSecondary' component='p'>
            {description}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary' component='p'>
            {expectedDays}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ paddingInline: 2, display: 'flex' }}>
            <Typography variant='body2' color='primary' align='right'>
              Budget
              <span className={classes.price}>{budget}</span>
            </Typography>
          </Box>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default DevReqCard;
