// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js

//Loads regular size image elements.
// Sets array of modal ready image components with image elements. 
import { useState, createElement } from 'react';

const useLoadImage = () => {
    const [images, setImages] = useState(null);

    const loadImage = url => {
        // console.log(url)
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.alt = 'MTG Image'
            image.onload = () => resolve(image);
            image.onerror = error => reject(error);
        });
    }

    // Fetch & load images from uris array
    const preloadImages = (uris) => {
        // console.log(uris)
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
                    // console.log(data)
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

    const preloadFeatureImages = (features) => {

        // console.log(uris) */
        Promise.all(features.map(uris => {
            // console.log(locators)
            return Promise.all(uris.map(uri => {
                // console.log(locator)
                return typeof uri === 'string' ?
                    // String url [single faced cards]
                    loadImage(uri) :
                    // Array of url [reversible cards]
                    Promise.all(uri.map(locator => {
                        // console.log(locator)
                        return loadImage(locator);
                    })).then(data => data)
            }))
        }))
            .then((data) => {
                if (data) {
                    setImages(data.map((img, i) => {
                        return img.map(image => {
                            if (!Array.isArray(image)) {

                                return createElement('img', {
                                    key: i,
                                    className: 'slide-image',
                                    name: 'slide-image',
                                    src: image.src,
                                    alt: 'MTG product image'
                                })
                            }

                            else {
                                return image.map(img => {
                                    return createElement('img', {
                                        key: i,
                                        className: 'slide-image',
                                        name: 'slide-image',
                                        src: img.src,
                                        alt: 'MTG product image'
                                    })
                                })
                            }
                        })
                    }))
                }
            })
            .catch(error => console.log('Image load has failed', error))
    }


    return { images, preloadImages, preloadFeatureImages }
}

export default useLoadImage
