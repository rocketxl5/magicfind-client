import {
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

// Layouts
import RootLayout from './layout/RootLayout';
import Layout from './layout/Layout';
import AuthLayout from './layout/AuthLayout';

// Routes
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import RestrictedRoutes from './routes/RestrictedRoutes';

// Views
import Login from './auth/Login';
import Signup from './auth/Signup';
import Settings from './auth/Settings';
import ResetPassword from './auth/ResetPassword';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';

import NotFound from './pages/NotFound';
import ShoppingCart from './pages/ShoppingCart';
import DashBoard from './pages/DashBoard';
import Archive from './features/search/Archive';
import Collection from './features/search/Collection';
import Store from './features/search/Store';
import Checkout from './pages/Checkout';
import MailBox from './features/mail/MailBox';
import Seller from './pages/Seller';
import Product from './pages/Product';

// Hooks
import useAuth from './hooks/contexthooks/useAuth';

// CSS
import './styles/reset.css';
import './styles/utilities.css';
import './styles/style.css';
import './styles/navbar.css';
import './styles/form.css';
import './styles/media-queries.css';
import './App.css';

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        {/* Unauthenticated only routes */}
        <Route element={<RestrictedRoutes />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* Authenticated only routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<AuthLayout />} >
            <Route path="/" element={<Navigate to="/me" replace />} />
            <Route path="me" element={<AuthPage />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="collection" element={<Collection />} />
              <Route path="collection/:query" element={<SearchResults />} />
              <Route path="archive" element={<Archive />} />
              <Route path="archive/:query" element={<SearchResults />} />
              <Route path="store" element={<Store />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="mail" element={<MailBox />} >
                <Route path="*" element={<MailBox />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Authenticated and Unauthenticated  */}
        <Route element={<PublicRoutes />} >
          <Route element={!isAuth ? <Layout /> : <AuthLayout />}>
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="catalog/:query" element={<SearchResults />} />
            <Route path="seller/:id" element={<Seller />} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="product/:id" element={<Product />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={< NotFound />} />

      </Route>
    </Routes>
  );
};

export default App;
