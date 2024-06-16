import { createContext, useState, useEffect, useRef } from 'react';
import useAuthContext from '../hooks/contexthooks/useAuthContext';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [offset, setOffset] = useState(0);
    const { isAuth } = useAuthContext();

    const headerRef = useRef(null);
    const btnRef = useRef(null);
    const countRef = useRef(null);

    const handleScroll = () => {
        const hideHeader = !isAuth ? 'hide-nav' : 'hide-auth-menu';

            if (window.scrollY > offset && offset > 75) {
                // Add class to hide tab
                headerRef.current?.classList.add(hideHeader);
                countRef.current?.classList.add('move-count')
                btnRef.current?.classList.add('hide-btn');
            }
            else {
                // Remove class to display btn
                headerRef.current?.classList.remove(hideHeader);
                countRef.current?.classList.remove('move-count')
                btnRef.current?.classList.remove('hide-btn');
            }

        setOffset(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    }, [offset]);

    return (
        <ScrollContext.Provider
            value={{
                btnRef,
                headerRef,
                countRef
            }}
        >
            {children}
        </ScrollContext.Provider>
    )
}