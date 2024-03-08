import { useState, useEffect, createContext } from 'react';

export const ViewportContext = createContext(null);

export const ViewportProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewPortWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setViewPortWidth(window.innerWidth);
            // if (window.innerWidth <= 775) {
            //     setIsMobile(true);
            // }
            // else {
            //     setIsMobile(false);
            // }
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
        // console.log(isMobile)
    }, [viewportWidth])

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