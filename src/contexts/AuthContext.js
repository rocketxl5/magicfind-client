import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { ShoppingCartContext } from './ShoppingCartContext'
import { api } from '../api/resources';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // const [user, setAuth] = useState(JSON.parse(localStorage.getItem('user')));
  // const { setCartItems, setItemsCount } = useContext(ShoppingCartContext);
  const [auth, setAuth] = useState(null);
  const [unreadMail, setUnreadMail] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const logoutAction = () => {
    localStorage.removeItem('token');
    setAuth(null);
    // setUnreadMail(0);
    // setCartItems([]);
    // setItemsCount(0);
    navigate('/');
  }

  const parseJwt = (token) => {
    const decode = JSON.parse(atob(token?.split('.')[1]));
    console.log(decode);
    if (decode.exp * 1000 < new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  };


  const checkUnreadMail = (auth) => {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('auth-token', auth.token);

    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/messages/unread/${auth.id}`, options)
      .then((res) => res.json())
      .then((data) => {

        if (data.data) {
          // console.log(data.data);
          const unreadMail = data.data.filter((message) => {
            return !message.isRead && !message.isTrash;
          });
          // If unreadMail
          setUnreadMail(unreadMail && unreadMail.length);
        }

      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {

    const jwt = localStorage.getItem('token')
    if (jwt) {
      const hasExpired = parseJwt(jwt);
      if (hasExpired) {
        logoutAction();
        navigate('/login');
      } else if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        console.log(user)
        setAuth({ ...user, token: token })
        navigate(location.pathname)
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      unreadMail,
      setUnreadMail,
      logoutAction
    }}>
      {children}
    </AuthContext.Provider>
  );
};
