import {
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Navbar from 'components/common/Navbar';
import React, { useContext, useState } from 'react';
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
import { AuthContext } from 'contexts/AuthContext';
import { Delete } from '@material-ui/icons';
import Edit from '@material-ui/icons/Edit';
import { useNavigate } from 'react-router-dom';

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
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [actionMenu, setActionMenu] = React.useState(null);
  const isMenuOpen = Boolean(actionMenu);
  const [currentGigId, setCurrentGigId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setActionMenu(event.currentTarget);
    setCurrentGigId(id);
  };

  const handleMenuClose = () => {
    setActionMenu(null);
  };

  const handleEditGig = (e) => {
    navigate(`/myGigs/${currentGigId}`);
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
      <MenuItem onClick={handleEditGig}>
        <Edit size='small' /> Edit
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Delete size='small' /> Delete
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Container className={classes.container}>
        <Box sx={{ mt: 3 }}>
          <Typography variant='h4'>Your Services</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          {/* <TabLayout /> */}

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell colspan='2' align='center'>
                    Service
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Reviews</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sub Category</TableCell>
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.gigs.map((gig) => (
                  <TableRow key={gig.title}>
                    <TableCell component='th' scope='row'>
                      <Box className={classes_s.gigImg}>
                        <img src={gig.images[0]} alt={gig.title} />
                      </Box>
                    </TableCell>
                    <TableCell>{gig.title}</TableCell>
                    <TableCell>{gig.status}</TableCell>
                    <TableCell>{gig.reviews.length}</TableCell>
                    <TableCell>{gig.category?.title}</TableCell>
                    <TableCell>{gig.subCatgory?.title}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label='show more'
                        aria-controls={menuId}
                        data-gigtitle={gig.title}
                        aria-haspopup='true'
                        onClick={(e) => handleMenuOpen(e, gig._id)}
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
