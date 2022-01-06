import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    border: '1px solid #0000003b',
    // marginInline: theme.spacing(2.5),
    // marginTop: theme.spacing(4),
    // marginBottom: theme.spacing(3),
    borderRadius: 20,
    paddingInline: theme.spacing(1),
    // backgroundColor: (props) =>
    //   props.themeMode ? theme.mode['dark'][1] : theme.mode['light'][1],
    // minHeight: '3em',

    '& svg': {
      marginInline: theme.spacing(0.5),
      color: theme.palette.grey[600],
    },
  },
  input: {
    color: '#000',
    marginLeft: 5,
    paddingInline: '4px 10px',
    fontSize: '0.8rem',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 25,
    margin: 4,
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <SearchIcon fontSize='small' />
      {/* <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
      >
      </IconButton> */}
      <Divider className={classes.divider} orientation='vertical' />
      <InputBase
        className={classes.input}
        placeholder='What are you looking for?'
        inputProps={{ 'aria-label': 'search files' }}
      />
    </Paper>
  );
};

export default SearchBar;
