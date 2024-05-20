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

// Public pages
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Home from './pages/public/Home';
import Login from './auth/Login';
import NotFound from './pages/public/NotFound';
import Product from './pages/public/Product';
import SearchResults from './pages/public/SearchResults';
import Seller from './pages/public/Seller';
import ShoppingCart from './pages/public/ShoppingCart';
import Signup from './auth/Signup';

// Private pages
import Archive from './pages/private/Archive';
// import AuthPage from './pages/private/AuthPage';
import Checkout from './pages/private/Checkout';
import Collection from './pages/private/Collection';
import DashBoard from './pages/private/DashBoard';
import Decks from './pages/private/Decks';
import MailBox from './pages/private/MailBox';
import Profile from './pages/private/Profile';
import ResetPassword from './pages/private/ResetPassword';
import Settings from './pages/private/Settings';
import Store from './pages/private/Store';

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
            <Route path="me" element={<DashBoard />}>
              <Route path="decks" element={<Decks />} />
              {/* <Route path="decks/:query" element={<Deck />} /> */}
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
