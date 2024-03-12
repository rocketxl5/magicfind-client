// source @ https://stackoverflow.com/questions/76689633/how-to-hide-menu-when-you-click-outside-it-in-react
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useNavbar from './contexthooks/useNavbar';
import useViewport from './contexthooks/useViewport';
import useAuth from './contexthooks/useAuth';

const useHamburger = (hamburgerRef) => {
    const [isOpen, setIsOpen] = useState(false);
    // Prevents Hamburger menu from opening on load
    const [stateChanged, setStateChanged] = useState(false);
    const navigate = useNavigate();
    const { displaySearchBar, setDisplayMenu } = useNavbar();
    const { isMobile } = useViewport();
    const { isAuth } = useAuth();

    // -Triggers hamburger closing animation
    // -Hides nav menue
    const resetHamburger = (location = undefined) => {
        // If unauthenticated or authenticated and mobile [authenticated destop has avatar]
        if (!isAuth || (isAuth && isMobile)) {
        // Trigger hamburger closing animation
            hamburgerRef.current.setAttribute('aria-expanded', 'false');
        }
        // Close menu
        setDisplayMenu(false);

        if (location) {
            navigate(location);
        }
    }

    const hamburgerHandler = () => {
        if (displaySearchBar) { return }
        // Get hamburger aria-expanded attribute state
        const state = hamburgerRef.current?.getAttribute('aria-expanded');
        // If state is true [hamburger === X]
        if (state === 'true') {
            // Sets hiding menu/searchbar animation [stack]
            setIsOpen(true);
        }
        else {
            // Sets display menu/searchbar animation [X]
            setIsOpen(false);
        }

        // Enables hamburger animation
        setStateChanged(true);
    }

    // Calls resetHamburger if event target is anything but a redirect to a location
    const handleMouseClick = (e) => {
        if (!e.target.classList.contains('nav-link') &&
            !e.target.classList.contains('nav-btn') &&
            !e.target.classList.contains('logo')) {
            resetHamburger()
        }
    }

    useEffect(() => {
        // If Mobile 
        if (isMobile) {
            return
        }

        // Set click event listener on document
        document.addEventListener('mousedown', handleMouseClick);

        return () => {
            document.removeEventListener('mousedown', handleMouseClick);
        }

    }, [])

    useEffect(() => {
        if (stateChanged) {
            // If open state is false
            if (!isOpen) {
                // Trigger hamburger opening animation
                hamburgerRef.current?.setAttribute('aria-expanded', 'true');
                setDisplayMenu(true);
            }
            else {
                hamburgerRef.current?.setAttribute('aria-expanded', 'false');
                setDisplayMenu(false);
            }
            setStateChanged(false);
        }
    }, [stateChanged, isOpen, hamburgerRef, setDisplayMenu])

    return { hamburgerHandler, resetHamburger }
}

export default useHamburger
