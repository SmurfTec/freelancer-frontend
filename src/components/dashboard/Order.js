import useFetch from 'hooks/useFetch';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from 'utils/makeReq';

import { Box, Typography, Tabs, makeStyles, Tab } from '@material-ui/core';
import OrdersList from './OrdersList';

const useStyles = makeStyles({
  Tabs: {
    '& .MuiTabs-flexContainer': {
      '& .MuiTab-root': {
        minWidth: 100,
        // flexGrow: 1,
        position: 'relative',
        '& .MuiTab-wrapper': {
          borderBottom: `2px solid`,
          alignItems: 'flex-start',
        },
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'unset',
    },
    '& .Mui-selected': {
      // backgroundColor: '#4d4d4d',
      // color: '#fff',
    },
    '& .MuiTab-wrapper': {
      textTransform: 'capitalize',
    },
  },
  TabPanel: {
    padding: 0,
  },
});

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
        <Box>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const DashboardOrders = ({ user, token }) => {
  const classes = useStyles();
  const [activeOrders, setActiveOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const {
    loading,
    value: orders,
    error,
  } = useFetch(
    `${API_BASE_URL}/orders/me`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
    [user],
    'orders'
  );

  useEffect(() => {
    if (!orders) return;

    setActiveOrders(orders.filter((el) => el.status === 'active'));
    setDeliveredOrders(orders.filter((el) => el.status === 'delivered'));
  }, [orders]);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.Tabs}>
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
        <Tab label='Delivered' {...a11yProps(1)} />
      </Tabs>
      <TabPanel className={classes.TabPanel} value={value} index={0}>
        <OrdersList loading={loading} data={activeOrders} />
      </TabPanel>
      <TabPanel className={classes.TabPanel} value={value} index={1}>
        <OrdersList loading={loading} data={deliveredOrders} />
      </TabPanel>
    </div>
  );
};

export default DashboardOrders;
