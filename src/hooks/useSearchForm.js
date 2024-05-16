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
        dispatch,
        initialState
    } = useSearch();

    const { fetch, error, response, loading } = useFetch();

    function clearPredictions() {
        dispatch({
            type: 'clear-predictions',
            payload: []
        })
    }

    function clearSearch() {
        dispatch({
            type: 'clear-search',
            payload: initialState
        })
    }

    function launchSearch(term) {
        dispatch({
            type: 'launch-search',
            payload: term
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
                endpoint: '/cards/named?exact=',
                config: {},
                ref: `/me/archive`,
                resource: api.scryfallURL,
                origin: 'scryfall',
            },
            catalog: {
                endpoint: '/api/cards/catalog/',
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                term: setString(query),
                ref: '/catalog',
                resource: api.serverURL,
                origin: 'server',
            },
            collection: {
                endpoint: `/api/cards/collection/${auth?.user.id}/`,
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': auth?.token
                    },
                },
                term: setString(query),
                ref: `/me/collection`,
                resource: api.serverURL,
                origin: 'server',
            },
        }

        return {
            resource: params[type].resource,
            endpoint: `${params[type].endpoint}${params[type].term || query}`,
            config: params[type].config,
            origin: params[type].origin,

            search: {
                path: `${params[type].ref}/${params[type].term || setString(query)}`,
                query: query,
                type: type
            }
        }
    }

    useEffect(() => {
        if (fetchParams) {
            const { resource, endpoint, config, origin } = fetchParams;
            // Hide Autocomplete predictions list
            clearPredictions();
            const url = resource + endpoint;
            fetch(url, config, origin);
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
            const { data, origin } = response;
            if (origin === 'scryfall') {
                setOracleId(data.oracle_id)
            }
            else {
                const { path, query, type } = fetchParams.search;
                localStorage.setItem('search-results', JSON.stringify({ ...response.data }));
                navigate(path, { state: { result: response.data, type, query } });
            }
            inputRef?.current?.blur();
        }
        if (error) {
            const { term } = fetchParams;
            navigate(`/not-found/${term}`);
        }
    }, [error, response])

    return {
        getParams,
        setFetchParams,
        loading,
        isActive,
        clearPredictions,
        clearSearch,
        launchSearch,
        setIsActive,
        setSearch,
        setSelection,
        setTrackSearch,
        updateSearch,
    }
}

export default useSearchForm
