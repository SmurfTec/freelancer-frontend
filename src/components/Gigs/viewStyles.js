const { makeStyles } = require('@material-ui/core');

const styles = makeStyles((theme) => ({
  Tabs: {
    '& .MuiTab-root': {
      // paddingInline: 15,
      border: '1px solid #ccc',
      flexGrow: 1,
      minWidth: 'unset',
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      transition: '0.5s',
      color: '#fff',
    },
  },
}));

export default styles;
