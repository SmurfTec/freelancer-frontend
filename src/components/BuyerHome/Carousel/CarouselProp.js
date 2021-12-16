import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    '& .react-multi-carousel-item': {
      minWidth: 260,
    },
    '& .react-multiple-carousel__arrow::before': {
      color: 'white',
      marginLeft: '0',
    },
    '& .react-multiple-carousel__arrow--right ': {
      right: 0,
    },
    '& .react-multiple-carousel__arrow--left': {
      left: 0,
    },
    '& .carousel-container': {},
  },
}));

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1400 },
    items: 5,
    slidesToSlide: 3,
  },
  Largedesktop: {
    breakpoint: { max: 1400, min: 1200 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 3,
    slidesToSlide: 1, //
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 3,
    slidesToSlide: 1, //
  },
  smTablet: {
    breakpoint: { max: 785, min: 576 },
    items: 2,
  },
  smMobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};
