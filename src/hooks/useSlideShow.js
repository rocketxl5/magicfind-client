import { useState, useEffect } from 'react';
import useCardLayout from './useCardLayout';
import useModalContext from './contexthooks/useModalContext';
import { formatLayout } from '../features/modal/services/formatLayout';

const useSlideShow = () => {
    const [slides, setSlides] = useState(null);
    const { setUris, setLayouts } = useModalContext();

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


    return { setSlides }
}

export default useSlideShow