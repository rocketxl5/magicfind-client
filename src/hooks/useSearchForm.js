import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './contexthooks/useAuth';
import useFetch from './useFetch';
import useSearch from './contexthooks/useSearch';
import { api } from '../api/resources';

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
        console.log(value)
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
        console.log(query)
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

    useEffect(() => {
        if (fetchParams) {
            const { resource, endpoint, config } = fetchParams;
            // Hide Autocomplete predictions list
            handlePredictions([]);
            const url = resource + endpoint;
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
            const product = response;
            const { path, query, type } = fetchParams.search;

            if (type === 'archive' && !oracleId) {
                setOracleId(product.oracle_id);
            }
            else {
                inputRef?.current?.blur();
                console.log(product)
                localStorage.setItem('search-results', JSON.stringify({ ...product }));
                navigate(path, { state: { result: product, type, query } });
            }
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
