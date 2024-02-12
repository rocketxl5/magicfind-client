import React, { createContext, useState, useEffect, useRef } from 'react';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [viewport, setViewport] = useState(0);
    const [offset, setOffset] = useState(0);

    const navRef = useRef(null);
    const btnRef = useRef(null);
    const countRef = useRef(null);

    const handleScroll = () => {
        if (viewport < 1200) {
            if (window.scrollY > offset && offset > 50) {
                // Add class to hide tab
                countRef.current?.classList.add('move-count')
                btnRef.current?.classList.add('hide-btn');
                navRef.current?.classList.add('hide-nav');
            }
            else {
                // Remove class to display btn
                btnRef.current?.classList.remove('hide-btn');
                navRef.current?.classList.remove('hide-nav');
                countRef.current?.classList.remove('move-count')
            }
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