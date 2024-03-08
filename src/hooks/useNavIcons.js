import { useEffect } from 'react';
import useMenu from './contexthooks/useMenu';

const useNavIcons = () => {
    const { displayMenu, setDisplayMenu, displaySearchBar, setDisplaySearchBar, checkboxRef } = useMenu();
    console.log(displayMenu)

    const handleNavIcons = () => {
        if (displayMenu) {
            // Hide menu
            setDisplayMenu(false);
            // Check mobile-nav checkbox to trigger css hamburger animation
            checkboxRef.current.click();
        }
    }

    const handleSearchField = () => {

        if (displayMenu) {
            // Hide menu
            setDisplayMenu(false);
        }
        // If searchbar is hidden
        if (!displaySearchBar) {
            // Display searchbar
            setDisplaySearchBar(true);
        }
        else {
            // Hide searchbar
            setDisplaySearchBar(false);
        }
    }

    const handleNavMenu = () => {
        // If searchbar is displayed
        if (displaySearchBar) {
            // Hide search bar
            setDisplaySearchBar(false);
        }
        else {
            // Hide or display menu
            setDisplayMenu(!displayMenu);
        }

    }

    const handleIcons = (e) => {
        e.stopPropagation();

        switch (e.target.id) {
            case 'cart-icon':
            case 'mail-icon':
            case 'signin-icon':
            case 'logo-icon':
                handleNavIcons();
                break;
            case 'search-icon':
                handleSearchField();
                break;
            case 'hamburger-icon':
            case 'auth-icon':
                handleNavMenu()
                break;
            default:
                break;
        }
    }

    const handleLinks = (e) => {
        console.log(e.target)
    }

    return { handleIcons, handleLinks };
}

export default useNavIcons
