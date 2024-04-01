import { useState, useEffect } from 'react';

const useLazyLoader = (product) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        console.log(product)
        const img = new Image();
        img.src = product?.image_uris?.normal || product?.card_faces[0]?.image_uris?.normal;
        img.onload = () => {
            setHasLoaded(true);
        }
    }, [product]);

    return { hasLoaded }
}

export default useLazyLoader
