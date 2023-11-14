import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthPage from './components/views/AuthPage';
import Login from './components/auth/forms/Login';
import Signup from './components/auth/forms/Signup';
import Settings from './components/auth/Settings';
import ResetPassword from './components/auth/ResetPassword';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';
import Profile from './components/views/Profile';
import UserPage from './components/views/AuthPage';
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
import { AuthContext } from './contexts/AuthContext';
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

  const { user } = useContext(AuthContext);
  const { cardContext } = useContext(CardContext);
  const { pathname } = useContext(PathContext);

  return (
    <Router>
      {(pathname !== '/login' && pathname !== '/signup') && <Header />}
      <main className="wrapper">
        <Switch>
          {/* Public routes */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/shopping-cart" component={ShoppingCart} />

          {/* Auth routes */}
          <ProtectedRoute path="/me" component={AuthPage} />
          <ProtectedRoute path="/reset-password" component={ResetPassword} />
          <ProtectedRoute path="/settings" component={Settings} />
          <ProtectedRoute path="/profile" component={Profile} />



          <Route path="/add-card/:cardName">
            {cardContext ? <AddCard /> : <Redirect to="/me" />}
          </Route>
          <Route path="/remove-card/:cardName">
            {cardContext ? <RemoveCard /> : <Redirect to="/me" />}
          </Route>
          <Route path="/modify-card/:cardName">
            {cardContext ? <ModifyCard /> : <Redirect to="/me" />}
          </Route>
          <Route exaxt path="/confirmation">
            {user ? <Confirmation /> : <Redirect to="/" />}
          </Route>

          <Route path="/search-collection">
            {user ? <SearchCollection /> : <Redirect to="/" />}
          </Route>
          <Route path="/search-api">
            {user ? <SearchAPI /> : <Redirect to="/" />}
          </Route>
          <Route path="/search-result/:cardName">
            <SearchResult />
          </Route>
          <Route path="/mail/inbox">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route path="/mail/:handle/:handle">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route path="/mail/unread">
            {user ? <MailBox /> : <Redirect from="/mail/unread" to="/" />}
          </Route>
          <Route path="/mail/sent">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route path="/mail/trash">
            {user ? <MailBox /> : <Redirect to="/" />}
          </Route>
          <Route path="/mail/message">
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
