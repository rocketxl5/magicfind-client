import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/auth/Settings';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';
import Profile from './components/views/Profile';
import UserPage from './components/views/UserPage';
import SearchStore from './components/views/SearchStore';
import SearchAPI from './components/views/SearchAPI';
import Catalog from './components/views/Catalog';
import AddCard from './components/views/AddCard';
import NotFound from './components/views/NotFound';
import ShoppingCart from './components/views/ShoppingCart';
import Confirmation from './components/views/Confirmation';
import RemoveCard from './components/views/RemoveCard';
import ModifyCard from './components/views/ModifyCard';
import MailBox from './components/views/mail/MailBox';
import { UserContext } from './contexts/UserContext';
import { CardContext } from './contexts/CardContext';
import './App.css';

const App = () => {
  const { user } = useContext(UserContext);
  const { cardContext } = useContext(CardContext);

  return (
    <Router>
      <Header />
      <section className="container">
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
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/settings">
            {user ? <Settings /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/me">
            {user ? <UserPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/add-card/:cardName">
            {cardContext ? <AddCard /> : <Redirect to="/search-api" />}
          </Route>
          <Route exact path="/cart">
            <ShoppingCart />
          </Route>
          <Route exaxt path="/confirmation">
            {user ? <Confirmation /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/store">
            {user ? <SearchStore /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/search-api">
            {user ? <SearchAPI /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/catalog/:search">
            <Catalog />
          </Route>
          <Route exact path="/remove-card">
            {cardContext ? <RemoveCard /> : <Redirect to="/store" />}
          </Route>
          <Route exact path="/modify-card">
            {cardContext ? <ModifyCard /> : <Redirect to="/store" />}
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
      </section>
      <Footer />
    </Router>
  );
};

export default App;
