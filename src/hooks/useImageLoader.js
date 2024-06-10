// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js

//Loads regular size images used @ Modal slide view as ExpandedImage

import { useState, useEffect, createElement } from 'react';

const useImageLoader = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [images, setImages] = useState(null);
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
                    // console.log(data)
                    setImages(data.map((img, i) => {
                        // console.log(img)
                        return createElement('img', {
                            key: i,
                            className: 'modal-image',
                            name: 'modal-image',
                            src: img.src,
                            alt: 'MTG product image'
                        })
                    }))
                    // setImagesLoaded(true);
                }
            })
            .catch(error => console.log('Image load has failed', error))
        }
    }, [uris])

    return { imagesLoaded, setUris, images }
}

export default useImageLoader
