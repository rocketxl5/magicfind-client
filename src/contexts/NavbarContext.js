import { useState, useEffect, useRef, createContext } from 'react';
import useViewport from '../hooks/contexthooks/useViewport';

export const NavbarContext = createContext(null);

export const NavigationProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);

    const { isMobile } = useViewport();

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const searchBarRef = useRef(null);
    const cartCountRef = useRef(null);
    const searchBtnRef = useRef(null);

    /**************************************************************
     *  Add/Removes proper menu css class selector according to viewport
     *  Removes/Add Navbar search button on menu Open/Close 
     **************************************************************/
    useEffect(() => {
        // [mobile = screen-wide, desktop = 1/3 screen]
        const selector = isMobile ? 'd-mobile-menu' : 'd-desktop-menu';

        if (displayMenu) {
            // Display menu
            menuRef.current?.classList.add(selector);
            if (isMobile) {
                // Hide search button
                searchBtnRef.current?.classList.add('d-none');
            }
        }
        else {
            // Hide menu
            menuRef.current?.classList.remove(selector);
            if (isMobile) {
                // Display search button
                searchBtnRef.current?.classList.remove('d-none');
            }
        }
    }, [displayMenu, isMobile]);

    /**************************************************************
     *  Mobile only. Handles displaying/hiding of search bar
     * Triggered @ layout/navigation/buttons/SearchBtn
     **************************************************************/
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
                searchBtnRef,
            }}
        >
            {children}
        </NavbarContext.Provider>
    )
}