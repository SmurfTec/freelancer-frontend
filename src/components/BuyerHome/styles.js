const { makeStyles } = require('@material-ui/core');

const styles = makeStyles((theme) => ({
  Section1A: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    border: '1px solid #ccc',
    height: 200,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  carouselCard: {
    display: 'block',
    padding: 10,
    height: '100%',
    '& .MuiPaper-root': {
      border: '1px solid #ccc',
    },
  },
}));

export default styles;
