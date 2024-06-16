// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js

//Loads regular size image elements.
// Sets array of modal ready image components with image elements. 
import { useState, createElement } from 'react';

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
                // String url [single faced cards]
                loadImage(url) :
                // Array of url [reversible cards]
                Promise.all(url.map(locator => {
                    return loadImage(locator);
                })).then(data => data)
        }))
            .then((data) => {
                if (data) {
                    // Create image element
                    setImages(data.map((img, i) => {
                        // Array of image components [reversible cards]
                        return img.length ?
                            img.map(image => {
                                return createElement('img', {
                                    key: i,
                                    className: 'slide-image',
                                    name: 'slide-image',
                                    src: image.src,
                                    alt: 'MTG product image'
                                })
                            }) :
                            // Single image component [single faced cards]
                            createElement('img', {
                                key: i,
                                className: 'slide-image',
                                name: 'slide-image',
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
