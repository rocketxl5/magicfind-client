import { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from './useFetch';
import { api } from '../api/resources';

const useSearch = () => {
    const [response, setResponse] = useState(null);

    const { fetchOne, loading, error, result } = useFetch();

    useEffect(() => {
        if (error) {
            return console.error(error.message)
        }

        setResponse({ ...result });

    }, [result, error])

    const fetchSearchResult = (pathname) => {
        // Extract path segments from pathname
        const segments = pathname.substring(1).split('/');
        const search = segments[0];
        const product = segments[1];
        const url = `/api/cards/${search}/${encodeURIComponent(product)}`;
        const headers = { headers: { 'Content-Type': 'application/json' } }
        fetchOne(url, headers);
    }
    return { fetchSearchResult, loading, error, response }
}

export default useSearch
