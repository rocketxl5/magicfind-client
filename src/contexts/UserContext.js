import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [unreadMail, setUnreadMail] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      headers.append('auth-token', user.token);

      const options = {
        method: 'GET',
        headers: headers
      };

      fetch(`/api/messages/unread/${user.id}`, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            // console.log(data.data);
            if (data.data) {
              // console.log(data.data);
              const unreadMail = data.data.filter((message) => {
                return !message.isRead && !message.isTrash;
              });

              setUnreadMail(unreadMail.length);
            }
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, unreadMail, setUnreadMail }}>
      {children}
    </UserContext.Provider>
  );
};
