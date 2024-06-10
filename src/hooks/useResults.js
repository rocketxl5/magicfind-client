import { useState, useEffect } from 'react';
import Set from '../features/search/components/Set';
import useCollectionModal from './useCollectionModal';
import useSlideView from './useSlideView';
import useImageLoader from './useImageLoader';

const useResults = () => {
    const [searchResults, setSearchResults] = useState(null);

    // const [view, updateSlideView] = useSlideView(handleSlideView);

    // const [state, updateCollectionItem] = useCollectionModal(search?.type, handleCollectionItem);

    const { images, setUris } = useImageLoader();

    // function handleSlideView(e, layout, expandedImage) {
    //     e.stopPropagation();
    //     updateSlideView(layout, expandedImage);
    // }

    // function handleCollectionItem(e, card, expandedImage) {
    //     e.stopPropagation();
    //     updateCollectionItem(e.target.id, card, expandedImage);
    // }

    const handleSearchResults = (data, type) => {
        // const { type, searchResults } = search;
        switch (type) {
            case 'archive':
                setSearchResults(data.map((set, i) => <Set key={i} set={set} />))
                break;
            case 'catalog':
                handleCatalog(data);
                break;
            case 'collection':
                handleCollection(data);
                break;

            default:
                console.log('unknown search')
                break;
        }
    }

    function handleCatalog(query, result) { }
    function handleCollection(query, result) { }

    return { searchResults, handleSearchResults }
}

export default useResults
