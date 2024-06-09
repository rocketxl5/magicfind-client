import { useState, useEffect } from 'react';
import Set from '../features/search/components/Set';
import useSearch from './contexthooks/useSearch';
import useSlideView from './useSlideView';
import useCollectionModal from './useCollectionModal';

const useResult = (search) => {
    const [results, setResults] = useState([]);

    const [view, updateSlideView] = useSlideView(handleSlideView);

    const [state, updateCollectionItem] = useCollectionModal(search?.type, handleCollectionItem);


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
    }, [search]);

    function handleCatalog(query, result) { }
    function handleCollection(query, result) { }

    return { results, state, view }
}

export default useResult
