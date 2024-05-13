import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useNav from './contexthooks/useNavbar';
import useAuth from './contexthooks/useAuth';
import useViewport from './contexthooks/useViewport';

// Handles control of Navbar buttons @ MainHeader
const useNavButton = () => {

    const {
        dispatch,
        openHamburger,
        displaySearchBar
    } = useNav();
    const { isMobile } = useViewport();
    const { isAuth } = useAuth();

    const navigate = useNavigate();

    const handleHamburger = () => {
        dispatch({
            type: 'hamburger',
            payload: !openHamburger
        });
    }

    const handleSearchBar = (display) => {
            dispatch({
                type: 'searchbar',
                payload: display
            });
    }

    // Takes boolean as argument.
    // Calls dispatch with proper payload if authenticated or not.
    // Unauthenticated users has HamburgerButton
    // Authenticated has authButton instead of HamburgerButton
    const handleMenu = (display) => {
        if(isMobile || !isAuth) {
            dispatch({
                type: 'menu',
                payload: {
                    displayMenu: display,
                    openHamburger: display
                }
            });
        }
        else{
            dispatch({
                type: 'menu',
                payload: {
                    displayMenu: display
                }
            });
        }
   
    }

    const handleNavButton = () => {
       if(displaySearchBar) {
        
       }
    }

    /********** Mobile only ************/
    // Diplays mobile search bar.
    // Sets focus on search catalog input
    const handleSearchButton = () => {
        // Set focus on Catalog Search Input
   
    }

    return { handleMenu, handleSearchBar, handleSearchButton, handleHamburger }
}

export default useNavButton
