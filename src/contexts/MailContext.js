import { createContext, useState } from 'react';

export const MailContext = createContext(null);

export const MailProvider = ({ children }) => {
  const [mailCount, setMailCount] = useState(10);

  return (
    <MailContext.Provider
      value={{
        setMailCount,
        mailCount
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
