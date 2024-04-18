import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null);
  const [isAuth, setIsAuth] = useState(false);
  const [unreadMail, setUnreadMail] = useState(null);

  const logoutAction = () => {
    localStorage.clear();
    setAuth(null);
    setIsAuth(false);
  }

  const parseJwt = (token) => {
    // Extract payload of jwt
    const decode = JSON.parse(atob(token?.split('.')[1]));

    if (decode.exp * 1000 < new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  };

  // const checkUnreadMail = (id, token) => {
  //   const headers = new Headers();
  //   headers.append('Content-type', 'application/json');
  //   headers.append('auth-token', token);

  //   const options = {
  //     method: 'GET',
  //     headers: headers,
  //   };

  //   fetch(`${api.serverURL}/api/messages/unread/${id}`, options)
  //     .then((res) => res.json())
  //     .then((data) => {

  //       if (data.data) {
  //         const unreadMail = data.data.filter((message) => {
  //           return !message.isRead && !message.isTrash;
  //         });
  //         // If unreadMail
  //         setUnreadMail(unreadMail && unreadMail.length);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }

  useEffect(() => {
    if (auth) {
      setIsAuth(true);
      // checkUnreadMail(auth.user.id, auth.token)
    }
    else {
      setIsAuth(false);
    }
  }, [auth])

  useEffect(() => {

    const auth = JSON.parse(localStorage.getItem('auth'));
    const jwt = auth?.token;

    if (jwt) {
      const hasExpired = parseJwt(jwt);
      if (hasExpired) {
        logoutAction();
      } else if (auth) {
        // const user = JSON.parse(localStorage.getItem('user'));
        // const token = JSON.parse(localStorage.getItem('token'));
        // if (!localStorage.getItem('auth')) {
          // localStorage.setItem('auth', JSON.stringify(auth));
        // }
        setAuth(auth);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      isAuth,
      unreadMail,
      setUnreadMail,
      logoutAction
    }}>
      {children}
    </AuthContext.Provider>
  );
};
