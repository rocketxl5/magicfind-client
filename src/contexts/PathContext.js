import React, { createContext, useState } from 'react';

export const PathContext = createContext(null);

export const PathProvider = ({ children }) => {
  // Set path to home url pathname
  const [path, setPath] = useState('');

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};
