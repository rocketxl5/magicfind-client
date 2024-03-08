import { useState, useEffect, useRef, createContext } from 'react';

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    const menuRef = useRef(null);
    const checkboxRef = useRef(null);
    const searchBarRef = useRef(null);
    const searchIconRef = useRef(null);

    useEffect(() => {
        const selector = isMobile ? 'd-mobile-menu' : 'd-desktop-menu';

        if (displayMenu) {
            menuRef.current?.classList.add(selector);
            isMobile && searchIconRef.current.classList.add('d-none');
        }
        else {
            menuRef.current?.classList.remove(selector);
            isMobile && searchIconRef.current?.classList.remove('d-none');
        }
    }, [displayMenu, isMobile]);

    useEffect(() => {
        if (displaySearchBar) {
            searchBarRef.current?.classList.add('d-searchbar');
        }
        else {
            searchBarRef.current?.classList.remove('d-searchbar');
        }

    }, [displaySearchBar])

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
            displaySearchBar,
            setDisplaySearchBar,
            isMobile,
            menuRef,
            checkboxRef,
            searchIconRef,
            searchBarRef
        }}>
            {children}
        </MenuContext.Provider>
    )
}