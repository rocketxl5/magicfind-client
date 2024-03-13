import { useNavigate } from 'react-router-dom';
import useNavbar from './contexthooks/useNavbar';
import useSearch from './contexthooks/useSearch';
import useViewport from './contexthooks/useViewport';
import { useEffect } from 'react';

const useNavButton = () => {
    const {
        setDisplayMenu,
        displayMenu,
        setDisplaySearchBar,
        displaySearchBar,
        hamburgerRef,
        searchBarRef,
        cartCountRef,
        menuRef,
        searchBtnRef } = useNavbar();
    const { catalogInputRef } = useSearch();
    const { isMobile } = useViewport();

    const navigate = useNavigate();

    const openMenu = () => {

    }

    const closeMenu = () => {

    }

    const openSearchBar = () => {

    }

    const closeSearchBar = () => {

    }

    const menuHandler = (e) => {
        if (displayMenu) {
            setDisplayMenu(false);
        }
    }

    const hamburgerHandler = () => {
        if (!displayMenu) {
            setDisplayMenu(true);
        }
        else {
            setDisplayMenu(false);
        }
    }

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

    const handleBlur = () => {
        setDisplaySearchBar(false);
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
            hamburgerRef.current?.setAttribute('aria-expanded', 'false');
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
            hamburgerRef.current?.setAttribute('aria-expanded', 'true');
            hamburgerRef.current.disabled = true;
        }
        else {
            setTimeout(() => {
                hamburgerRef.current.disabled = false;
            }, 50);
            hamburgerRef.current?.setAttribute('aria-expanded', 'false');
            searchBarRef.current?.classList.remove('d-searchbar');
            cartCountRef.current?.classList.remove('d-none');
        }
    }, [displaySearchBar])


    return { navButtonHandler, searchButtonHandler, hamburgerHandler, menuHandler, handleBlur }
}

export default useNavButton
