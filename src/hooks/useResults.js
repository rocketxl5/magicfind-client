import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Set from '../features/search/components/Set';
import useCollectionModal from './useCollectionModal';
import useSlideView from './useSlideView';
import useSearch from './contexthooks/useSearch';
import useImageLoader from './useImageLoader';

const useResults = (inputRef) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [view, updateSlideView] = useSlideView(handleSlideView);

    // const [state, updateCollectionItem] = useCollectionModal(search?.type, handleCollectionItem);

    const { setResults } = useSearch();

    // function handleSlideView(e, layout, expandedImage) {
    //     e.stopPropagation();
    //     updateSlideView(layout, expandedImage);
    // }

    // function handleCollectionItem(e, card, expandedImage) {
    //     e.stopPropagation();
    //     updateCollectionItem(e.target.id, card, expandedImage);
    // }


    const handleSearchResults = (data, props) => {
        const { path, query, type } = props;
        switch (type) {
            case 'archive':
                setResults(data.map((set, i) => <Set key={i} set={set} />))
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
        localStorage.setItem('search-results', JSON.stringify({ data: data, props: props }))
        navigate(path, { state: { query: query } });
    }

    function handleCatalog(query, result) { }
    function handleCollection(query, result) { }

    return { handleSearchResults }
}

export default useResults
