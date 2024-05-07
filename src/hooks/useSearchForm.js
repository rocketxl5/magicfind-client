import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import useSearch from './contexthooks/useSearch';
import useUrl from './useUrl';
import useBlur from './useBlur';
import setQueryString from '../features/search/services/setQueryString';
import { setUrl } from '../features/search/services/setUrl';

const useSearchForm = (pathname) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const { updateBlur } = useBlur();
    const { fetchOne, error, response, loading } = useFetch();
    const { cardName, predictions, searchTerm, setPredictions } = useSearch();
    const { url, config, getUrl } = useUrl();

    const searchProduct = (e = null, prediction = '') => {
        e && e.preventDefault();

        let term;

        if (prediction) {
            term = prediction
        }
        else if (cardName) {
            term = cardName
        }
        else if (predictions.length === 1) {
            term = predictions[0];
        }
        else if (searchTerm) {
            term = searchTerm
        }
        console.log(term)
        setQuery(setQueryString(term, '-'));
    }

    useEffect(() => {
        console.log(pathname)
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
            // setLoading(false);
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
