import {
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Tabs,
  Tab,
  Chip,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from 'styles/commonStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ordersData } from 'data';
import { makeStyles } from '@material-ui/core/styles';
import tabstyles from 'styles/TabStyles';
import PropTypes from 'prop-types';
import { OrdersContext } from 'contexts/OrdersContext';
import { Skeleton } from '@material-ui/lab';
import { v4 } from 'uuid';
import { AuthContext } from 'contexts/AuthContext';
import Label from 'components/common/Label';
import OrderTableBody from './OrderTableBody';

const useStyles = makeStyles((theme) => ({
  gigImg: {
    float: 'left',
    borderRadius: 3,
    backgroundColor: '#fff',
    display: 'block',
    width: 38,
    height: 35,
    overflow: 'hidden',
  },
}));

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
        <Box mt={3} pl={2}>
          {children}
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

const OrdersTable = () => {
  const classes = styles();
  const classes_s = useStyles();
  const tabClasses = tabstyles();
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { orders, loading, manageOrder } = useContext(OrdersContext);
  const { user } = useContext(AuthContext);

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    console.log(`orders`, orders);
    if (!orders) return;

    switch (value) {
      case 0: {
        setFilteredOrders(orders.filter((el) => el.status === 'active'));
        break;
      }
      case 1:
        setFilteredOrders(orders.filter((el) => el.status === 'delivered'));
        break;
      case 2:
        setFilteredOrders(orders.filter((el) => el.status === 'notAccepted'));
        break;
      case 3:
        setFilteredOrders(orders.filter((el) => el.status === 'completed'));
        break;

      default:
        setFilteredOrders(orders);
        break;
    }
  }, [orders, value]);

  //? Tabs onChange func
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isBuyer = useMemo(() => {
    return user?.role === 'buyer';
  }, [user]);

  const showSubmission = useMemo(() => {
    return value !== 0;
  }, [value]);

  const showActions = useMemo(() => {
    let actions;
    if (isBuyer === true) {
      if (value === 1 || value === 2) {
        actions = true;
      }
    } else if (value === 0 || value === 2) {
      // * For Seller , Actions will show only in Active / notAccepted
      actions = true;
    }
    return actions;
  }, [isBuyer, value]);

  return (
    <>
      <Container className={classes.container}>
        <Box>
          <Typography variant='h4'>Your Orders</Typography>
        </Box>
        {/* <Box sx={{ mt: 4 }}>
         
        </Box> */}

        <div className={tabClasses.root}>
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
              {/* <Tab label='Priority' {...a11yProps(0)} /> */}
              <Tab label='Active' {...a11yProps(0)} />
              <Tab label='Delivered' {...a11yProps(1)} />
              <Tab label='Not Approved' {...a11yProps(2)} />
              <Tab label='Completed' {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel className={tabClasses.TabPanel}>
            {filteredOrders.length === 0 ? (
              <Typography variant='subtitle1'>
                No Orders for this category
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table className={tabClasses.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell colspan='2' align='center'>
                        {isBuyer ? 'Seller' : 'Buyer'}
                      </TableCell>
                      <TableCell>Offer</TableCell>
                      <TableCell>Deadline</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      {showSubmission === true && (
                        <TableCell>Submission</TableCell>
                      )}
                      {showActions === true && <TableCell>Actions</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      Array(5)
                        .fill()
                        .map(() => (
                          <TableRow key={v4()}>
                            {Array(7)
                              .fill()
                              .map(() => (
                                <TableCell key={v4()}>
                                  <Skeleton />
                                </TableCell>
                              ))}
                          </TableRow>
                        ))
                    ) : (
                      <OrderTableBody
                        classes_s={classes_s}
                        data={filteredOrders}
                        isBuyer={isBuyer}
                        showSubmission={showSubmission}
                        showActions={showActions}
                        manageOrder={manageOrder}
                      />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </div>
      </Container>
    </>
  );
};

export default OrdersTable;
