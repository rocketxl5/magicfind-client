import React, { createContext, useState, useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [viewport, setViewport] = useState(0);
    const [offset, setOffset] = useState(0);
    const { isAuth } = useAuth();

    const navRef = useRef(null);
    const btnRef = useRef(null);
    const countRef = useRef(null);

    const handleScroll = () => {
        const hideNav = !isAuth ? 'hide-nav' : 'hide-auth-nav';

            if (window.scrollY > offset && offset > 75) {
                // Add class to hide tab
                navRef.current?.classList.add(hideNav);
                countRef.current?.classList.add('move-count')
                btnRef.current?.classList.add('hide-btn');
            }
            else {
                // Remove class to display btn
                navRef.current?.classList.remove(hideNav);
                countRef.current?.classList.remove('move-count')
                btnRef.current?.classList.remove('hide-btn');
            }

        setOffset(window.scrollY)
    }

    useEffect(() => {
        setViewport(document.body.clientWidth);
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    }, [offset]);

    return (
        <ScrollContext.Provider
            value={{
                btnRef,
                navRef,
                countRef
            }}
        >
            {children}
        </ScrollContext.Provider>
    )
}