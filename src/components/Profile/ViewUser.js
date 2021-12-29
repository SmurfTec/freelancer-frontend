import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from 'components/common/Loading';
import UserProfile from './UserProfile';
import { useParams } from 'react-router-dom';
import { makeReq } from 'utils/makeReq';
import useToggle from 'hooks/useToggle';

const styles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(4),
  },
}));

const ViewProfile = () => {
  const classes = styles();
  const { id } = useParams();

  const [user, setUser] = useState();
  const [loading, toggleLoading] = useToggle(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resData = await makeReq(`/users/${id}`);
        console.log(`resData`, resData);
        setUser(resData.user);
      } catch (err) {
        setError(true);
      } finally {
        toggleLoading();
      }
    })();
  }, [id]);

  if (!user) return <Loading noTitle />;

  return (
    <section>
      <Container className={classes.container}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant='h5'>No User Found</Typography>
        ) : (
          user && <UserProfile user={user} />
        )}
      </Container>
    </section>
  );
};

export default ViewProfile;
