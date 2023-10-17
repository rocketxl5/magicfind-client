import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Settings from './components/auth/Settings';
import ResetPassword from './components/auth/ResetPassword';
import Success from './components/auth/Success';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';
import Profile from './components/views/Profile';
import UserPage from './components/views/UserPage';
import SearchCollection from './components/views/SearchCollection';
import SearchAPI from './components/views/SearchAPI';
import SearchResult from './components/views/search/SearchResult';
import AddCard from './components/views/AddCard';
import NotFound from './components/views/NotFound';
import ShoppingCart from './components/views/ShoppingCart';
import Confirmation from './components/views/Confirmation';
import RemoveCard from './components/views/RemoveCard';
import ModifyCard from './components/views/ModifyCard';
import MailBox from './components/views/mail/MailBox';
import { UserContext } from './contexts/UserContext';
import { CardContext } from './contexts/CardContext';
import { PathContext } from './contexts/PathContext';
import './css/reset.css';
import './App.css';
import './css/utilities.css';
import './css/style.css';
import './css/navbar.css';
import './css/form.css';
import './css/media-queries.css';

const App = () => {

  const { user } = useContext(UserContext);
  const { cardContext } = useContext(CardContext);
  const { path } = useContext(PathContext);

  return (
    <Router>
      {(path !== '/login' && path !== '/signup') && <Header />}
      <main className="wrapper">
        <Switch>
          <Route exact path="/">
            {!user ? <Home /> : <Redirect to="/me" />}
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/login">
            {!user ? <Login /> : <Redirect to="/me" />}
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/reset-password">
            <ResetPassword />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/settings">
            {user ? <Settings /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/me">
            {user ? <UserPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/add-card/:cardName">
            {cardContext ? <AddCard /> : <Redirect to="/me" />}
          </Route>
          <Route exact path="/remove-card/:cardName">
            {cardContext ? <RemoveCard /> : <Redirect to="/me" />}
          </Route>
          <Route exact path="/modify-card/:cardName">
            {cardContext ? <ModifyCard /> : <Redirect to="/me" />}
          </Route>
          <Route exact path="/shopping-cart">
            <ShoppingCart />
          </Route>
          <Route exaxt path="/confirmation">
            {user ? <Confirmation /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/search-store">
            {user ? <SearchCollection /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/search-api">
            {user ? <SearchAPI /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/search-result/:searchType/:cardName">
            <SearchResult />
          </Route>
          <Route exact path="/mail/inbox">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/mail/:handle/:handle">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/mail/unread">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/mail/sent">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/mail/trash">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/mail/message">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
