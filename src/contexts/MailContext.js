import React, { createContext, useState, useEffect } from 'react';
import useAuth from '../hooks/contexthooks/useAuth';
import useFetchData from '../hooks/useFetchData';

export const MailContext = createContext(null);

export const MailProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const { auth, isAuth } = useAuth();
  const { result, fetchData } = useFetchData();

  useEffect(() => {
    // If user is authenticated
    if (isAuth) {
      // Get unread mail for unread count icon @ MailBtn
      fetchData(`/api/mail/${auth.user.id}`, auth.token);
    }
  }, [isAuth]);

  useEffect(() => {
    // Update unreadCount state if unread mails > 0
    if (result?.length > 0) {
      setUnreadCount(result.length)
    }
  }, [result])

  return (
    <MailContext.Provider
      value={{
        unreadCount
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
