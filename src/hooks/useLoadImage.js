// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js
import { useState, useEffect } from 'react'

const useLoadImage = (urls) => {

    const [imagesLoaded, setImagesLoaded] = useState(null);
    useEffect(() => {
        if (urls) {
        const loadImage = url => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = url;
                image.alt = 'Magic card image'
                image.onload = () => resolve(url);
                image.onerror = error => reject(error);
            });
        }
        Promise.all(urls.map(url => loadImage(url)))
            .then((data) => {
                if (data) {
                    setImagesLoaded(true);
                }
            })
            .catch(error => console.log('Image load has failed', error))
        }
    }, [urls])

    return [imagesLoaded]
}

export default useLoadImage
