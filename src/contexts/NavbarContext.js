import { useState, useEffect, useRef, createContext } from 'react';
import useViewport from '../hooks/contexthooks/useViewport';
// import useSearch from '../hooks/contexthooks/useSearch';

export const NavbarContext = createContext(null);

export const NavigationProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);

    const { isMobile } = useViewport();
    // const { catalogInputRef } = useSearch();

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const searchBarRef = useRef(null);
    const cartCountRef = useRef(null);
    const searchIconRef = useRef(null);

    useEffect(() => {
        const selector = isMobile ? 'd-mobile-menu' : 'd-desktop-menu';

        if (displayMenu) {
            menuRef.current?.classList.add(selector);
            if (isMobile) {
                searchIconRef.current?.classList.add('d-none');
            }
        }
        else {
            menuRef.current?.classList.remove(selector);
            if (isMobile) {
                searchIconRef.current?.classList.remove('d-none');
            }
        }
    }, [displayMenu, isMobile]);

    useEffect(() => {
        if (isMobile) {
            if (displaySearchBar) {
                searchBarRef.current?.classList.add('d-searchbar');
                cartCountRef.current?.classList.add('d-none');
            }
            else {
                searchBarRef.current?.classList.remove('d-searchbar');
                cartCountRef.current?.classList.remove('d-none');
            }
        }
    }, [displaySearchBar])

    return (
        <NavbarContext.Provider
            value={{
                displayMenu,
                setDisplayMenu,
                displaySearchBar,
                setDisplaySearchBar,
                menuRef,
                hamburgerRef,
                searchBarRef,
                cartCountRef,
                searchIconRef,
            }}
        >
            {children}
        </NavbarContext.Provider>
    )
}