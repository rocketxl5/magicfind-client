import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './contexthooks/useAuthContext';
import useFetch from './useFetch';
import useSearchContext from './contexthooks/useSearchContext';
import useResults from './useResults';
import { api } from '../api/resources';
import { trimProduct } from '../features/product/services/trimProduct';

const useSearchForm = (inputRef) => {
    const [fetchParams, setFetchParams] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [oracleId, setOracleId] = useState('');

    const navigate = useNavigate();

    const { auth } = useAuthContext();

    const {
        exact,
        dispatch,
        initialState
    } = useSearchContext();

    const { handleSearchResults } = useResults(inputRef);

    const { fetch, error, response, loading } = useFetch();

    function handleSearch(term, exact = true) {
        dispatch({
            type: 'search',
            payload: {
                term: term,
                exact: exact
            }
        });
    }

    function handleClearSearch() {
        dispatch({
            type: 'clear-search',
            payload: initialState
        })
    }

    function handleSetSearch(event, names) {
        dispatch({
            type: 'set-search',
            payload: {
                cardNames: names,
                searchType: event.target.id,
            }
        });
    }

    function handleUpdateSearch(value, predictions) {
        dispatch({
            type: 'update-search',
            payload: {
                inputValue: value,
                predictions: predictions
            }
        });
    }

    function handleSelection(value) {
        dispatch({
            type: 'set-selection',
            payload: value
        })
    }

    function handlePredictions(array) {
        dispatch({
            type: 'clear-predictions',
            payload: {
                predictions: array,
            }
        })
    }

    function handleTracker(tracker, position) {
        dispatch({
            type: 'track-scroll',
            payload: {
                tracker: tracker,
                position: position
            }
        });
    }

    const setString = (str) => {
        return str.toLowerCase()
            .replaceAll(/["/,]/g, '')
            .replace('  ', ' ')
            .split(' ')
            .join('-');
    }

    // type ['archive' || 'catalog' || 'collection']
    // query [input value]
    const getParams = (type, query = undefined) => {
        const params = {
            archive: {
                config: {},
                endpoint: exact ? '/cards/named?exact=' : '/cards/named?fuzzy=',
                ref: `/me/archive`,
                resource: api.scryfallURL,
                // If exact if false, retun null else query
                query: query
            },
            catalog: {
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                endpoint: '/api/cards/catalog/',
                query: query,
                ref: '/catalog',
                resource: api.serverURL,
                term: setString(query),
            },
            collection: {
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': auth?.token
                    },
                },
                endpoint: `/api/users/collection/${auth?.user.id}/`,
                query: query,
                ref: `/me/collection`,
                resource: api.serverURL,
                // If (specific) query to collection is undefined, 
                // query all @ Collection onClick event on all cards button
                term: query ? setString(query) : 'all',
            },
        }

        return {
            resource: params[type].resource,
            endpoint: `${params[type].endpoint}${params[type].term || query}`,
            config: params[type].config,
            query: params[type].query,
            search: {
                // If archive search, return path prefix only, else return path
                path: type === 'archive' ? `${params[type].ref}/` : `${params[type].ref}/${params[type].term}`,
                query: query,
                type: type
            }
        }
    }
    // Removes digital cards
    // Modifies card objects with finish property or,
    // Generates new card object if finishes property has more than one value : [nonfoil, foil, etched]
    // Returns new array of card objects
    const handleApiResponse = (cards) => {
        // Source @ https://stackoverflow.com/questions/63787449/javascript-group-array-of-objects-by-common-values-with-label
        if (cards) {
            return Object.entries(cards?.filter(card => !card.digital)
                .map((card) => {
                    // Return trimmed product object
                    return trimProduct({ type: 'card', product: card });
                })
                .reduce((accumulator, { set_id, ...rest }) => {
                    if (!accumulator[set_id]) accumulator[set_id] = [];

                    accumulator[set_id].push({ set_id, ...rest });

                    return accumulator;
                }, []))
                .map(([id, prints]) => ({ id, prints }))
        }
    }

    useEffect(() => {
        if (fetchParams) {
            const { resource, endpoint, config } = fetchParams;
            // Hide Autocomplete predictions list
            handlePredictions([]);
            // Set query url;
            const url = resource + endpoint;
            // Launch search
            fetch(url, config);
        }
    }, [fetchParams])

    useEffect(() => {
        if (oracleId) {
            const url = `${api.scryfallURL}/cards/search?order=released&q=oracleid%3A${oracleId}&unique=prints`;
            fetch(url);
        }
    }, [oracleId])

    useEffect(() => {
        if (response) {
            const { path, query, type } = fetchParams.search;

            if (type === 'archive' && !oracleId) {

                // set oracle id to fetch all versions
                setOracleId(response.oracle_id);
            }
            else {  
                const data = type === 'archive' ? handleApiResponse(response) : response;

                handleSearchResults(
                    data,
                    {
                        // If archive search, complete path string with first card name, else return path
                        path: type === 'archive' ? path + setString(data[0]?.prints[0].name) : path,
                        // If false, search is scryfall api fuzzy search,
                        // set query with first card name, else return query
                        query: !exact ? data[0]?.prints[0].name : query,
                        type: type
                    }
                );
                inputRef?.current.blur();
            }
        }
        if (error) {
            const { query } = fetchParams;
            navigate(`/not-found/${query?.split(' ').join('+')}`);
            inputRef?.current.blur();
        }
    }, [error, response]);

    return {
        getParams,
        setFetchParams,
        loading,
        isActive,
        handleClearSearch,
        handleSearch,
        setIsActive,
        handleSetSearch,
        handleSelection,
        handleTracker,
        handleUpdateSearch,
    }
}

export default useSearchForm
