import { useState, useEffect, createContext } from 'react';

export const ViewportContext = createContext(null);

export const ViewportProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 775) {
                setIsMobile(true);
            }
            else {
                setIsMobile(false);
            }
        }
        window.addEventListener('resize', handleResize);

    }, [])

    useEffect(() => {
        console.log(isMobile)
    }, [isMobile])

    return (
        <ViewportContext.Provider value={{
            isMobile
        }}>
            {children}
        </ViewportContext.Provider>
    )
}