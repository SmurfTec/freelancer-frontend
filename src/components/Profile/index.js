import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from 'contexts/AuthContext';
import Loading from 'components/common/Loading';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';

const styles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
}));

const ViewProfile = () => {
  const classes = styles();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  if (!user) return <Loading noTitle />;

  return (
    <section>
      <Container className={classes.container}>
        <UserProfile user={user} />
      </Container>
    </section>
  );
};

export default ViewProfile;
