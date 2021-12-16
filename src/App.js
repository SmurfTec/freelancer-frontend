import { Route, Routes } from 'react-router-dom';
import Login from 'components/Login';
import Register from 'components/Register';
import LandingPage from 'components/LandingPage';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ThemeConfig from 'theme';
import BuyerHome from 'components/BuyerHome';
import ViewGig from 'components/Gigs/ViewGig';

const App = () => {
  return (
    <ThemeConfig>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/buyerhome' element={<BuyerHome />} />
        <Route path='/gigs/:id' element={<ViewGig />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </ThemeConfig>
  );
};

export default App;
