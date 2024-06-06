import { useEffect } from 'react';
import useNav from './contexthooks/useNavbar';
import useAuth from './contexthooks/useAuth';
import useViewport from './contexthooks/useViewport';

// Handles control of Navbar buttons @ MainHeader
const useNavButton = () => {

    const {
        dispatch,
        displayMenu,
        displaySearchBar,
    } = useNav();

    const { isMobile } = useViewport();
    const { isAuth } = useAuth();

    function handleHamburger(open) {
        if (!open && displaySearchBar) {
            handleSearchBar(false);
        }
        if (open && !displayMenu) {
            handleMenu(true);
        }
        if (!open && displayMenu) {
            handleMenu(false);
        }
    }

    function handleSearchBar(display) {
        if (!display) {
            // Delays reaction time to prevent opening menu
            setTimeout(() => {
                dispatch({
                    type: 'searchbar',
                    payload: {
                        openHamburger: false,
                        displaySearchBar: false,
                    }
                });
            }, 100);
        }
        else {
            dispatch({
                type: 'searchbar',
                payload: {
                    openHamburger: true,
                    displaySearchBar: true,
                }
            });
        }
    }

    function handleMenu(displayMenu) {

        if (displayMenu) {
            dispatch({
                type: 'menu',
                payload: {
                    displayMenu: true,
                    openHamburger: true
                }
            });
        }
        else {
            dispatch({
                type: 'menu',
                payload: {
                    displayMenu: false,
                    openHamburger: false
                }
            });
        }
    }

    function handleAuthMenu(display) {
        if (!display) {
            dispatch({
                type: 'auth-menu',
                payload: false
            })
        }
        else {
            dispatch({
                type: 'auth-menu',
                payload: true
            })
        }
    }

    useEffect(() => {
        const navHandler = (e) => {

            if (!isMobile && displayMenu) {
                if (isAuth) {
                    if (e.target.id !== 'auth-btn') {
                        handleAuthMenu(false);
                    }
                }
                else {
                    if (e.target.id !== 'hamburger-btn') {
                        handleMenu(false);
                    }
                }
            }

            if (isMobile && displayMenu) {
                if (e.target.id !== 'hamburger-btn') {
                    handleMenu(false);
                }
            }
        }

        document.body.addEventListener('click', navHandler);

        return () => {
            document.body.removeEventListener('click', navHandler);
        }
        // }
    }, [displayMenu, displaySearchBar])


    return { handleMenu, handleSearchBar, handleHamburger, handleAuthMenu }
}

export default useNavButton
