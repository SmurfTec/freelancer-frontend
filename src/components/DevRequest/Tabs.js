import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Tabs,
  Tab,
  Grid,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@material-ui/core';
import useStyles from 'styles/TabStyles';
import DevRequestsTable from './Table';
import devRequestsMocks from 'mocks/_devRequests';
import styles from 'styles/commonStyles';
// import SentTabItem from './SentTabItem';
// import SentIcon from '@material-ui/icons/SentTakeoff';
// import HotelIcon from '@material-ui/icons/Apartment';
// import VehicleIcon from '@material-ui/icons/DriveEta';
// import { useForm, Controller } from 'react-hook-form';
// import Select from 'react-select';
// import { CustomInputField, CustomDatePicker } from 'components/FormControls';

const selectStyles = {
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      color: '#000',
      backgroundColor: isSelected ? '#F4F6F8' : '#fff',
      '&:hover': {
        backgroundColor: '#F4F6F8',
      },
    };
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function DevRequestsTabs() {
  const classes = useStyles();
  const classes2 = styles();
  const [value, setValue] = React.useState(0);
  // const [tripOption, setTripOption] = React.useState(0);
  //   const {
  //     formState: { errors },
  //     register,
  //     handleSubmit,
  //     control,
  //   } = useForm();

  //? Tabs onChange func
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [actionMenu, setActionMenu] = React.useState(null);
  const isMenuOpen = Boolean(actionMenu);

  const handleMenuOpen = (event) => {
    setActionMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActionMenu(null);
  };

  const handleEditGig = (e) => {
    const { gigtitle } = e.currentTarget.dataset;
    console.log(`e.target`, e.target);
    console.log(gigtitle);
  };

  const menuId = 'gigActionMenu';
  const renderMenu = (
    <Menu
      anchorEl={actionMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEditGig}>EDIT</MenuItem>
      <MenuItem onClick={handleMenuClose}>REMOVE</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          <Tab label='Active' {...a11yProps(0)} />
          <Tab label='Sent' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.TabPanel} value={value} index={0}>
        <DevRequestsTable
          data={devRequestsMocks}
          classes={classes2}
          menuId={menuId}
          handleMenuOpen={handleMenuOpen}
        />
      </TabPanel>{' '}
      <TabPanel className={classes.TabPanel} value={value} index={1}>
        <DevRequestsTable
          data={devRequestsMocks}
          classes={classes2}
          menuId={menuId}
          handleMenuOpen={handleMenuOpen}
        />
        {renderMenu}
      </TabPanel>
    </div>
  );
}
