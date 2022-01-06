import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    // borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    // height: '80vh',
    boxShadow: 'unset',
    // padding: 20,
    // background: '#edf0f5',
    // color: '#fff',
    border: '1px solid #ccc',
    '& .MuiTypography-colorTextSecondary': {
      // color: '#fff',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
  },
  padding: {
    padding: '1em',
  },
  chatTitle: {
    justifyContent: 'center',
    display: 'flex',
    columnGap: '1em',
    '& img': {
      width: 30,
      height: 30,
      color: '#fff',
    },
    marginBottom: '1.5em',
  },
  chatList: {
    '&.MuiList-padding': {
      // paddingTop: 0,
      // paddingBottom: 0,
      paddingInline: 0,
      paddingBlock: 0,
    },
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    // background: 'dodgerblue',
    // padding: '1em',
  },
  searchField: {
    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    paddingInline: 20,
  },
  messageBox: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: 10,
    padding: 0,
    marginBottom: '1em',
    '& .MuiListItemIcon-root': {
      justifyContent: 'center',
    },
  },
  message: {
    position: 'relative',
    maxWidth: '63%',
    width: 'fit-content',
    display: 'inline-block',
    padding: '0.3rem 0.9rem',
    // padding: '0.5rem 1rem',
    lineHeight: '1rem',
    minHeight: '2rem',
    fontSize: '0.875rem',
    borderRadius: '1rem',
    wordBreak: 'break-all',
    backgroundColor: '#f0f7f4',
    marginBottom: 15,
  },

  messageTime: {
    position: 'absolute',
    width: 'max-content',
    bottom: '-1.4rem',
    fontSize: '0.1rem',
    '& p': {
      fontSize: '0.7rem',
    },
  },
  otherTime: {
    // right: 0,
    left: 0,
  },
  myTime: {
    // left: 0,
    right: 0,
  },

  agreementMessage: {
    width: '75%',
    // marginLeft: 'auto',
    color: '#4d4d4d',
    borderRadius: 20,
    marginBottom: '1rem',
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 5,
    '& p': {
      fontStyle: 'italic',
      bottom: '-1rem',

      // marginBottom: 5,
      // color: theme.palette.text.secondary,
    },
    // '& .MuiListItemText-secondary': {
    //   fontSize: 14,
    //   // color: '#000',
    // },
  },

  myMessage: {
    marginLeft: 'auto',
    borderTopRightRadius: '0.125rem',
    '& p': {
      fontStyle: 'italic',
    },
  },
  otherMessage: {
    marginRight: 'auto',
    // float: 'left',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderTopLeftRadius: '0.125rem',
    '& p': {
      fontStyle: 'italic',
    },
  },
  Agreement: {
    backgroundColor: '#fff',
    border: `1px solid #e7e7e7`,
    // padding: 10,
    // minWidth: 450,
    borderRadius: 5,
    overflow: 'hidden',
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

  typeMessage: {
    border: '1px solid #0000003b',
    borderRadius: 10,
    padding: '5px 10px',
  },
}));

export default useStyles;
