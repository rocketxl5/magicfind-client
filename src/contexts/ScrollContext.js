import React, { createContext, useState, useEffect, useRef } from 'react';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [viewport, setViewport] = useState(0);
    const [offset, setOffset] = useState(0);
    const [className, setClassName] = useState('');

    const navRef = useRef(null);
    const tabRef = useRef(null);

    const handleScroll = () => {
        // If ref value is greater than y
        if (window.scrollY > offset) {
            // Add class to hide tab
            tabRef.current?.classList.add('hide-tab');
            navRef.current?.classList.add('hide-nav');
        }
        else {
            // Remove class to display tab
            tabRef.current?.classList.remove('hide-tab');
            navRef.current?.classList.remove('hide-nav');

        }

        setOffset(window.scrollY)
    }

    useEffect(() => {
        setViewport(document.body.clientWidth);
    }, [])

    useEffect(() => {
        if (viewport < 775) {
            setClassName('hide-mobile-nav');
        } else {
            setClassName('hide-nav');
        }
    }, [viewport])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    }, [offset]);

    return (
        <ScrollContext.Provider
            value={{
                tabRef,
                navRef
            }}
        >
            {children}
        </ScrollContext.Provider>
    )
}