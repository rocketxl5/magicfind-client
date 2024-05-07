import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import useSearch from './contexthooks/useSearch';
import useUrl from './useUrl';
import useBlur from './useBlur';
import setQueryString from '../features/search/services/setQueryString';

const useSearchForm = (pathname) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const { updateBlur } = useBlur();
    const { fetchOne, error, response, loading } = useFetch();
    const { cardName, predictions, searchTerm, setPredictions } = useSearch();
    const { url, config, getUrl } = useUrl();

    const searchProduct = (e = null, prediction = '') => {
        e && e.preventDefault();

        setQuery('');

        let term;

        if (prediction) {
            term = prediction;
        }
        else if (cardName) {
            term = cardName;
        }
        else if (predictions.length === 1) {
            term = predictions[0];
        }
        else if (searchTerm) {
            term = searchTerm;
        }

        setTimeout(() => {
            setQuery(setQueryString(term, '-'));
        }, 200)
    }

    useEffect(() => {
        console.log(query)
        if (query) {
            getUrl(`${pathname}/${query}`)
        }
    }, [query])

    useEffect(() => {
        if (url && config) {
            console.log(url)
            setPredictions([]);
            fetchOne(url, config);
        }
    }, [url, config])

    useEffect(() => {
        if (response) {
            updateBlur(response.search);
            localStorage.setItem('search-results', JSON.stringify({ ...response }));
            navigate(`${pathname}/${query}`, { state: { ...response } });
        }
        if (error) {
            console.error(error)
            navigate(`/not-found/${query}`);
        }

    }, [error, response])

    return { searchProduct, loading }
}

export default useSearchForm
