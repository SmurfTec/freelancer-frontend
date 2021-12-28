import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import React from 'react';

const DevRequestsTable = ({ handleMenuOpen, classes, data, menuId }) => (
  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>description</TableCell>
          <TableCell>user</TableCell>
          <TableCell>budget</TableCell>
          <TableCell>expectedDay</TableCell>
          <TableCell>category</TableCell>
          <TableCell>actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {console.log(`data`, data)} */}
        {data.map((row) => (
          <TableRow key={row._id}>
            {/* <TableCell component='th' scope='row'>
                      <Box className={classes_s.gigImg}>
                        <img src={row.user.photo} alt={row.title} />
                      </Box>
                    </TableCell> */}
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.user.fullName}</TableCell>
            <TableCell>{row.budget}</TableCell>
            <TableCell>{row.expectedDay}</TableCell>
            <TableCell>{row.category.title}</TableCell>
            <TableCell>
              <IconButton
                aria-label='show more'
                aria-controls={menuId}
                data-gigtitle={row.title}
                aria-haspopup='true'
                onClick={handleMenuOpen}
                style={{
                  marginLeft: 'auto',
                  // color: '#cccccc',
                }}
              >
                <MoreHoriz />
              </IconButton>
            </TableCell>
            {/* <TableCell align='right'>{row.protein}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DevRequestsTable;
