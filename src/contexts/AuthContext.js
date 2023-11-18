import React, { createContext, useState, useEffect } from 'react';
import { api } from '../api/resources';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [user, setUser] = useState(null);
  const [unreadMail, setUnreadMail] = useState(null);

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     setUser(JSON.parse(localStorage.getItem('user')));
  //   }
  // }, []);

  useEffect(() => {
    if (user) {
      console.log(user)
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      headers.append('auth-token', user.token);

      const options = {
        method: 'GET',
        headers: headers,
      };

      fetch(`${api.serverURL}/api/messages/unread/${user.id}`, options)
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
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, unreadMail, setUnreadMail }}>
      {children}
    </AuthContext.Provider>
  );
};
