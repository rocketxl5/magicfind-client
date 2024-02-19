import { useEffect } from 'react';
import {
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Routes
} from 'react-router-dom';
// Layouts
import RootLayout from './components/layouts/RootLayout';
import Layout from './components/layouts/Layout';
import AuthLayout from './components/layouts/AuthLayout';


import RequireAuth from './components/layouts/RequireAuth';
import RequireUnauth from './components/layouts/RequireUnauth';
import UnrestrictedLayout from './components/layouts/UnrestrictedLayout'

// Views
import AuthPage from './components/views/AuthPage';
import Login from './components/auth/forms/Login';
import Signup from './components/auth/forms/Signup';
import Settings from './components/auth/Settings';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';
import Profile from './components/views/Profile';
import SearchResults from './components/views/search/SearchResults';
import NotFound from './components/layout/NotFound';
import CardNotFound from './components/views/search/CardNotFound';
import ShoppingCart from './components/views/ShoppingCart';
import DashBoard from './components/views/DashBoard';
import Collection from './components/views/search/Collection';
import Archive from './components/views/search/Archive';
import Checkout from './components/views/Checkout';
import Inbox from './components/views/mail/Inbox';
import Store from './components/views/Store';
import ProductDetails from './components/views/search/ProductDetails';
import useSearch from './hooks/useSearch';
import './assets/css/reset.css';
import './App.css';
import './assets/css/utilities.css';
import './assets/css/style.css';
import './assets/css/navbar.css';
import './assets/css/form.css';
import './assets/css/media-queries.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUpdateCatalog } = useSearch();

  useEffect(() => {
    localStorage.setItem('pathname', JSON.stringify(location.pathname));
  }, [location])

  useEffect(() => {
    if (localStorage.getItem('pathname')) {
      navigate(JSON.parse(localStorage.getItem('pathname')));
    }
    setUpdateCatalog(true);
  }, [])

  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        {/* Cannot access if authenticated */}
        <Route element={<Layout />}>
        <Route element={<RequireUnauth />}>
          <Route index element={<Home />} />
          <Route path="home" exact element={<Navigate to="/" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        </Route>
        {/* Auth protected routes */}
        <Route element={<AuthLayout />} >
        <Route element={<RequireAuth />}>
          <Route index element={<AuthPage />} />
          <Route path="me" exact element={<AuthPage />}>
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
        <Route element={<UnrestrictedLayout />} >
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="catalog/:query" element={<SearchResults />} />
          <Route path="search-results/not-found/:name" element={<CardNotFound />} />
          <Route path="store/:id" element={<Store />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
        {/* <Route path="search-results/" element={<SearchResults />} /> */}
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    // <Routes>
    //   <Route path="/" element={<RootLayout />} >
    //     {/* Auth protected routes */}
    //     <Route element={<RequireNotAuth />}>  
    //     <Route element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="home" exact element={<Navigate to="/" replace />} />
    //         <Route path="about" element={<About />} />
    //         <Route path="contact" element={<Contact />} />
    //         {/* </Route> */}
    //       <Route path="login" element={<Login />} />
    //       <Route path="signup" element={<Signup />} />
    //       <Route path="reset-password" element={<ResetPassword />} />
    //       </Route>
    //     </Route>
    //     <Route element={<RequireAuth />}>
    //     <Route element={<AuthLayout />} >
    //         <Route index element={<AuthPage />} />
    //         <Route path="me" exact element={<AuthPage />}>
    //           <Route path="dashboard" element={<DashBoard />} />
    //           <Route path="collection" element={<Collection />} />
    //           <Route path="collection/:query" element={<SearchResults />} />
    //           {/* <Route path="details" element={<ProductDetails />} /> */}
    //           <Route path="archive" exact element={<Archive />} />
    //           <Route path="archive/:query" element={<SearchResults />} />

    //           {/* <Route path="details" element={<ProductDetails />} /> */}
    //           <Route path="store" element={<Store />} />
    //           <Route path="settings" element={<Settings />} />
    //           <Route path="profile" element={<Profile />} />
    //           <Route path="checkout" element={<Checkout />} />
    //           <Route path="mail" element={<Inbox />} />
    //         </Route>
    //       </Route>
    //     </Route>
    //     <Route path="catalog/:query" element={<SearchResults />} />
    //     <Route path="store/:id" element={<Store />} />
    //     <Route path="shopping-cart" element={<ShoppingCart />} />
    //     <Route path="search-results/not-found/:name" element={<CardNotFound />} />
    //     {/* <Route path="search-results/" element={<SearchResults />} /> */}
    //     {/* Catch all */}
    //     <Route path="*" element={<NotFound />} />
    //   </Route>
    // </Routes>

  );
};

export default App;
