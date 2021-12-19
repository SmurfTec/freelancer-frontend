import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // border: '1px solid #ccc',
    '&.MuiCard-root': {
      padding: 0,
    },
    '& .MuiCardContent-root': {
      display: 'flex',
      minHeight: 160,
      /* padding-top: 10px; */
      flexDirection: 'column',
      paddingInline: 5,
      justifyContent: 'space-between',
      paddingBottom: 10,
      minHeight: 170,
    },
  },
}));

export default useStyles;
