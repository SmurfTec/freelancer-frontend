import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from 'styles/Card';
import Box from '@material-ui/core/Box';
import img from 'assets/job.jpg';

const CategoryCard = ({ cat, handleClick }) => {
  const classes = styles();
  const { label, value, desc } = cat;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick} data-blogid={value}>
        <CardMedia className={classes.cardMedia} image={img} title={label}>
          <span className={classes.overlay} />
          {/* <Box className={classes.cardDate}>
            <Typography variant='subtitle2'>
              {new Date(createdAt).toDateString()}
            </Typography>
          </Box> */}
          <Typography
            variant='h5'
            className={`${classes.title} ${classes.tag}`}
          ></Typography>
          <Box className={classes.title}>
            <Typography variant='h5' sx={{ fontStyle: 'italic' }}>
              {desc}
            </Typography>
            <Typography variant='h4'>{label}</Typography>
          </Box>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
