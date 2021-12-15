import { makeStyles } from '@material-ui/core';
import img from 'assets/job.jpg';
const styles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),

    '& form': {
      marginBottom: theme.spacing(3),
    },
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid #dedede',
    },
    '&:not(:empty)::before': {
      marginRight: '.55em',
    },
    '&:not(:empty)::after': {
      marginLeft: '.55em',
    },
  },

  // * Banner Styles

  bannerImgCntr: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: '0',
    background: 'rgba(0,0,0,0.6)',
  },

  bannerImg: {
    height: 550,
    marginBottom: theme.spacing(5),
    backgroundImage: `url(${img})`,
  },

  bannerContent: {
    zIndex: 1,
    textAlign: 'center',
    '& h3': {
      color: '#fff',
      marginInline: theme.spacing(4),
    },

    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  //   desc: {
  //     borderRadius: 6,
  //     padding: theme.spacing(2),
  //     marginTop: theme.spacing(3),

  //     [theme.breakpoints.up('sm')]: {
  //       marginLeft: theme.spacing(1),
  //     },
  //   },

  // ^ Category Carousel item Style
  carouselCard: {
    display: 'block',
    padding: 10,
    height: '100%',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },

  // ^ Some common styles
  marginBet: {
    // marginInline: theme.spacing(3),
    marginBlock: 75,
    position: 'relative',

    '& h4': {
      marginLeft: theme.spacing(1),
      marginBottom: 20,
    },
  },
  serviceDetails: {
    backgroundColor: '#f1fdf7',
    paddingInline: theme.spacing(5),
    paddingBlock: theme.spacing(5),
  },
  serviceSubHead: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    '& svg': {
      marginRight: theme.spacing(2),
    },
  },

  // ^ Sub Category Card Styles
  catContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    listStyleImage: 'none',
    marginTop: theme.spacing(5),

    '& li': {
      boxSizing: 'border-box',
      textAlign: 'center',
      width: '50%',
      [theme.breakpoints.up('sm')]: {
        width: '20%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '33.33%',
        paddingBottom: 50,
      },

      '& a': {
        textAlign: 'center',
        position: 'relative',
        display: 'inline-block',
        '& img': {
          display: 'block',
          width: 48,
          height: 48,
          margin: '0 auto 15px',
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          top: 45,
          right: '50%',
          WebkitTransform: 'translateX(50%)',
          transform: 'translateX(50%)',
          padding: '0 0 8px',
          width: 48,
          borderBottom: '2px solid #c5c6c9',
        },

        '&:hover': {
          '&::after': {
            padding: '0 20px 8px',
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
  },
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#161e2c',
    color: '#fff',
    paddingBlock: theme.spacing(4),
    paddingInline: theme.spacing(3),
  },
}));

export default styles;
