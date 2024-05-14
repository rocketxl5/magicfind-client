import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './contexthooks/useAuth';
import useFetch from './useFetch';
import useSearch from './contexthooks/useSearch';

const useSearchForm = (inputRef) => {
    const [fetchParams, setFetchParams] = useState(null);

    const navigate = useNavigate();

    const { auth } = useAuth();

    const {
        dispatch,
        initialState
    } = useSearch();

    const { fetchOne, error, response, loading } = useFetch();

    const prefix = '/api/cards';

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

    function clearPredictions() {
        dispatch({
            type: 'clear-predictions',
            payload: []
        })
    }

    const params = {
        archive: {
            query: `${prefix}/archive/${auth?.user.id}`,
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': auth?.token
                },
            },
            ref: `/me/archive`
        },
        catalog: {
            query: `${prefix}/catalog`,
            config: {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            ref: '/catalog'
        },
        collection: {
            query: `${prefix}/collection/${auth?.user.id}`,
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': auth?.token
                },
            },
            ref: `/me/collection`
        },
    }

    const search = (searchTerm, type) => {
        const term = searchTerm.toLowerCase()
            .replaceAll(/["/,]/g, '')
            .split(' ')
            .join('-');

        setFetchParams({
            url: `${params[type].query}/${term}`,
            config: params[type].config,
            target: `${params[type].ref}/${term}`,
            term: term
        });
    }

    useEffect(() => {
        if (fetchParams) {
            const { url, config } = fetchParams;
            // Hide Autocomplete predictions list
            clearPredictions();
            fetchOne(url, config);
            setTimeout(() => clearPredictions(), 200)
        }
    }, [fetchParams])

    useEffect(() => {
        if (response) {
            inputRef.current?.blur();
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

    return { search, loading, setSearch, updateSearch, launchSearch, clearSearch, clearPredictions }
}

export default useSearchForm
