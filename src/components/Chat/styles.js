import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    // height: '80vh',
    boxShadow: 'unset',
    // padding: 20,
    background: '#f2f2f2',
    // color: '#fff',
    border: '1px solid #ccc',
    '& .MuiTypography-colorTextSecondary': {
      color: '#fff',
    },
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    background: 'dodgerblue',
  },
  searchField: {
    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  },
  messageArea: {
    height: '65vh',
    overflowY: 'auto',
    paddingInline: 20,
  },
  messageBox: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: 20,
    padding: 0,
  },
  message: {
    // width: '50%',
    // marginLeft: 'auto',
    color: '#4d4d4d',
    width: 'fit-content',
    background: '#f2f2f2',
    borderRadius: 20,
    marginBottom: '1rem',
    padding: 10,
    paddingTop: 0,
    '& p': {
      fontSize: 14,
      color: '#000',
    },
    '& .MuiListItemText-secondary': {
      fontSize: 14,
      color: '#000',
    },
  },

  agreementMessage: {
    width: '50%',
    // marginLeft: 'auto',
    color: '#4d4d4d',
    borderRadius: 20,
    marginBottom: '1rem',
    padding: 10,
    paddingTop: 0,
    '& p': {
      fontSize: 14,
      color: '#000',
    },
    '& .MuiListItemText-secondary': {
      fontSize: 14,
      color: '#000',
    },
  },

  myMessage: {
    marginLeft: 'auto',
  },
  otherMessage: {
    marginRight: 'auto',
  },
  Agreement: {
    backgroundColor: '#fff',
    border: '1px solid black',
    // padding: 10,
    minWidth: 450,
  },
  AgreementHeader: {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiTypography-root': {
      fontWeight: 'bold',
    },
  },
  AgreementExpansion: {},
});

export default useStyles;
