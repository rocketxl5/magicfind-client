// Source @ https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser?page=2&tab=scoredesc#tab-top
// Source @ https://www.youtube.com/watch?v=TaPdgj8mucI
import { useState, useEffect, createContext } from 'react';

export const ViewportContext = createContext(null);

export const ViewportProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [viewportWidth, setViewPortWidth] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setViewPortWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    })

    // useEffect(() => {
    //     setViewPortWidth(window.innerWidth);
    // }, [])

    useEffect(() => {
        if (window.innerWidth <= 775) {
            setIsMobile(true);
        }
        else {
            setIsMobile(false);
        }
        setIsTouch('ontouchstart' in window)
    }, [viewportWidth])

    return (
        <ViewportContext.Provider value={{
            isMobile,
            isTouch
        }}>
            {children}
        </ViewportContext.Provider>
    )
}