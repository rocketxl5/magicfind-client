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

    function clearPredictions() {
        dispatch({
            type: 'clear-predictions',
            payload: {
                predictions: [],
            }
        })
    }

    function clearSearch() {
        dispatch({
            type: 'clear-search',
            payload: initialState
        })
    }

    function searchFor(term, exact = true) {
        dispatch({
            type: 'search',
            payload: {
                term: term,
                exact: exact
            }
        });
    }

    function setSearch(names, type) {
        dispatch({
            type: 'set-search',
            payload: {
                cardNames: names,
                searchType: type,
            }
        });
    }

    function updateSearch(value, predictions) {
        dispatch({
            type: 'update-search',
            payload: {
                inputValue: value,
                predictions: predictions
            }
        });
    }

    function setSelection(value) {
        dispatch({
            type: 'set-selection',
            payload: value
        })
    }

    function setTrackSearch(tracker, position) {
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

    const getParams = (query, type) => {
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
                endpoint: `/api/cards/collection/${auth?.user.id}/`,
                query: query,
                ref: `/me/collection`,
                resource: api.serverURL,
                term: setString(query),
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
            clearPredictions();
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
            const { data } = response;
            const { path, query, type } = fetchParams.search;

            if (type === 'archive' && !oracleId) {

                setOracleId(data.oracle_id);
            }
            else {
                inputRef?.current?.blur();
                localStorage.setItem('search-results', JSON.stringify({ ...data }));
                navigate(path, { state: { result: data, type, query } });
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
        clearSearch,
        searchFor,
        setIsActive,
        setSearch,
        setSelection,
        setTrackSearch,
        updateSearch,
    }
}

export default useSearchForm
