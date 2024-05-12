import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './contexthooks/useAuth';
import useFetch from './useFetch';

const useSearchForm = (type = null, clearSearch) => {
    const [fetchParams, setFetchParams] = useState(null);

    const navigate = useNavigate();

    const { auth } = useAuth();

    const { fetchOne, error, response, loading } = useFetch();

    const prefix = '/api/cards';

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

    const search = (searchTerm) => {
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
            fetchOne(url, config);
        }
    }, [fetchParams])

    useEffect(() => {
        if (response) {
            const { target } = fetchParams;
            localStorage.setItem('search-results', JSON.stringify({ ...response }));
            navigate(target, { state: { ...response } });
        }
        if (error) {
            const { term } = fetchParams;
            navigate(`/not-found/${term}`);
            console.error(error)
        }

        clearSearch();
    }, [error, response])

    return { search, loading }
}

export default useSearchForm
