import { Route, Routes, useRoutes } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Login from 'components/Login';
import Register from 'components/Register';
import LandingPage from 'components/LandingPage';
import ThemeConfig from 'theme';
import ModifyProfile from 'components/Profile/ModifyProfile';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import PublicRoute from 'Routers/PublicRoute';
import ProtechtedRoute from 'Routers/ProtechtedRoute';
import { loading, protechtedRoutes, publicRoutes } from 'Routers/routes';

const App = () => {
  const { token, user } = useContext(AuthContext);
  const [routes, setRoutes] = useState(loading);
  useEffect(() => {
    if (token && user) setRoutes(protechtedRoutes);
    else if (token) setRoutes(loading);
    else setRoutes(publicRoutes);
  }, [user, token]);

  const content = useRoutes(routes);

  return (
    <ThemeConfig>
      {content}
      {/* <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <ProtechtedRoute path='/profile' element={<ModifyProfile />} />
        <PublicRoute path='/' element={<LandingPage />} />
      </Routes> */}
    </ThemeConfig>
  );
};

export default App;
