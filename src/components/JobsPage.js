import React, { useContext } from 'react';
import NavBar from 'components/common/Navbar';
import Banner from './common/Banner';
import CarouselLayout from 'components/Carousel/CarouselLayout';
import CategoryCard from 'components/common/CategoryCard';
import { services } from 'data';
import styles from 'styles/commonStyles';
import { Box, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CircleIcon from '@material-ui/icons/CheckCircleOutline';
import img from 'assets/serviceDesc.jpg';
import { categories } from 'data';
import SubCategoryCard from './common/SubCategoryCard';
import { Container } from '@material-ui/core';
import Footer from './common/Footer';

import img1 from 'assets/airbus-logo2.svg';
import img2 from 'assets/amazon_logo2.svg';
import img3 from 'assets/deloitte-logo2.svg';
import img4 from 'assets/facebook-corporate-logo2.svg';
import img5 from 'assets/fujitsu-logo.svg';
import img6 from 'assets/google-logo.svg';
import img7 from 'assets/ibm-logo2.svg';
import { v4 } from 'uuid';
import { DataContext } from 'contexts/DataContext';
import { Skeleton } from '@material-ui/lab';
import DevReqCard from './DevRequest/DevReqCard';
import { AuthContext } from 'contexts/AuthContext';
import { DevRequestsContext } from 'contexts/DevRequestsContext';

const supporters = [img1, img2, img3, img4, img5, img6, img7];

const RenderContent = ({ loading, data, handleCatClick }) => (
  <Grid container spacing={2}>
    {loading
      ? Array(20)
          .fill()
          .map(() => (
            <Grid item xs={6} sm={3} md={3} lg={2} key={v4()}>
              <Skeleton variant='react' height={200} />
            </Grid>
          ))
      : data?.map((el) => (
          <Grid item xs={6} sm={3} md={3} lg={3} key={el.value}>
            <DevReqCard devRequest={el} handleClick={handleCatClick} />
          </Grid>
        ))}
  </Grid>
);

const JobsPage = () => {
  const classes = styles();
  const handleCatClick = () => {};
  const { user } = useContext(AuthContext);

  const { devRequests, loadingDevRequests } = useContext(DataContext);
  const { myDevRequests: usersRequests, loadingMyRequests } =
    useContext(DevRequestsContext);

  return (
    <React.Fragment>
      <Container maxWidth='1400'>
        <Typography variant='h4'>Popular Jobs</Typography>

        <RenderContent
          loading={
            user?.role === 'buyer' ? loadingMyRequests : loadingDevRequests
          }
          data={user?.role === 'buyer' ? usersRequests : devRequests}
          handleCatClick={handleCatClick}
        />
      </Container>
    </React.Fragment>
  );
};

export default JobsPage;
