// source @ https://codesandbox.io/p/sandbox/react-image-preload-ptosn?file=%2Fsrc%2FApp.js
import { useState, useEffect } from 'react'
import { json } from 'react-router-dom';

const useImageLoader = (cards) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    useEffect(() => {
        const loadImage = card => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                const uri = card.image_uris?.normal || card.card_faces[0]?.image_uris.normal;
                image.src = uri;
                image.onload = () => resolve(card);
                image.onerror = error => reject(error);
            });
        }
        Promise.all(cards.map(card => loadImage(card)))
            .then((data) => {
                if (data) {
                    setImagesLoaded(true);
                }
            })
            .catch(error => console.log('Image load has failed', error))
    }, [cards])

    return { cards, imagesLoaded }
}

export default useImageLoader
