import React, { createContext, useState } from 'react';
import { __RouterContext } from 'react-router';

export const RouteContext = createContext(null);

export const RouteProvider = ({ children }) => {
  const [notFound, setNotFound] = useState(false);
  return (
    <RouteContext.Provider value={{ notFound, setNotFound }}>
      {children}
    </RouteContext.Provider>
  );
};
