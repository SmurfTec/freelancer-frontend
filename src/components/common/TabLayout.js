import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import useStyles from 'styles/TabStyles';
// import FlightTabItem from './FlightTabItem';
// import FlightIcon from '@material-ui/icons/FlightTakeoff';
// import HotelIcon from '@material-ui/icons/Apartment';
// import VehicleIcon from '@material-ui/icons/DriveEta';
// import { useForm, Controller } from 'react-hook-form';
// import Select from 'react-select';
// import { CustomInputField, CustomDatePicker } from 'components/FormControls';
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

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
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
          <Tab label='Flight' {...a11yProps(0)} />
          <Tab label='Hotel' {...a11yProps(1)} />
          <Tab label='Vehicle' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.TabPanel} value={value} index={0}>
        <Box>Flight Tab</Box>
      </TabPanel>
      <TabPanel className={classes.TabPanel} value={value} index={1}>
        <section className={classes.tabItemOptions}>
          <Typography
            variant='body1'
            data-option='roundTrip'
            component='span'
            className={classes.tabItem}
          >
            Where do you stay ?
          </Typography>
        </section>
      </TabPanel>
      <TabPanel className={classes.TabPanel} value={value} index={2}>
        <section className={classes.tabItemOptions}>
          <Typography
            variant='body1'
            data-option='roundTrip'
            component='span'
            className={classes.tabItem}
          >
            Vehicle Rental for any type of Trip
          </Typography>
        </section>
      </TabPanel>
    </div>
  );
}
