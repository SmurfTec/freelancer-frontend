import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      boxShadow: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
      // boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },
  Appbar: {
    // backgroundColor: '#1462aa',
    backgroundColor: '#fff',
    // color: '#B033fa',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  NavItem: {
    display: 'block',
    color: '#000',
    cursor: 'pointer',
    textDecoration: 'none',
    '& a': {
      color: theme.palette.text.secondary,
      '&.active': {
        color: theme.palette.hover.main,
      },
    },
    '&:hover': {
      color: theme.palette.hover.main,
      // borderBottom: '2px solid #B033fa',
      // color: 'deepskyblue',
      transition: '0.3s',
    },
  },
  darkBtn: {
    overflow: 'unset !important',
    '&button': {},
  },
  RegisterBtn: {
    '&.MuiButton-contained': {
      // borderRadius: 20,
      color: '#fff',
      transition: '0.6s',
      // fontWeight: 'bold',
      backgroundColor: theme.palette.primary.light,
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  MobileMenu: {
    height: 500,
  },
  SearchBar: {
    '&.MuiPaper-root': {
      boxShadow: 'none',
    },
  },
  navLink: {
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;

// export const NavLink = styled(({ theme }) => ({
//   color: theme.palette.primary.main,
//   display: 'flex',
//   alignItems: 'center',
//   textDecoration: 'none',
//   padding: '0 1rem',
//   height: '100%',
//   cursor: 'pointer',
//   // '&.active': {
//   //   color: '#15cdfc',
//   // },
// }));
