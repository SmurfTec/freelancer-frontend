import {
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
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
import { gigTableData } from 'data';
import { makeStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import TabLayout from 'components/common/TabLayout';

const useStyles = makeStyles((theme) => ({
  gigImg: {
    float: 'left',
    borderRadius: 3,
    backgroundColor: '#fff',
    display: 'block',
    width: 45,
    height: 32,
    overflow: 'hidden',
  },
}));

const GigTable = () => {
  const classes = styles();
  const classes_s = useStyles();

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
    <>
      <Navbar />
      <Container className={classes.container}>
        <Box sx={{ mt: 3 }}>
          <Typography variant='h4'>Gigs</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <TabLayout />

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell colspan='2'>GIG</TableCell>
                  <TableCell>IMPRESSIONS</TableCell>
                  <TableCell>ORDERS</TableCell>
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gigTableData.map((gig) => (
                  <TableRow key={gig.title}>
                    <TableCell component='th' scope='row'>
                      <Box className={classes_s.gigImg}>
                        <img src={gig.img} alt={gig.title} />
                      </Box>
                    </TableCell>
                    <TableCell>{gig.title}</TableCell>
                    <TableCell>{gig.impressions}</TableCell>
                    <TableCell>{gig.orders}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label='show more'
                        aria-controls={menuId}
                        data-gigtitle={gig.title}
                        aria-haspopup='true'
                        onClick={handleMenuOpen}
                        style={{
                          marginLeft: 'auto',
                          color: '#000',
                        }}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                    {/* <TableCell align='right'>{gig.protein}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      {renderMenu}
    </>
  );
};

export default GigTable;
