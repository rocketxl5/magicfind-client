import { useState, useEffect, useRef, createContext } from 'react';
import useViewport from '../hooks/contexthooks/useViewport';

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);

    const { isMobile } = useViewport();

    const menuRef = useRef(null);
    const checkboxRef = useRef(null);
    const searchBarRef = useRef(null);
    const searchIconRef = useRef(null);

    useEffect(() => {
        const selector = isMobile ? 'd-mobile-menu' : 'd-desktop-menu';

        if (displayMenu) {
            menuRef.current.classList.add(selector);
            isMobile && searchIconRef.current?.classList.add('d-none');
        }
        else {
            menuRef.current.classList.remove(selector);
            isMobile && searchIconRef.current?.classList.remove('d-none');
        }
    }, [displayMenu, isMobile]);

    useEffect(() => {
        if (displaySearchBar) {
            searchBarRef.current?.classList.add('d-searchbar');
        }
        else {
            searchBarRef.current.classList.remove('d-searchbar');
            checkboxRef.current?.click();
        }

    }, [displaySearchBar])

    return (
        <MenuContext.Provider value={{
            displayMenu,
            setDisplayMenu,
            displaySearchBar,
            setDisplaySearchBar,
            menuRef,
            checkboxRef,
            searchIconRef,
            searchBarRef
        }}>
            {children}
        </MenuContext.Provider>
    )
}