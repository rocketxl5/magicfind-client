import { useState, useEffect, createContext } from 'react';

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {

    return (
        <NavContext.Provider value={{}}>
            {children}
        </NavContext.Provider>
    )
}