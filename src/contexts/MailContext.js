import React, { createContext, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

export const MailContext = createContext(null);
// Prevents access to add-card component if a card  hasen't been selected
// previously. This means a search has been done in the search-api view
// and a card was selected to be added to the user store
export const MailProvider = ({ children }) => {
  const { auth } = useAuth();
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  // Populates messages in every rendering (reload of page, etc.)
  useEffect(() => {
    if (auth) {
      setSentMessages(auth.messages?.sent);
      setReceivedMessages(auth.messages?.received);
    }
  }, [auth]);

  return (
    <MailContext.Provider
      value={{
        setSentMessages,
        sentMessages,
        setReceivedMessages,
        receivedMessages
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
