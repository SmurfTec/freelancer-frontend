import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // border: '1px solid #ccc',
    '&.MuiCard-root': {
      padding: 0,
    },
    '& .MuiCardContent-root': {
      paddingTop: 15,
    },
  },
}));

export default useStyles;
