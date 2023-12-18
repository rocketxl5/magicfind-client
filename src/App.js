import {
  Route,
  Routes
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
import SearchCollection from './components/views/search/SearchCollection';
import SearchAPI from './components/views/search/SearchAPI';
import SearchResult from './components/views/search/SearchResult';
import NotFound from './components/views/NotFound';
import ShoppingCart from './components/views/ShoppingCart';
import Inbox from './components/views/mail/Inbox';
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

        {/* Public routes auth / not auth */}
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="search-result/catalog/:cardName" element={<SearchResult />} />
        {/* Public routes not auth */}
        <Route element={<RequireNotAuth />}>
          <Route exact path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        {/* Auth protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="me" element={<AuthPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search-collection" element={<SearchCollection />} />
          <Route path="search-api" element={<SearchAPI />} />
          <Route path="search-result/collection/:cardName" element={<SearchResult />} />
          <Route path="search-result/api/:cardName" element={<SearchResult />} />
          <Route path="mail/inbox" element={<Inbox />} />
          <Route path="mail/:handle/:handle" element={<Inbox />} />
          <Route path="mail/unread" element={<Inbox />} />
          <Route path="mail/sent" element={<Inbox />} />
          <Route path="mail/trash" element={<Inbox />} />
          <Route path="mail/message" element={<Inbox />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >
  );
};

export default App;
