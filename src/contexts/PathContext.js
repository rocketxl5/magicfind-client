import React, { createContext, useState } from 'react';

export const PathContext = createContext(null);

export const PathProvider = ({ children }) => {
  const [path, setPath] = useState('');

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};
