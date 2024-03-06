import { useState, useEffect, useRef, createContext } from 'react';

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navRef = useRef(null);

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen]);

    return (
        <NavContext.Provider value={{
            isOpen,
            setIsOpen,
            navRef
        }}>
            {children}
        </NavContext.Provider>
    )
}