import { useState, useEffect } from 'react';
import useModalContext from './contexthooks/useModalContext';
import useLoadImage from './useLoadImage';
import { formatLayout } from '../features/modal/services/formatLayout';

const useSlideShow = () => {
    const [featureSlides, setFeatureSlides] = useState(null);
    // Receives index as indicator

    const { preloaded, loadSlideShowImages } = useLoadImage();
    // const { handleModalImageUris, handleModalImageLayouts } = useModalContext();
    const { handleModalImageUris, handleModalImageLayouts } = useModalContext();

    useEffect(() => {
        if (featureSlides) {
            const results = new Map([
                [
                    'layouts',
                    featureSlides.map(collection => collection.map(card => formatLayout(card.layout)))
                ],
                [
                    'uris',
                    featureSlides.map(collection => collection.map(card => card.image_uris ?
                        card.image_uris.normal :
                        card.card_faces.map(face => face.image_uris.normal)))
                ]
            ]);
            console.log(results.get('layouts'))
            handleModalImageUris(results.get('uris'));
            handleModalImageLayouts(results.get('layouts'));
        }
    }, [featureSlides]);


    // useEffect(() => {
    //     if (uris) {
    //         loadSlideShowImages(uris)
    //     }
    // }, [uris]);

    // useEffect(() => {
    //     if (preloaded) {
    //         // console.log(preloaded)
    //         handleModalImage(preloaded);
    //     }
    // }, [preloaded]);

    return { setFeatureSlides }
}

export default useSlideShow