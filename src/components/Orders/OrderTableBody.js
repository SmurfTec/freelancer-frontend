import {
  TableCell,
  TableRow,
  Box,
  IconButton,
  Avatar,
} from '@material-ui/core';
import Label from 'components/common/Label';
import React, { useContext, useState } from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import useToggle from 'hooks/useToggle';
import UploadSubmission from './UploadSubmissionDialog';
import { MoreHoriz } from '@material-ui/icons';
import { OrdersContext } from 'contexts/OrdersContext';

const OrderTableBody = ({
  data,
  isBuyer,
  classes_s,
  showSubmission,
  showActions,
}) => {
  const [isUploadOpen, toggleUploadOpen] = useToggle(false);
  const [uploadOrderId, setUploadOrderId] = useState();
  const { submitOrder } = useContext(OrdersContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'warning';
      case 'completed':
        return 'primary';
      case 'delivered':
        return 'info';

      default:
        return 'primary';
    }
  };

  const renderUserCells = (order) => {
    if (isBuyer === true) {
      return (
        <>
          <TableCell component='th' scope='row'>
            <Box className={classes_s.gigImg}>
              <Avatar
                alt={order.buyer.fullName}
                src={
                  order.buyer.photo ||
                  `https://ui-avatars.com/api/?rounded=true&name=${order.buyer.fullName
                    .split(' ')
                    .join('+')}`
                }
                style={{
                  width: 35,
                  height: 35,
                }}
              />
            </Box>
          </TableCell>
          <TableCell>{order.buyer.fullName}</TableCell>
        </>
      );
    } else
      return (
        <>
          {' '}
          <TableCell component='th' scope='row'>
            <Box className={classes_s.gigImg}>
              <Avatar
                alt={order.seller.fullName}
                src={
                  order.seller.photo ||
                  `https://ui-avatars.com/api/?rounded=true&name=${order.seller.fullName
                    .split(' ')
                    .join('+')}`
                }
              />
            </Box>
          </TableCell>
          <TableCell>{order.seller.fullName}</TableCell>
        </>
      );
  };

  const gotoSubmission = (e) => {
    const { link } = e.currentTarget.dataset;
    window.open(link);
  };

  const handleSubmissionUpload = (e) => {
    const { orderid } = e.currentTarget.dataset;
    console.log(`orderid`, orderid);
    setUploadOrderId(orderid);
    toggleUploadOpen();
  };

  const handleSubmission = (url) => {
    toggleUploadOpen();
    submitOrder(uploadOrderId, url);
    // console.log(`url`, url);
  };

  return (
    <>
      {data?.map((order) => (
        <TableRow key={order._id}>
          {renderUserCells(order)}
          <TableCell>{order.offer.description}</TableCell>
          <TableCell>{new Date(order.deadline).toDateString()}</TableCell>
          <TableCell>${order.offer.budget}</TableCell>
          <TableCell>
            <Label color={getStatusColor(order.status)}>{order.status}</Label>
          </TableCell>
          {showSubmission && (
            <TableCell
              style={{
                cursor: 'pointer',
              }}
              data-link={order.submission}
              onClick={gotoSubmission}
            >
              {order.submission?.slice(0, 15)}
            </TableCell>
          )}
          {showActions &&
            (isBuyer === false ? (
              <TableCell>
                <IconButton
                  onClick={handleSubmissionUpload}
                  data-orderid={order._id}
                  color='primary'
                >
                  <BackupIcon />
                </IconButton>
              </TableCell>
            ) : (
              <IconButton
                aria-label='show more'
                // aria-controls={menuId}
                // data-gigtitle={row.title}
                aria-haspopup='true'
                // onClick={handleMenuOpen}
                style={
                  {
                    // marginLeft: 'auto',
                    // color: '#cccccc',
                  }
                }
              >
                <MoreHoriz />
              </IconButton>
            ))}
        </TableRow>
      ))}
      <UploadSubmission
        open={isUploadOpen}
        toggleDialog={toggleUploadOpen}
        handleCreate={handleSubmission}
      />
    </>
  );
};

export default OrderTableBody;
