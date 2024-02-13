import {
  Route,
  Routes,
  useParams,
  useLocation,
  Navigate
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import RequireAuth from './components/auth/RequireAuth';
import RequireNotAuth from './components/auth/RequireNotAuth';
import AuthPage from './components/views/AuthPage';
import Login from './components/auth/forms/Login';
import Signup from './components/auth/forms/Signup';
import Settings from './components/auth/Settings';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';
import Profile from './components/views/Profile';
import SearchResult from './components/views/search/SearchResult';
import NotFound from './components/layout/NotFound';
import CardNotFound from './components/views/search/CardNotFound';
import ShoppingCart from './components/views/ShoppingCart';
import DashBoard from './components/views/DashBoard';
import SearchCollection from './components/views/search/SearchCollection';
import SearchAPI from './components/views/search/SearchAPI';
import Checkout from './components/views/Checkout';
import Inbox from './components/views/mail/Inbox';
import Store from './components/views/Store';
import ProductDetails from './components/views/search/ProductDetails';
import useAuth from './hooks/useAuth';
import './assets/css/reset.css';
import './App.css';
import './assets/css/utilities.css';
import './assets/css/style.css';
import './assets/css/navbar.css';
import './assets/css/form.css';
import './assets/css/media-queries.css';

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
        {/* Public routes not auth */}
      <Route path="/" element={!isAuth ? <Layout /> : <AuthLayout />} >
        <Route element={<RequireNotAuth />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="store/:id" element={<Store />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        {/* Auth protected routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<AuthPage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="me" exact element={<AuthPage />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="collection" element={<SearchCollection />} />
            <Route path="collection/:id" element={<SearchResult />} >
              <Route path="details" element={<ProductDetails />} />
            </Route>
            <Route path="add-card" element={<SearchAPI />} />
            <Route path="add-card/:id" element={<SearchResult />} >
              <Route path="details" element={<ProductDetails />} />
            </Route>
            <Route path="store" element={<Store />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="mail" element={<Inbox />} ></Route>
          </Route>
        </Route>
        <Route path="search-results/" element={<SearchResult />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="search-results/not-found/:name" element={<CardNotFound />} />
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >
  );
};

export default App;
