import { useState, useEffect, createContext } from 'react';

export const ViewportContext = createContext(null);

export const ViewportProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewPortWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setViewPortWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    }, [])


    useEffect(() => {

        if (viewportWidth <= 775) {
            setIsMobile(true);
        }
        else {
            setIsMobile(false);
        }
    }, [viewportWidth])

    return (
        <ViewportContext.Provider value={{
            isMobile
        }}>
            {children}
        </ViewportContext.Provider>
    )
}