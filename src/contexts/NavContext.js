import { useState, useRef, createContext } from 'react';

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true);

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const searchBarRef = useRef(null);
    const cartCountRef = useRef(null);
    const mailCountRef = useRef(null);
    const searchBtnRef = useRef(null);

    return (
        <NavContext.Provider
            value={{
                displayMenu,
                setDisplayMenu,
                displaySearchBar,
                setDisplaySearchBar,
                switchOn,
                setSwitchOn,
                menuRef,
                hamburgerRef,
                searchBarRef,
                cartCountRef,
                mailCountRef,
                searchBtnRef,
            }}
        >
            {children}
        </NavContext.Provider>
    )
}