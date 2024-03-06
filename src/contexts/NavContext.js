import { useState, useEffect, useRef, createContext } from 'react';

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navRef = useRef(null);

    useEffect(() => {
        console.log(isOpen)
        if (isOpen) {
            navRef.current?.classList.add('display-nav');
        }
        else {
            navRef.current?.classList.remove('display-nav');
        }
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