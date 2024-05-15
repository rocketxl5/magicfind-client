import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './contexthooks/useAuth';
import useFetch from './useFetch';
import useSearch from './contexthooks/useSearch';

const useSearchForm = (inputRef) => {
    const [fetchParams, setFetchParams] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const { auth } = useAuth();

    const {
        dispatch,
        initialState
    } = useSearch();

    const { fetch, fetchApi, error, response, loading } = useFetch();

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

    const getParams = (query, type) => {
        console.log(query)

    const params = {
        archive: {
            endpoint: '/cards/named?exact=',
            config: {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            ref: `/me/archive`,
            resource: 'api'
        },
        catalog: {
            endpoint: '/api/cards/catalog',
            config: {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            ref: '/catalog',
            resource: 'server'
        },
        collection: {
            endpoint: `/api/cards/collection/${auth?.user.id}`,
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': auth?.token
                },
            },
            ref: `/me/collection`,
            resource: 'server'
        },
    }
        if (type !== 'archive') {

            const term = type !== 'archive'
                ?
                query.toLowerCase()
                    .replaceAll(/["/,]/g, '')
                    .replace('  ', ' ')
                    .split(' ')
                    .join('-')
                :
                query;

            return {
                endpoint: `${params[type].endpoint}/${term}`,
                config: params[type].config,
                target: `${params[type].ref}/${term}`,
                resource: params[type].resource,
                term: term,
            }
        }
        else {
            return {
                endpoint: `${params[type].endpoint}${query}`,
                config: params[type].config,
                target: `${params[type].ref}/${query}`,
                resource: params[type].resource,
                term: query,
            }
        }

    }

    const getOracleId = (query) => {

    }

    useEffect(() => {
        if (fetchParams) {
            console.log(fetchParams)
            const { endpoint, config, resource } = fetchParams;
            // Hide Autocomplete predictions list
            clearPredictions();
            fetch(endpoint, config, resource);
        }
    }, [fetchParams])

    useEffect(() => {
        if (response) {
            inputRef?.current?.blur();
            const { target } = fetchParams;
            localStorage.setItem('search-results', JSON.stringify({ ...response }));
            navigate(target, { state: { ...response } });
        }
        if (error) {
            const { term } = fetchParams;
            navigate(`/not-found/${term}`);
            console.error(error)
        }
    }, [error, response])

    return { getParams, getOracleId, setFetchParams, loading, isActive, setIsActive, setSearch, updateSearch, launchSearch, clearSearch, clearPredictions }
}

export default useSearchForm
