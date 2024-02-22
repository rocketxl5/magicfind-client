import {
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';


import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import RestrictedRoutes from './routes/RestrictedRoutes';

// Views
import AuthPage from './components/views/AuthPage';
import Login from './components/auth/forms/Login';
import Signup from './components/auth/forms/Signup';
import Settings from './components/auth/Settings';
import ResetPassword from './components/auth/ResetPassword';
import Home from './pages/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';
import Profile from './components/views/Profile';
import SearchResults from './components/views/search/SearchResults';

import CardNotFound from './pages/CardNotFound';
import PageNotFound from './pages/PageNotFound';
import ShoppingCart from './components/views/ShoppingCart';
import DashBoard from './components/views/DashBoard';
import Collection from './features/search/Collection'
import Archive from './features/search/Archive'
import Checkout from './components/views/Checkout';
import Inbox from './components/views/mail/Inbox';
import Store from './components/views/Store';
import ProductDetails from './components/views/search/ProductDetails';
import './assets/css/reset.css';
import './App.css';
import './assets/css/utilities.css';
import './assets/css/style.css';
import './assets/css/navbar.css';
import './assets/css/form.css';
import './assets/css/media-queries.css';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        {/* Authenticated routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<AuthLayout />} >
            {/* <Route index element={<AuthPage />} /> */}
            <Route path="/" element={<Navigate to="/me" replace />} />
            <Route path="me" element={<AuthPage />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="collection" element={<Collection />} />
            <Route path="collection/:query" element={<SearchResults />} />
            {/* <Route path="details" element={<ProductDetails />} /> */}
            <Route path="archive" exact element={<Archive />} />
            <Route path="archive/:query" element={<SearchResults />} />

            {/* <Route path="details" element={<ProductDetails />} /> */}
            <Route path="store" element={<Store />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="mail" element={<Inbox />} />
          </Route>
          </Route>
        </Route>
        {/* Unauthenticated routes */}
        <Route element={<RestrictedRoutes />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />} >
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="catalog/:query" element={<SearchResults />} />
          <Route path="not-found/:name" element={<CardNotFound />} />
          <Route path="store/:id" element={<Store />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
        {/* Catch all */}
        <Route path="*" element={< PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
