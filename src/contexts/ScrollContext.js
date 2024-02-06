import React, { createContext, useState, useEffect, useRef } from 'react';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [viewport, setViewport] = useState(0);
    const [offset, setOffset] = useState(0);

    const navRef = useRef(null);
    const btnRef = useRef(null);

    const handleScroll = () => {
        console.log(offset)
        // if(viewport > 1200)
        // If ref value is greater than y
        if (viewport < 1200) {
            if (window.scrollY > offset && offset > 15) {
                // Add class to hide tab
                // btnRef.current?.classList.add('hide-btn');
                navRef.current?.classList.add('hide-nav');
            }
            else {
                // Remove class to display btn
                // btnRef.current?.classList.remove('hide-btn');
                navRef.current?.classList.remove('hide-nav');
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
                navRef
            }}
        >
            {children}
        </ScrollContext.Provider>
    )
}