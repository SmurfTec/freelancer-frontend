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
import { MoreHor, MoreHoriz, MoreHoriziz } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { v4 } from 'uuid';

const OffersTable = ({ handleMenuOpen, classes, data, menuId, loading }) => (
  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell align='center'>Job</TableCell>
          <TableCell align='center'>Description</TableCell>
          <TableCell align='center'>Budget ($)</TableCell>
          <TableCell align='center'>Delivery Time (days)</TableCell>
          {/* <TableCell>actions</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {console.log(`data`, data)} */}
        {loading
          ? Array(5)
              .fill()
              .map(() => (
                <TableRow key={v4()}>
                  {Array(5)
                    .fill()
                    .map(() => (
                      <TableCell key={v4()}>
                        <Skeleton />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          : data.map((row) => (
              <TableRow key={row._id}>
                {/* <TableCell component='th' scope='row'>
                      <Box className={classes_s.gigImg}>
                        <img src={row.user.photo} alt={row.title} />
                      </Box>
                    </TableCell> */}
                <TableCell style={{ maxWidth: 700 }}>
                  {row.devRequest
                    ? row.devRequest.description
                    : 'No longer exists'}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align='center'>{row.budget}</TableCell>
                <TableCell align='center'>{row.expectedDays}</TableCell>
                {/* <TableCell>
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
                </TableCell> */}
                {/* <TableCell align='right'>{row.protein}</TableCell> */}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default OffersTable;
