import { Route, Routes } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Login from 'components/Login';
import Register from 'components/Register';
import LandingPage from 'components/LandingPage';
import ThemeConfig from 'theme';
import ModifyProfile from 'components/Profile/ModifyProfile';

const App = () => {
  return (
    <ThemeConfig>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ModifyProfile />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </ThemeConfig>
  );
};

export default App;
