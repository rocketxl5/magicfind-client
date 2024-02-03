import {
  Route,
  Routes,
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
      {/* Public routes */}
        {/* Public routes not auth */}
      <Route path="/" element={<Layout />} >
        <Route path="search-result/not-found/:name" element={<CardNotFound />} />
        <Route element={<RequireNotAuth />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="store/:id" element={<Store />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="search-result/:type/:name" element={<SearchResult />} />
        </Route>
      </Route>
        {/* Auth protected routes */}
        <Route element={<RequireAuth />}>
        <Route path="/" element={<AuthLayout />} >
          <Route path="me" element={<AuthPage />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="collection" element={<SearchCollection />} />
            <Route path="store" element={<Store />} />
            <Route path="add-card" element={<SearchAPI />} />
          </Route>
          <Route path="me/shopping-cart" element={<ShoppingCart />} />
          <Route path="me/settings" element={<Settings />} />
          <Route path="me/profile" element={<Profile />} />
          <Route path="me/checkout" element={<Checkout />} />
          <Route path="me/search-result/catalog/:cardName/:userID" element={<SearchResult />} />
          <Route path="me/search-result/catalog/:cardName" element={<SearchResult />} />
          <Route path="me/search-result/collection/:query" element={<SearchResult />} />
          <Route path="me/search-result/api/:cardName" element={<SearchResult />} />
          <Route path="me/mail/*" element={<Inbox />} ></Route>
        </Route>
        </Route>


        {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes >
  );
};

export default App;
