import {
  Route,
  Routes,
  Navigate,
  useParams
} from 'react-router-dom';
import Layout from './components/layout/Layout';
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
import NotFound from './components/views/NotFound';
import CardNotFound from './components/views/search/CardNotFound';
import ShoppingCart from './components/views/ShoppingCart';
import Checkout from './components/views/Checkout';
import Inbox from './components/views/mail/Inbox';
import Store from './components/views/Store';
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
      <Route path="/" element={<Layout />} >

        {/* Public routes */}
        <Route path="search-result/not-found/:cardName" element={<CardNotFound />} />
        {/* Public routes not auth */}
        <Route element={<RequireNotAuth />}>
          <Route exact path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="store/:userID" element={<Store />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="search-result/:searchType/:cardName" element={<SearchResult />} />
        </Route>

        {/* Auth protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="me" exact element={<Navigate replace to="../me/home" />} />
          <Route path="me/:path" element={<AuthPage />} />
          <Route path="me/search-result/:searchType/:cardName" exact element={<SearchResult />} />
          <Route path="me/shopping-cart" element={<ShoppingCart />} />
          <Route path="me/settings" element={<Settings />} />
          <Route path="me/profile" element={<Profile />} />
          <Route path="me/checkout" element={<Checkout />} />
          {/* <Route path="search-result/collection/:query" element={<SearchResult />} />
          <Route path="search-result/api/:cardName" element={<SearchResult />} /> */}
          <Route path="me/mail" exact element={<Navigate replace to="../me/mail/inbox" />} />
          <Route path="me/mail/:path" element={<Inbox />} />
          {/* <Route path="me/mail/:handle/:handle" element={<Inbox />} />
          <Route path="me/mail/unread" element={<Inbox />} />
          <Route path="me/mail/sent" element={<Inbox />} />
          <Route path="me/mail/trash" element={<Inbox />} />
          <Route path="me/mail/message" element={<Inbox />} /> */}
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >
  );
};

export default App;
