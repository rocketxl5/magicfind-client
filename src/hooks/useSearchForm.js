import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './contexthooks/useAuth';
import useFetch from './useFetch';
import useSearch from './contexthooks/useSearch';
import { capitalize } from '../assets/utilities/capitalize';
import { api } from '../api/resources';
import { trimProduct } from '../features/product/services/trimProduct';

const useSearchForm = (inputRef) => {
    const [fetchParams, setFetchParams] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [oracleId, setOracleId] = useState('');

    const navigate = useNavigate();

    const { auth } = useAuth();

    const {
        exact,
        dispatch,
        initialState,
    } = useSearch();

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

    function handleSetSearch(names, type) {
        dispatch({
            type: 'set-search',
            payload: {
                cardNames: names,
                searchType: type,
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
            .join('-')
    }

    const getParams = (type, query = undefined) => {
        const params = {
            archive: {
                config: {},
                endpoint: exact ? '/cards/named?exact=' : '/cards/named?fuzzy=',
                ref: `/me/archive`,
                resource: api.scryfallURL,
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
                path: `${params[type].ref}/${params[type].term || setString(query)}`,
                query: query,
                type: type
            }
        }
    }
    // Removes digital cards
    // Modifies card objects with finish property or,
    // Generates new card object if finishes property has more than one value : [nonfoil, foil, etched]
    // Returns new array
    const handleResponse = (cards) => {
        return cards.filter(card => !card.digital)
            .map((card) => {
                const trimmed_card = trimProduct({ type: 'card', product: card });
                return trimmed_card.finishes.map(finish => {
                    console.log(card)
                    return {
                        ...trimmed_card,
                        finish: capitalize(finish),
                        card_id: trimmed_card.id + finish
                    }
                })

            })
            // transform array arrays into single array of objects
            .flat()
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
                return setOracleId(response.oracle_id);
            }
            const data = type === 'archive' ? handleResponse(response) : response;
            inputRef?.current?.blur();
            localStorage.setItem('search-results', JSON.stringify({ ...data }));
            navigate(path, { state: { result: data, type, query } });

        }
        if (error) {
            const { query } = fetchParams;
            navigate(`/not-found/${query.split(' ').join('+')}`);
        }
    }, [error, response])

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
