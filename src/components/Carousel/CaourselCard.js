import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Button,
  CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    //   paddingInline: 2,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    // minHeight: 218,
    height: 218,
    overflow: 'hidden',
  },
  cardContent: {
    // flexGrow: 1,
  },
  cardTitle: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: '#ffffff',
    fontSize: 35,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    lineHeight: 'normal',
  },
}));

function CaourselCard({ title, description, image, _id, history }) {
  const classes = useStyles();
  const handleClick = () => {
    history.push(`/tours/details/${_id}`);
  };
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.cardMedia} image={image}>
          <Typography className={classes.cardTitle}>
            {title.toUpperCase()}
          </Typography>
        </CardMedia>
      </CardActionArea>
      <CardContent className={classes.cardContent}>
        <Typography>{description.slice(0, 110)}...</Typography>
      </CardContent>
    </Card>
  );
}

export default withRouter(CaourselCard);
