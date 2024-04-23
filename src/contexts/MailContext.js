import React, { createContext, useState, useEffect } from 'react';
import useAuth from '../hooks/contexthooks/useAuth';

export const MailContext = createContext(null);
// Prevents access to add-card component if a card  hasen't been selected
// previously. This means a search has been done in the api view
// and a card was selected to be added to the user store
export const MailProvider = ({ children }) => {
  const { auth, isAuth } = useAuth();
  const [sentMail, setSentMail] = useState([]);
  const [receivedMail, setReceivedMail] = useState([]);

  // Populates messages in every rendering (reload of page, etc.)
  useEffect(() => {
    if (isAuth) {
      setSentMail(auth.messages?.sent);
      setReceivedMail(auth.messages?.received);
    }
  }, [isAuth]);

  return (
    <MailContext.Provider
      value={{
        setSentMail,
        sentMail,
        setReceivedMail,
        receivedMail
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
