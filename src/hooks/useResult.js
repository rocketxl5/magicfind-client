import { useState, useEffect } from 'react';
import Set from '../features/search/components/Set';
import useImageLoader from './useImageLoader';
import useSearch from './contexthooks/useSearch';
import useSlideView from './useSlideView';
import useCollectionModal from './useCollectionModal';

const useResult = (search) => {
    const [searchResult, setSearchResult] = useState([]);

    const [imagesLoaded] = useImageLoader(search?.result);

    const [view, updateSlideView] = useSlideView(handleSlideView);

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

    useEffect(() => {
        if (search) {
            console.log(search)
            const { query, result, type } = search;
            switch (type) {
                case 'archive':
                    handleArchive(query, result);
                    break;
                case 'catalog':
                    handleCatalog(query, result);
                    break;
                case 'collection':
                    handleCollection(query, result);
                    break;

                default:
                    console.log('unknown search')
                    break;
            }
        }
    }, [search]);

    function handleArchive(query, result) {

        console.log(result)

        setSearchResult(result.map((set, i) => <Set key={i} set={set} />))

    }
    function handleCatalog(query, result) { }
    function handleCollection(query, result) { }

    return { imagesLoaded, searchResult, state, view }
}

export default useResult
