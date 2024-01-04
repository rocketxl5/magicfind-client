import { useReducer, useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const ACTIONS = {
    SEARCH_CATALOG: 'search-catalog',
    SEARCH_COLLECTION: 'search-collection',
    SEARCH_API: 'search-api'
}

const useSearchCards = (isActive, callback) => {
    const {
        errorMessage,
        setErrorMessage,
        searchInput,
        setSearchInput,
        searchTerm,
        cardName,
        setCardName,
        setCardNames,
        predictions,
        setLoading,
        apiCards,
        setApiCards,
    } = useContext(SearchContext);

    const INPUT_PROPS = {
        CATALOG: {
            id: 'search-catalog', className: 'search-catalog-field', placeholder: 'Search Magic Find', searchCard: callback, isActive: isActive
        },
        COLLECTION: {
            id: 'search-collection', className: 'search-field', placeholder: 'Search Your Collection', searchCard: callback, isActive: isActive
        },
        API: {
            id: 'search-api', className: 'search-field', placeholder: 'Search MTG Cards', searchCard: callback, isActive: isActive
        },
    }


    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.SEARCH_CATALOG:
                return;
            case ACTIONS.SEARCH_COLLECTION:

                return;
            case ACTIONS.SEARCH_API:

                return;

            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(reducer)

    const updateState = (event) => {
        dispatch({
            type: event.id,
        })
    }
    return [state, { updateState }]
}

export default useSearchCards
