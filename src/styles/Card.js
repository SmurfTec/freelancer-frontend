import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    boxShadow: 'none',
  },
  title: {
    position: 'absolute',
    padding: theme.spacing(2),
    top: 15,
    left: 10,
    color: '#fff',
    userSelect: 'none',
    '& h4': {
      margin: 0,
      marginTop: 10,
      // fontWeight: '700',
    },
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: '0',
    background:
      'linear-gradient(0deg, rgba(0,0,40,1) 0%, rgba(0,0,40,0.5522584033613445) 20%, rgba(255,255,255,0) 100%)',
  },
  cardDate: {
    position: 'absolute',
    backgroundColor: '#fff',
    display: 'inline-block',
    paddingBlock: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 1,
  },
  puclicationCard: {
    boxShadow: 'none',
    backgroundColor: '#E6E6E6',
    height: 250,
    marginBlock: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImg: {
    position: 'relative',
    height: 350,
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    fontStyle: 'italic',
  },
  bannerContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 9,
  },
  blogBannerDate: {
    borderRadius: 10,
    backgroundColor: '#fff',
    display: 'inline-block',
    padding: theme.spacing(1, 4),
  },
  bannerOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  textArea: {
    resize: 'vertical',
  },
  carouselCard: {
    display: 'block',
    padding: 10,
    height: '100%',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },

  cardMedia: {
    height: 330,
    position: 'relative',
  },

  carouselSlim: {
    maxWidth: 250,
  },
}));

export default useStyles;
