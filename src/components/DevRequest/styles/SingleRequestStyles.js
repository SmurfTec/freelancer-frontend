const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  JobMain: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #ccc',
    width: 600,
    margin: 'auto',
    padding: 20,
  },
}));

export default useStyles;
