import { Navigate, Route, Routes } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Login from 'components/Login';
import Register from 'components/Register';
import LandingPage from 'components/LandingPage';
import ThemeConfig from 'theme';
import ViewProfile from 'components/Profile/ViewProfile';
import CreateGig from 'components/Gigs/CreateGig';
import CreateProfile from 'components/Profile/CreateProfile';

const App = () => {
  return (
    <ThemeConfig>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route exact path='/profile' element={<ViewProfile />} />
        <Route exact path='/profile/create' element={<CreateProfile />} />
        <Route exact path='/gig/create' element={<CreateGig />} />
        <Route exact path='/' element={<LandingPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </ThemeConfig>
  );
};

export default App;
