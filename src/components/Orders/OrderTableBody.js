import {
  TableCell,
  TableRow,
  Box,
  IconButton,
  Avatar,
  Grow,
  Paper,
  ClickAwayListener,
  Popper,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import Label from 'components/common/Label';
import React, { useContext, useState } from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import useToggle from 'hooks/useToggle';
import UploadSubmission from './UploadSubmissionDialog';
import { MoreHoriz } from '@material-ui/icons';
import { OrdersContext } from 'contexts/OrdersContext';
import GiveReview from './ReviewDialog';

const OrderTableBody = ({
  data,
  isBuyer,
  classes_s,
  showSubmission,
  showActions,
  manageOrder,
}) => {
  const [isUploadOpen, toggleUploadOpen] = useToggle(false);
  const [uploadOrderId, setUploadOrderId] = useState();
  const [orderStatusId, setOrderStatusId] = useState();
  const [isReviewOpen, toggleReviewOpen] = useToggle(false);
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

  const handleOrderStatus = (status) => {
    manageOrder(orderStatusId, status);
    handleToggle();
  };

  const handleReview = (body) => {
    manageOrder(orderStatusId, 'completed', body);
    toggleReviewOpen();
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

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

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
              <TableCell>
                <IconButton
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup='true'
                  onClick={() => {
                    setOrderStatusId(order._id);
                    handleToggle();
                  }}
                >
                  <MoreHoriz />
                </IconButton>
              </TableCell>
            ))}
        </TableRow>
      ))}
      <UploadSubmission
        open={isUploadOpen}
        toggleDialog={toggleUploadOpen}
        handleCreate={handleSubmission}
      />
      <GiveReview
        open={isReviewOpen}
        toggleDialog={toggleReviewOpen}
        handleCreate={handleReview}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={toggleReviewOpen}>Complete</MenuItem>
                  <MenuItem onClick={() => handleOrderStatus('notAccepted')}>
                    Not Approved
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default OrderTableBody;
