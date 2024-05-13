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
        if(displaySearchBar) {
            searchBarRef.current?.classList.add('d-searchbar');
            catalogInputRef.current?.focus();
            setTimeout(() => {
                cartCountRef.current?.classList.add('d-none');
            }, 200);
        }
        else {
            searchBarRef.current?.classList.remove('d-searchbar');
            cartCountRef.current?.classList.remove('d-none');
        }
    }, [displaySearchBar]);

    useEffect(() => {
        if(openHamburger) {
            hamburgerRef.current?.setAttribute('aria-expanded', 'true');
        }
        else {
            hamburgerRef.current?.setAttribute('aria-expanded', 'false');
        }
    }, [openHamburger]);

    useEffect(() => {
        const selector =    isMobile ? 
                            'd-mobile-menu' : 
                            'd-desktop-menu';

        if(displayMenu) {
            menuRef.current?.classList.add(selector);
        }
        else {
            menuRef.current?.classList.remove(selector);
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