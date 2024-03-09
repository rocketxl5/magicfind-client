import useNav from './contexthooks/useNav.js';
import useViewport from './contexthooks/useViewport.js';

const useNavIcons = () => {
    const { displayMenu, setDisplayMenu, displaySearchBar, setDisplaySearchBar, checkboxRef } = useNav();
    const { isMobile } = useViewport();

    const handleNavIcons = () => {
        if (displayMenu) {
            // Hide menu
            setDisplayMenu(false);
            // Check mobile-nav checkbox to trigger css hamburger animation
            checkboxRef.current.click();
        }
    }

    const handleSearchIcon = () => {
        setDisplaySearchBar(true);
    }

    const handleHamburger = () => {
        if (displaySearchBar) {
            // return setDisplaySearchBar(false);
        }
        // if (displayMenu) {
        //     setDisplayMenu(!displayMenu);
        // }
        // else {
        //     setDisplayMenu(true);
        // } 
    }

    const handleNavMenu = () => {
        // If searchbar is displayed
        // if (displayMenu) {
        //     // Hide search bar
        //     setDisplayMenu(false);
        // }
        // else {
        //     // Hide or display menu
        //     setDisplayMenu(true);
        // }
    }

    const handleIcons = (e) => {
        // e.preventDefault();

        switch (e.target.id) {
            case 'cart-icon':
            case 'mail-icon':
            case 'signin-icon':
            case 'logo-icon':
                handleNavIcons();
                break;
            case 'search-icon':
                handleSearchIcon();
                break;
            case 'hamburger-icon':
                handleHamburger();
                break;
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
