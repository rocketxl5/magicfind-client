import { useState, useRef, createContext } from 'react';

export const NavbarContext = createContext(null);

export const NavigationProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);
    const [isSearchBar, setIsSearchBar] = useState(true);

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const searchBarRef = useRef(null);
    const cartCountRef = useRef(null);
    const mailCountRef = useRef(null);
    const searchBtnRef = useRef(null);

    return (
        <NavbarContext.Provider
            value={{
                displayMenu,
                setDisplayMenu,
                displaySearchBar,
                setDisplaySearchBar,
                isSearchBar,
                setIsSearchBar,
                menuRef,
                hamburgerRef,
                searchBarRef,
                cartCountRef,
                mailCountRef,
                searchBtnRef,
            }}
        >
            {children}
        </NavbarContext.Provider>
    )
}