import { makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBlock: '2rem',
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },
}));

const PaginationBar = ({ count, page, onChange }) => {
  const classes = useStyles();
  return (
    <Pagination
      className={classes.root}
      count={count}
      page={page}
      onChange={onChange}
      variant='outlined'
      shape='rounded'
    />
  );
};

export default PaginationBar;
