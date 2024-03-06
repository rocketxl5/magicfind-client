import { useState, useEffect, useRef, createContext } from 'react';

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewportWidth, setViewPortWidth] = useState(0);

    const navRef = useRef(null);

    useEffect(() => {
        console.log(viewportWidth)
        const selector = viewportWidth <= 775 ? 'mobile-menu' : 'desktop-menu';

        if (isOpen) {
            navRef.current?.classList.add(selector);
        }
        else {
            navRef.current?.classList.remove(selector);
        }
    }, [isOpen, viewportWidth]);

    useEffect(() => {
        setViewPortWidth(document.body.clientWidth)
    }, [isOpen]);

    return (
        <NavContext.Provider
            value={{
            isOpen,
            setIsOpen,
                viewportWidth,
                navRef,
        }}>
            {children}
        </NavContext.Provider>
    )
}