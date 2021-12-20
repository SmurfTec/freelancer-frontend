import { useRoutes } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ThemeConfig from 'theme';
import Profile from 'components/Profile';
// import ModifyProfile from 'components/Profile/ModifyProfile';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import {
  commonRotues,
  loading,
  protechtedRoutes,
  publicRoutes,
} from 'Routers/routes';

const App = () => {
  const { token, user } = useContext(AuthContext);
  const [routes, setRoutes] = useState(loading);
  useEffect(() => {
    if (token && user) setRoutes(protechtedRoutes.concat(commonRotues));
    else if (token) setRoutes(loading);
    else setRoutes(publicRoutes.concat(commonRotues));
  }, [user, token]);

  const content = useRoutes(routes);

  return (
    <ThemeConfig>
      {content}

      {/* <Routes>
        <Route exact path='/profile' element={<ViewProfile />} />
        <Route exact path='/profile/create' element={<CreateProfile />} />
        <Route exact path='/gig/create' element={<CreateGig />} />
        <Route exact path='/' element={<LandingPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes> */}
    </ThemeConfig>
  );
};

export default App;
