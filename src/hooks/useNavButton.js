import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useNavbar from './contexthooks/useNavbar';
import useSearch from './contexthooks/useSearch';
import useAuth from './contexthooks/useAuth';
import useViewport from './contexthooks/useViewport';

// Handles control of Navabar buttons @ MainHeader
const useNavButton = () => {
    const {
        setDisplayMenu,
        displayMenu,
        setDisplaySearchBar,
        displaySearchBar,
        isSearchBar,
        setIsSearchBar,
        hamburgerRef,
        searchBarRef,
        cartCountRef,
        mailCountRef,
        menuRef,
        searchBtnRef } = useNavbar();
    const { catalogInputRef } = useSearch();
    const { isMobile } = useViewport();
    const { isAuth } = useAuth();

    const navigate = useNavigate();

    const menuHandler = (e) => {
        if (displayMenu) {
            setDisplayMenu(false);
        }
    }

    // Display or hides Menu on click if search bar is hidden
    const hamburgerHandler = () => {
        if (!isSearchBar) {
            if (!displayMenu) {
                setDisplayMenu(true);
            }
            else {
                setDisplayMenu(false);
            }
        }
    }

    // Display or hides Menu on click [authButton is Desktop only]
    const authButtonHandler = () => {
        if (!displayMenu) {
            setDisplayMenu(true);
        }
        else {
            setDisplayMenu(false);
        }
    }

    // @ CartBtn, MailBtn, Logo, SingInBtn ...
    // Hides menu if menu is displayed
    // Navigates to path if path defined
    const navButtonHandler = (path) => {
        if (displayMenu) {
            setDisplayMenu(false);
        }

        if (path) {
            navigate(path);
        }
    }

    /********** Mobile only ************/
    // Diplays mobile search bar.
    // Sets focus on search catalog input
    const searchButtonHandler = () => {
        // Trigger search bar display   
        setDisplaySearchBar(true);
        // Set focus on Catalog Search Input
        catalogInputRef.current?.focus();
    }

    const blurHandler = () => {
        setDisplaySearchBar(false);
        // Delaying hamburger button reactivation
        // Prevent menu from opening on click
        setTimeout(() => {
            hamburgerRef.current.disabled = false;
        }, 200)
    }
    /********** End Mobile only *********/

    /********** Desktop only ************/
    const handleMenu = (e) => {
        if (!e.target.classList.contains('nav-link') &&
            !e.target.classList.contains('nav-btn') &&
            !e.target.classList.contains('logo')) {
            setDisplayMenu(false);
        }
    }

    // Sets event listener with handleMenu
    useEffect(() => {
        if (isMobile) {
            return
        }
        else {
            // Set click event listener on document
            document.addEventListener('mousedown', handleMenu);

            return () => {
                document.removeEventListener('mousedown', handleMenu);
            }
        }
    }, []);
    /********** End Desktop only *********/

    useEffect(() => {
        // [mobile = screen-wide, desktop = 1/3 screen]
        const selector = isMobile ? 'd-mobile-menu' : 'd-desktop-menu';

        if (displayMenu) {
            // Display menu
            menuRef.current?.classList.add(selector);
            hamburgerRef.current?.setAttribute('aria-expanded', 'true');

            if (isMobile) {
                // Hide search button
                searchBtnRef.current?.classList.add('d-none');
            }
        }
        else {
            // Hide menu
            menuRef.current?.classList.remove(selector);

            // Hamburger visible @ all size if unauthenticated view.
            // Hamburger replaced by Avatar @ authenticated desktop view.
            if (!isAuth || (isAuth && isMobile)) {
                hamburgerRef.current?.setAttribute('aria-expanded', 'false');
            }
            if (isMobile) {
                // Display search button
                searchBtnRef.current?.classList.remove('d-none');
            }
        }
    }, [displayMenu]);

    useEffect(() => {
        if (displaySearchBar) {
            searchBarRef.current?.classList.add('d-searchbar');
            cartCountRef.current?.classList.add('d-none');
            mailCountRef.current?.classList.add('d-none');
            hamburgerRef.current?.setAttribute('aria-expanded', 'true');
            setIsSearchBar(true);
            hamburgerRef.current.disabled = true;
        }
        else {
            hamburgerRef.current?.setAttribute('aria-expanded', 'false');
            searchBarRef.current?.classList.remove('d-searchbar');
            cartCountRef.current?.classList.remove('d-none');
            mailCountRef.current?.classList.remove('d-none');
            setIsSearchBar(false);
        }
    }, [displaySearchBar])


    return { navButtonHandler, authButtonHandler, searchButtonHandler, hamburgerHandler, menuHandler, blurHandler }
}

export default useNavButton
