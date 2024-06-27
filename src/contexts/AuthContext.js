import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const logoutAction = () => {
    localStorage.clear();
    setAuth(null);
    // setIsAuth(false);
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

  useEffect(() => {
    if (auth) {
      setIsAuth(true);
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
        setAuth(auth);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      isAuth,
      logoutAction
    }}>
      {children}
    </AuthContext.Provider>
  );
};
