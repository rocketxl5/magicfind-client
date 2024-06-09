// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js

//Loads regular size images used @ Modal slide view as ExpandedImage

import { useState, useEffect } from 'react';

const useImageLoader = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [uris, setUris] = useState(null);

    // Fetch & load images from uris array
    useEffect(() => {
        if (uris) {

        const loadImage = url => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = url;
                image.alt = 'MTG Image'
                image.onload = () => resolve(image);
                image.onerror = error => reject(error);
            });
        }
            Promise.all(uris.map(url => loadImage(url)))
            .then((data) => {
                if (data) {
                    setImagesLoaded(true);
                }
            })
            .catch(error => console.log('Image load has failed', error))
        }
    }, [uris])

    return { imagesLoaded, setUris }
}

export default useImageLoader
