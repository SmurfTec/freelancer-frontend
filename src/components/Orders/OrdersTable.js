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
import React, { useState } from 'react';
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

  const [actionMenu, setActionMenu] = React.useState(null);
  const isMenuOpen = Boolean(actionMenu);

  const [value, setValue] = React.useState(0);

  //? Tabs onChange func
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <>
      <Navbar />
      <Container className={classes.container}>
        <Box sx={{ mt: 3 }}>
          <Typography variant='h4'>Gigs</Typography>
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
              <Tab label='Priority' {...a11yProps(0)} />
              <Tab label='Active' {...a11yProps(1)} />
              <Tab label='Completed' {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel className={tabClasses.TabPanel} value={value} index={0}>
            <TableContainer component={Paper}>
              <Table className={tabClasses.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell colspan='2'>BUYER</TableCell>
                    <TableCell>GIG</TableCell>
                    <TableCell>DEADLINE</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell component='th' scope='row'>
                        <Box className={classes_s.gigImg}>
                          <img
                            src={order.buyer.img}
                            alt={order.buyer.userName}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{order.buyer.userName}</TableCell>
                      <TableCell>{order.gig}</TableCell>
                      <TableCell>{order.deadline}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          style={{ textTransform: 'uppercase' }}
                        />
                      </TableCell>
                      {/* <TableCell>
                      <IconButton
                        aria-label='show more'
                        aria-controls={menuId}
                        data-ordertitle={order.title}
                        aria-haspopup='true'
                        onClick={handleMenuOpen}
                        style={{
                          marginLeft: 'auto',
                          color: '#000',
                        }}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell> */}
                      {/* <TableCell align='right'>{gig.protein}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Active
          </TabPanel>
          <TabPanel value={value} index={2}>
            Completed
          </TabPanel>
        </div>
      </Container>
      {renderMenu}
    </>
  );
};

export default OrdersTable;
