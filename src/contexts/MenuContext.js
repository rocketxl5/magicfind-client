import { useState, useEffect, useRef, createContext } from 'react';

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const inputRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const selector = isMobile ? 'display-mobile-menu' : 'display-desktop-menu';

        if (displayMenu) {
            menuRef.current?.classList.add(selector);
        }
        else {
            menuRef.current?.classList.remove(selector);
        }
    }, [displayMenu, isMobile]);

    useEffect(() => {
        if (document.body.clientWidth <= 775) {
            setIsMobile(true);
        }
        else {
            setIsMobile(false);
        }
    }, [displayMenu]);

    return (
        <MenuContext.Provider value={{
            displayMenu,
            setDisplayMenu,
            isMobile,
            inputRef,
            menuRef,
        }}>
            {children}
        </MenuContext.Provider>
    )
}