import { useState, useEffect } from 'react'
import useNavbar from './contexthooks/useNavbar';

const useHamburger = (hamburgerRef) => {
    const [isOpen, setIsOpen] = useState(false);
    // Prevents Hamburger menu from opening on load
    const [stateChanged, setStateChanged] = useState(false);
    const {
        displayMenu,
        setDisplayMenu,
    } = useNavbar();

    useEffect(() => {
        if (stateChanged) {
            if (!isOpen) {
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

    const hamburgerHandler = () => {
        // Get hamburger aria-expanded attribute state
        const state = hamburgerRef.current?.getAttribute('aria-expanded');
        // If state is true
        if (state === 'true') {
            // Sets opening animation [X]
            setIsOpen(true);
        }
        else {
            // Sets closing animation [line statck]
            setIsOpen(false);
        }
        // Triggers hamburger animation
        setStateChanged(true);
    }
    return { hamburgerHandler }
}

export default useHamburger
