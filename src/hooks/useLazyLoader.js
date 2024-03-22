import { useState, useEffect } from 'react';

const useLazyLoader = (product) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.src = product?.image_uris?.small || product?.card_faces[0]?.image_uris?.small;
        img.onload = () => {
            setHasLoaded(true);
        }
    }, [product]);

    return { hasLoaded }
}

export default useLazyLoader
