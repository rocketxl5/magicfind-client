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

import CardNotFound from './pages/CardNotFound';
import PageNotFound from './pages/PageNotFound';
import ShoppingCart from './pages/ShoppingCart';
import DashBoard from './pages/DashBoard';
import Collection from './features/search/Collection'
import Archive from './features/search/Archive'
import Checkout from './pages/Checkout';
import Inbox from './features/mail/Inbox';
import Store from './pages/Store';
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
// import './App.css';

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        {/* Authenticated and Unauthenticated  */}
        <Route element={<PublicRoutes />} >
          <Route element={<Layout />}>
            {/* <Route element={!isAuth ? <Layout /> : <AuthLayout />}> */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="catalog/:query" element={<SearchResults />} />
            <Route path="not-found/:name" element={<CardNotFound />} />
            <Route path="store/:id" element={<Store />} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="product/:id" element={<Product />} />
          </Route>
        {/* Authenticated only routes */}
          <Route element={isAuth && <PrivateRoutes />}>
            <Route element={<AuthLayout />} >
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
              <Route path="mail" element={<Inbox />} />
            </Route>
          </Route>
        </Route>
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
        </Route>
        {/* Catch all */}
        <Route path="*" element={< PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
