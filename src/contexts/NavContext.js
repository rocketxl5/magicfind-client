import { useState, useEffect, useRef, createContext } from 'react';

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [viewportWidth, setViewPortWidth] = useState(0);

    const navRef = useRef(null);

    useEffect(() => {
        const selector = viewportWidth <= 775 ? 'display-mobile-menu' : 'display-desktop-menu';

        if (displayMenu) {
            navRef.current?.classList.add(selector);
        }
        else {
            navRef.current?.classList.remove(selector);
        }
    }, [displayMenu, viewportWidth]);

    useEffect(() => {
        setViewPortWidth(document.body.clientWidth)
    }, [displayMenu]);

    return (
        <NavContext.Provider
            value={{
                displayMenu,
                setDisplayMenu,
                viewportWidth,
                navRef,
        }}>
            {children}
        </NavContext.Provider>
    )
}