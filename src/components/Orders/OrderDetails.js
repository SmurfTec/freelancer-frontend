import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Skeleton } from '@material-ui/lab';
import Loading from 'components/common/Loading';
import { AuthContext } from 'contexts/AuthContext';
import useFetch from 'hooks/useFetch';
import React, { useContext, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_BASE_URL, handleCatch, makeReq } from 'utils/makeReq';
import CountDown from 'components/common/CountDown';
import { AttachFile, Cancel, CheckCircle, Publish } from '@material-ui/icons';

import useCommonStyles from 'styles/commonStyles';
import axios from 'axios';
import useToggle from 'hooks/useToggle';
import CreateReview from './CreateReviewDialog';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1200,
  },
  OrderMain: {
    // padding: 20,
    border: '1px solid #ccc',
    minHeight: 400,
  },
  OrderIntro: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  OrderDetails: {
    paddingBlock: 10,
  },
  OrderSide: {
    // padding: 20,
    height: 'fit-content',
    border: '1px solid #ccc',
  },
}));

const RenderOrderSide = ({ order, user, submitFile, handleApproval }) => {
  const [submission, setSubmission] = useState();
  const classes = useCommonStyles();

  const SubmissionActions = () => (
    <Typography variant='subtitle2'>
      Mark as
      <IconButton onClick={() => handleApproval('completed')}>
        <CheckCircle color='primary' />
      </IconButton>
      <IconButton onClick={() => handleApproval('incomplete')}>
        <Cancel color='error' />
      </IconButton>
    </Typography>
  );

  const theme = useTheme();
  console.log(`order`, order);
  if (!order) return <Skeleton />;

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    // TODO - which files are accepable

    setSubmission(selectedFile);
  };

  const handleSubmit = () => {
    submitFile(submission);
  };

  if (order.status === 'active')
    return (
      <Box>
        <Box textAlign='center'>
          <Typography
            style={{ color: theme.palette.primary.main }}
            variant='h5'
            color='success'
            gutterBottom
          >
            Active
          </Typography>
          <CountDown deadline={order.deadline} />

          <Divider style={{ marginBottom: '1rem' }} />
          {user._id === order.seller._id && (
            <>
              <Box className={classes.uploadFileBox} justifyContent='center'>
                <div className={classes.uploadFile}>
                  <input id='fileuploadBtn' type='file' onChange={uploadFile} />
                </div>
                <label htmlFor='fileuploadBtn'>
                  <Button
                    variant='contained'
                    color='primary'
                    component='span'
                    endIcon={<Publish />}
                    size='small'
                  >
                    Attach File
                  </Button>
                </label>{' '}
              </Box>
              {submission && (
                <Box>
                  <Typography variant='body2'>{submission.name}</Typography>
                  <Typography variant='subtitle2'>
                    Submit
                    <IconButton>
                      <CheckCircle color='primary' onClick={handleSubmit} />
                    </IconButton>
                    <IconButton onClick={() => setSubmission()}>
                      <Cancel color='error' />
                    </IconButton>
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    );

  if (order.status === 'delivered')
    return (
      <Box>
        <Typography
          align='center'
          variant='h5'
          style={{
            color: 'orange',
          }}
        >
          Delivered
        </Typography>
        {user._id === order.buyer._id ? (
          <>
            <Typography
              style={{ cursor: 'pointer', color: 'grey' }}
              onClick={(e) => {
                e.preventDefault();
                window.open(order.submission);
              }}
              variant='subtitle2'
            >
              View Submission
            </Typography>
            <SubmissionActions />
          </>
        ) : (
          <Typography variant='subtitle2'>Waiting for Approval</Typography>
        )}
      </Box>
    );

  if (order.status === 'incomplete')
    return (
      <Box>
        <Typography variant='h5'>InComplete</Typography>
        {user._id === order.buyer._id ? (
          <>
            <Typography
              style={{ cursor: 'pointer', color: 'grey' }}
              onClick={(e) => {
                e.preventDefault();
                window.open(order.submission);
              }}
              variant='subtitle2'
            >
              View Submission
            </Typography>
            <SubmissionActions />
          </>
        ) : (
          <Button
            color='primary'
            size='small'
            endIcon={<AttachFile />}
            variant='contained'
          >
            Submit Files
          </Button>
        )}
      </Box>
    );

  return (
    <Box>
      <Typography variant='h5' color='primary'>
        Completed
      </Typography>
      <Typography
        style={{ cursor: 'pointer', color: 'grey' }}
        onClick={(e) => {
          e.preventDefault();
          window.open(order.submission);
        }}
        variant='subtitle2'
      >
        View Submission
      </Typography>
    </Box>
  );
};

const OrderDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isReviewOpen, toggleReviewOpen] = useToggle(false);
  const { token, user } = useContext(AuthContext);
  let {
    value: order,
    loading,
    error,
    setValue: setOrder,
  } = useFetch(
    `${API_BASE_URL}/orders/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
    [id],
    'order'
  );

  const handleCreateReview = async ({ review, rating }) => {
    const resData = await makeReq(
      `/orders/manageorder/${order._id}`,
      { body: { status: 'completed', review, rating } },
      'PATCH'
    );
    console.log(`resData`, resData);
    setOrder(resData.order);
    toggleReviewOpen();
  };

  const handleApproval = async (status) => {
    console.log(`status`, status);
    if (status === 'incomplete') {
      const resData = await makeReq(
        `/orders/manageorder/${order._id}`,
        { body: { status: status } },
        'PATCH'
      );
      console.log(`resData`, resData);
      setOrder(resData.order);
    } else {
      toggleReviewOpen();
    }
  };

  const submitFile = (submission) => {
    let reader = new FileReader();
    reader.readAsDataURL(submission);
    reader.onloadend = async (e) => {
      //console.log(`result onLoadEnd`, e.target.result);
      const file = e.target.result;

      // TODO  Delete Image from cloudinary if it exists on this user

      // // * 1 Upload Image on Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        formData
      );
      const uploadedImage = res.data.url;
      console.log(`res`, res);

      try {
        const resData = await makeReq(
          `/orders/deliverorder/${order._id}`,
          { body: { submission: res.data.url } },
          'PATCH'
        );
        console.log(`resData`, resData);
      } catch (err) {
        handleCatch(err);
      } finally {
      }
    };
  };

  const orderUser = useMemo(() => {
    if (!user || !order) return;
    return user?.role === 'buyer'
      ? ['Seller', order.seller]
      : ['Buyer', order.buyer];
  }, [user, order]);

  // const isBuyer = useMemo(() => {
  //   return user?.role === 'buyer';
  // }, [user]);

  if (loading || !order) return <Loading noTitle />;

  if (error) navigate(`/dashboard`);

  console.log(`order`, order);

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={0} sm={1} />
        <Grid item xs={12} sm={7} className={classes.OrderMain}>
          <Box className={classes.OrderIntro}>
            <Box>
              <Typography variant='h3'>Order</Typography>
              <Box display='flex' alignItems='center' gridGap='10px'>
                <Typography variant='body1'>{orderUser[0]}</Typography>
                <Typography
                  variant='body1'
                  component={Link}
                  to={`/users/${orderUser[1]?._id}`}
                  color='textPrimary'
                >
                  {orderUser[1]?.fullName}
                </Typography>
                |
                <Typography variant='body2'>
                  {new Date(order.createdAt).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                variant='h3'
                color='textSecondary'
                fontWeight='normal'
              >
                ${order.offer?.budget}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box className={classes.OrderDetails}>
            <Typography variant='body1'>{order.offer.description}</Typography>
          </Box>
        </Grid>
        <Grid item xs={0} sm={1} />
        <Grid item xs={12} sm={3} className={classes.OrderSide}>
          <RenderOrderSide
            order={order}
            user={user}
            submitFile={submitFile}
            handleApproval={handleApproval}
          />
          <CreateReview
            open={isReviewOpen}
            toggleDialog={toggleReviewOpen}
            handleCreate={handleCreateReview}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetails;
