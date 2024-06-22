import { useState, useEffect } from 'react';
import useModalContext from './contexthooks/useModalContext';
import { formatLayout } from '../features/modal/services/formatLayout';

const useSlideShow = () => {
    const [slides, setSlides] = useState(null);
    // Receives index as indicator
    const [slideShowIndex, setSlideShowIndex] = useState(null);

    const { setUris, setLayouts, layouts, images, uris } = useModalContext();

    useEffect(() => {
        if (slides) {
            const results = new Map([
                [
                    'layouts',
                    slides.map(collection => collection.map(card => formatLayout(card.layout)))
                ],
                [
                    'uris',
                    slides.map(collection => collection.map(card => card.image_uris ?
                        card.image_uris.normal :
                        card.card_faces.map(face => face.image_uris.normal)))
                ]
            ]);

            setUris(results.get('uris'));
            setLayouts(results.get('layouts'));
        }
    }, [slides]);

    useEffect(() => {
        if (slideShowIndex !== null) {
            // console.log(slideShowIndex)
            console.log(images[slideShowIndex])
            console.log(layouts)
            console.log(uris)
        }
    }, [slideShowIndex])


    return { setSlides, setSlideShowIndex }
}

export default useSlideShow