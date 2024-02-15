import { createContext, useState } from 'react';

export const PathContext = createContext(null);

export const PathProvider = ({ children }) => {
  // Set path to home url pathname
  const [pathname, setPathname] = useState('');

  return (
    <PathContext.Provider value={{ pathname, setPathname }}>
      {children}
    </PathContext.Provider>
  );
};
