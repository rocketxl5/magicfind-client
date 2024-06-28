import { useState, useEffect, createContext } from 'react';
import useLoadImage from '../hooks/useLoadImage';
import useFetch from '../hooks/useFetch';
import { formatLayout } from '../features/modal/services/formatLayout';
import mediaFeatures from '../data/MEDIA_FEATURES.json';

export const FeatureContext = createContext(null);

export const FeatureProvider = ({ children }) => {
    const [feature, setFeature] = useState(false);
    const [featureProps, setFeatureProps] = useState(null);
    const [props, setProps] = useState(null);
    const { featureImages, preloadFeatureImages } = useLoadImage();
    const { fetchAllAPI, error, response } = useFetch();
    const { features } = mediaFeatures;

    useEffect(() => {
        if (feature) {
            const queries = features.map(feature => `/cards/search?order=set&q=e%3Asld+${feature.query}&unique=cards`);
            fetchAllAPI(queries);
        }
    }, [feature]);

    useEffect(() => {
        if (response) {

            const props = new Map([
                [
                    'layouts',
                    response.map(res => res.map(obj => formatLayout(obj.layout)))
                ],
                [
                    'uris',
                    response
                        .map(res => res
                            .map(obj => obj.card_faces ?
                                obj.card_faces
                                    .map(face => face.image_uris.normal) :
                                obj.image_uris.normal))
                ],
            ]);

            if (props) {
                setProps(props);
            }
        }
    }, [response])

    useEffect(() => {
        if (props) {
            preloadFeatureImages(props.get('uris'));
        }
    }, [props])

    useEffect(() => {
        if (featureImages) {
            const covers = featureImages.map((images, i) => images[features[i].cover][0] || images[features[i].cover])
            const titles = features.map((feature, i) => feature.title)
            if (covers && titles) {
                setFeatureProps(
                    props.get('layouts').map((layouts, i) => {
                        return {
                            cover: covers[i],
                            images: featureImages[i],
                            layouts: layouts,
                            title: titles[i],
                        }
                    })
                )
            }
        }
    }, [featureImages])

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return (
        <FeatureContext.Provider
            value={{
                feature,
                setFeature,
                featureProps
            }}
        >
            {children}
        </FeatureContext.Provider>
    );
}