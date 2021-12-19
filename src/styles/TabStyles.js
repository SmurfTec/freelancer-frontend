import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    border: 'none',
    '& .MuiAppBar-root': { boxShadow: 'none', border: 'none' },
    // borderTopLeftRadius: 15,
    // backgroundColor: '#4d4d4d',
    '& .MuiTabs-flexContainer': {
      // justifyContent: 'space-around',
      '& .MuiTab-root': {
        minWidth: 100,
        flexGrow: 1,
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'unset',
    },
    '& .Mui-selected': {
      // backgroundColor: '#4d4d4d',
      // color: '#fff',
    },
    '& .MuiTab-wrapper': {
      textTransform: 'capitalize',
    },
  },
  TabPanel: {
    // backgroundColor: '#4d4d4d',
    // color: '#fff',
    //   height: '90%',
  },

  //? Tab Item Styles
  tabItemOptions: {
    display: 'flex',

    '& p': {
      position: 'relative',
      cursor: 'pointer',
      '&:hover span': {
        width: '100%',
        color: '#676567',
      },
    },
  },

  slider: {
    position: 'absolute',
    display: 'block',
    left: 0,
    top: '90%',
    margin: '0 auto',
    height: 2,
    backgroundColor: '#fff',
    width: '0%',
    transition: 'width 1s ease',
  },
  selectedOption: {
    width: '55%',
  },

  textInput: {
    width: '100%',

    padding: '9px 20px',
    textAlign: 'left',
    // border: 0,
    // border: '1px solid #ccc',

    outline: 0,
    // borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 300,
    color: '#8D8D8D',
    webkitTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
    marginBottom: 14,
  },
  label: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 300,
    lineHeight: 2,
    marginBottom: 10,
  },
  form: {
    marginTop: 20,
  },
}));

export default useStyles;
