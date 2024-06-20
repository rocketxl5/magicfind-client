import { useState, useEffect } from 'react';
import useCardLayout from './useCardLayout';
import useModalContext from './contexthooks/useModalContext';

const useSlideShow = () => {
    const [modalSlides, setModalSlides] = useState(null);

    const { setUris } = useModalContext();

    const { layouts, setCardLayouts } = useCardLayout();

    useEffect(() => {
        if (modalSlides) {
            const results = new Map([
                [
                    'layouts',
                    modalSlides.map(collection => collection.map(card => card.layout))
                ],
                [
                    'uris',
                    modalSlides.map(collection => collection.map(card => card.image_uris ?
                        card.image_uris.normal :
                        card.card_faces.map(face => face.image_uris.normal)))
                ]
            ]);

            setUris(results.get('uris'));
            setCardLayouts(results.get('layouts'));
            // console.log(results.get('uris'))
            // console.log(results.get('layouts'))
        }
    }, [modalSlides])

    return { setModalSlides }
}

export default useSlideShow