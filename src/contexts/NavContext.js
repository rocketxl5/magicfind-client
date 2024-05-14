///////////// Tasks & State Handling ///////////////
//  -SearchBar state maintenance for Mobile
//  -Hamburger state maintenance animation
//  -Site menu state maintenance
//  -Defines and shares navigation buttons, site menu and searchBar refs
//
//  Conponents: @ SearchForm / AuthBtn / CartBtn / Hamburger / MailBtn / SearchBtn
//  Custom hooks: @ useNavButtons
////////////////////////////////////////////////////
import { useEffect, useReducer, useRef, createContext } from 'react';
import { navReducer } from '../features/nav/services/navReducer';
import useViewport from '../hooks/contexthooks/useViewport';
import useSearch from '../hooks/contexthooks/useSearch';

const initialState = {
    displayMenu: false,
    displaySearchBar: false,
    openHamburger: false,
}

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {

    const {isMobile} = useViewport();
    const {catalogInputRef} = useSearch();
    const [state, dispatch] = useReducer(navReducer, initialState);

    const {
        openHamburger,
        displayMenu,
        displaySearchBar
    } = state;

    useEffect(() => {
        // Display SearchBar. Set input focus. Hide cart Count with delay
        if(displaySearchBar) {
            searchBarRef.current?.classList.add('d-searchbar');
            catalogInputRef.current?.focus();
            setTimeout(() => {
                cartCountRef.current?.classList.add('d-none');
            }, 200);
        }
            // Hide SearchBar. Display cart Count 
        else {
            searchBarRef.current?.classList.remove('d-searchbar');
            cartCountRef.current?.classList.remove('d-none');
        }
    }, [displaySearchBar]);

    useEffect(() => {
        // Set hamburger animation from stack to X [opened]
        if(openHamburger) {
            hamburgerRef.current?.setAttribute('aria-expanded', 'true');
        }
            // Set hamburger animation from X to stack [closed]
        else {
            hamburgerRef.current?.setAttribute('aria-expanded', 'false');
        }
    }, [openHamburger]);

    useEffect(() => {
        if (displayMenu) {
            // Display site Menu
            if (isMobile) {
                // Hide SearchBtn
                searchBtnRef.current?.classList.add('d-none');
                menuRef.current?.classList.add('d-mobile-menu');
            }
            else {
                menuRef.current?.classList.add('d-desktop-menu');
            }
        }
        else {
            // Hide site Menu
            if (isMobile) {
                // Display SearchBtn
                searchBtnRef.current?.classList.remove('d-none');
                menuRef.current?.classList.remove('d-mobile-menu');
            }
            else {
                menuRef.current?.classList.remove('d-desktop-menu');
            }
        }
    }, [displayMenu]);

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const searchBarRef = useRef(null);
    const cartCountRef = useRef(null);
    const mailCountRef = useRef(null);
    const searchBtnRef = useRef(null);

    return (
        <NavContext.Provider
            value={{
                menuRef,
                hamburgerRef,
                searchBarRef,
                cartCountRef,
                mailCountRef,
                searchBtnRef,
                displayMenu,
                displaySearchBar,
                openHamburger,
                dispatch,
            }}
        >
            {children}
        </NavContext.Provider>
    )
}