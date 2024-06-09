import { useState, useEffect } from 'react';
import Set from '../features/search/components/Set';
import useImageLoader from './useImageLoader';
import useSearch from './contexthooks/useSearch';
import useSlideView from './useSlideView';
import useCollectionModal from './useCollectionModal';

const useResult = (search) => {
    const [results, setResults] = useState([]);
    const [searchResults, setSearchResults] = useState(null);

    const [view, updateSlideView] = useSlideView(handleSlideView);

    const { imagesLoaded, setUris } = useImageLoader()

    const [state, updateCollectionItem] = useCollectionModal(search?.type, handleCollectionItem);

    const { cardSets } = useSearch();

    function handleSlideView(e, layout, expandedImage) {
        e.stopPropagation();
        updateSlideView(layout, expandedImage);
    }

    function handleCollectionItem(e, card, expandedImage) {
        e.stopPropagation();
        updateCollectionItem(e.target.id, card, expandedImage);
    }

    const getImgUris = (args) => {
        const { results, type } = args;
        console.log(results)
        if (type === 'archive') {
            const print_uris = results.map((result) => result.prints)
                .flat()
                .map(print => print.image_uris ? print.image_uris.normal : print.card_face.image_uris.normal)
            // console.log(prints)
            const icon_uris = results.map((result) => cardSets[result.id]?.icon_svg_uri)

            return [...print_uris, ...icon_uris]
        }
        else {
            return []
        }
    }

    useEffect(() => {
        if (search) {
            console.log(search)
            const uris = getImgUris(search);
            console.log(uris)
            setUris(uris);
        }
    }, [search])

    // useEffect(() => {
    //     if (search) {
    //         setSearchResults({...search});
    //     }
    // }, [search]);

    useEffect(() => {
        if (imagesLoaded) {
            const { type, results } = search; 
            switch (type) {
                case 'archive':
                    setResults(results.map((set, i) => <Set key={i} set={set} />))
                    break;
                case 'catalog':
                    handleCatalog(results);
                    break;
                case 'collection':
                    handleCollection(results);
                    break;

                default:
                    console.log('unknown search')
                    break;
            }
        }
    }, [imagesLoaded])

    // function handleArchive(result) {
    //     const products = result.map(res => res.prints).flat();
    //     // console.log(products)
    //     setLoadImages(products)
    // }
    function handleCatalog(query, result) { }
    function handleCollection(query, result) { }

    return { results, state, view }
}

export default useResult
