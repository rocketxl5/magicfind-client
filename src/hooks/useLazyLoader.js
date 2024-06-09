import { useState, useEffect } from 'react';

const useLazyLoader = (src) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        if (src) {

            const img = new Image();
            img.src = <source media="(min-width: )" srcset="" />;
            img.onload = () => {
                setHasLoaded(true);
            }
        }
    }, [src]);

    return { hasLoaded }
}

export default useLazyLoader
