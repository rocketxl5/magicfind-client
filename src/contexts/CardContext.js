import React, { createContext, useState } from 'react';
export const CardContext = createContext(null);
export const CardProvider = ({ children }) => {

  const [cardContext, setCardContext] = useState(false);
  const [userStoreContent, setUserStoreContent] = useState([]);

  return (
    <CardContext.Provider
      value={{
        cardContext,
        setCardContext,
        userStoreContent,
        setUserStoreContent,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
