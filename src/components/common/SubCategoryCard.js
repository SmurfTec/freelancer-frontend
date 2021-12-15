import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const SubCategoryCard = (cat) => {
  const { id, name, imgUrl } = cat;

  return (
    <Link to='/'>
      <img src={imgUrl} alt={name} />
      <Typography variant='caption' color='textPrimary'>
        {name}
      </Typography>
    </Link>
  );
};

export default SubCategoryCard;
