import { useState, useEffect, createContext } from 'react';

export const ViewportContext = createContext(null);

export const ViewportProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewPortWidth] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setViewPortWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    })

    useEffect(() => {
        setViewPortWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        const width = window.innerWidth;
        if (width <= 775) {
            setIsMobile(true);
        }
        else {
            setIsMobile(false);
        }
    }, [viewportWidth])

    return (
        <ViewportContext.Provider value={{
            isMobile,
            viewportWidth
        }}>
            {children}
        </ViewportContext.Provider>
    )
}