import { useEffect } from 'react';
import useMenu from './contexthooks/useMenu';

const useNavIcons = () => {
    const { displayMenu, setDisplayMenu, isMobile, inputRef } = useMenu();
    console.log(displayMenu)

    const handleHamburger = () => {
        if (displayMenu) {
            // Close menu
            setDisplayMenu(false);
            // Check mobile-nav checkbox to trigger css hamburger animation
            inputRef.current.click();
        }
    }

    const handleSearchField = () => {
        if (displayMenu) {
            // Close menu
            setDisplayMenu(false);
        }
    }

    const handleIcons = (e) => {
        // e.stopPropagation();
        console.log(e.target.name)
        switch (e.target.id) {
            case 'cart-icon':
            case 'mail-icon':
            case 'signin-icon':
            case 'logo-icon':
                handleHamburger();
                break;
            case 'search-icon':
                handleSearchField();
                break;
            case 'hamburger-icon':
            case 'auth-icon':
                setDisplayMenu(!displayMenu);
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
