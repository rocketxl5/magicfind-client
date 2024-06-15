// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js

//Loads regular size images used @ Modal slide view as ExpandedImage

import { useState, useEffect, createElement } from 'react';

const useLoadImages = () => {
    const [images, setImages] = useState(null);

    // Fetch & load images from uris array
    const loadImages = (uris) => {

        const loadImage = url => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = url;
                image.alt = 'MTG Image'
                image.onload = () => resolve(image);
                image.onerror = error => reject(error);
            });
        }
        Promise.all(uris.map(url => {
            return typeof url === 'string' ?
                loadImage(url) :
                Promise.all(url.map(locator => {
                    return loadImage(locator);
                })).then(data => data)
        }))
            .then((data) => {
                if (data) {
                    setImages(data.map((img, i) => {
                        return img.length ?
                            img.map(image => {
                                return createElement('img', {
                                    key: i,
                                    className: 'modal-image',
                                    name: 'modal-image',
                                    src: image.src,
                                    alt: 'MTG product image'
                                })
                            }) :
                            createElement('img', {
                            key: i,
                            className: 'modal-image',
                            name: 'modal-image',
                            src: img.src,
                            alt: 'MTG product image'
                        })
                    }))
                }
            })
            .catch(error => console.log('Image load has failed', error))
    }
    return { images, loadImages }
}

export default useLoadImages
