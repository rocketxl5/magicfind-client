import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
export const MailContext = createContext(null);
// Prevents access to add-card component if a card  hasen't been selected
// previously. This means a search has been done in the search-api view
// and a card was selected to be added to the user store
export const MailProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  // console.log(user);
  // Populates messages in every rendering (reload of page, etc.)
  useEffect(() => {
    if (user) {
      setSentMessages(user.messages.sent);
      setReceivedMessages(user.messages.received);
    }
  }, [user]);

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
