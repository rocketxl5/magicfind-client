import {
  Route,
  Routes
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';
import AuthPage from './components/views/AuthPage';
import Login from './components/auth/forms/Login';
import Signup from './components/auth/forms/Signup';
import Settings from './components/auth/Settings';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';
import Profile from './components/views/Profile';
import SearchCollection from './components/views/SearchCollection';
import SearchAPI from './components/views/SearchAPI';
import SearchResult from './components/views/search/SearchResult';
import AddCard from './components/views/AddCard';
import NotFound from './components/views/NotFound';
import ShoppingCart from './components/views/ShoppingCart';
import RemoveCard from './components/views/RemoveCard';
import ModifyCard from './components/views/ModifyCard';
import MailBox from './components/views/mail/MailBox';
import './css/reset.css';
import './App.css';
import './css/utilities.css';
import './css/style.css';
import './css/navbar.css';
import './css/form.css';
import './css/media-queries.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >

        {/* Public routes */}
        <Route exact path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="search-result/:cardName" element={<SearchResult />} />

        {/* Auth protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="me" element={<AuthPage />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-card/:cardName" element={<AddCard />} />
          <Route path="remove-card/:cardName" element={<RemoveCard />} />
          <Route path="modify-card/:cardName" element={<ModifyCard />} />
          <Route path="search-collection" element={<SearchCollection />} />
          <Route path="search-api" element={<SearchAPI />} />
          <Route path="mail/inbox" element={<MailBox />} />
          <Route path="mail/:handle/:handle" element={<MailBox />} />
          <Route path="mail/unread" element={<MailBox />} />
          <Route path="mail/sent" element={<MailBox />} />
          <Route path="mail/trash" element={<MailBox />} />
          <Route path="mail/message" element={<MailBox />} />
          </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >
  );
};

export default App;
