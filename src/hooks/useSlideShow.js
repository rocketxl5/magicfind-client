import { useState, useEffect } from 'react';
import useModalContext from './contexthooks/useModalContext';
import { formatLayout } from '../features/modal/services/formatLayout';

const useSlideShow = () => {
    const [slides, setSlides] = useState(null);
    // Receives index as indicator

    const { handleModalImageUris, handleModalImageLayouts } = useModalContext();

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
            console.log(results.get('layouts'))
            handleModalImageUris(results.get('uris'));
            handleModalImageLayouts(results.get('layouts'));
        }
    }, [slides]);



    return { setSlides }
}

export default useSlideShow