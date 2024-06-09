// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js

//Loads regular size images used @ Modal slide view as ExpandedImage

import { useState, useEffect } from 'react';

const useImageLoader = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [uris, setUris] = useState(null);

    // Set uris array from cards array
    // useEffect(() => {
    //     if (loadImages.length > 0) {
    //     // if (!uris) {
    //             let imguris = []
    //         loadImages.forEach(el => {
    //             if (el.image_uris) {
    //                 imguris.push(el.image_uris?.normal);
    //                 }
    //             else if (el.card_faces) {
    //                 el.card_faces.forEach(card_face => {
    //                         imguris.push(card_face.image_uris?.normal);
    //                     })
    //                 }
    //             })
    //         // console.log(imguris)
    //             seturis(imguris);
    //         // }
    //     }
    // }, [loadImages])

    // Fetch & load images from uris array
    useEffect(() => {
        if (uris) {
        // console.log(uris)
        const loadImage = url => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = url;
                image.alt = 'Magic Card Image'
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
