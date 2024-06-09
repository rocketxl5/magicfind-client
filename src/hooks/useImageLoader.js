// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js

//Loads regular size images used @ Modal slide view as ExpandedImage

import { useState, useEffect } from 'react';

const useImageLoader = (cards) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [urls, setUrls] = useState(null)

    // Set urls array from cards array
    useEffect(() => {
        if (cards?.length) {
            if (!urls) {
                let imgUrls = []
                cards.forEach(card => {
                    if (card.image_uris) {
                        imgUrls.push(card.image_uris?.normal);
                    }
                    else if (card.card_faces) {
                        card.card_faces.forEach(card_face => {
                            imgUrls.push(card_face.image_uris?.normal);
                        })
                    }
                })
                setUrls(imgUrls);
            }
        }
    }, [cards])

    // Fetch & load images from urls array
    useEffect(() => {
        if (urls) {
        const loadImage = url => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = url;
                image.alt = 'Magic Card Image'
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

export default useImageLoader
