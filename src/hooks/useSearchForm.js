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
    const { cardName, predictions, searchTerm, setPredictions, setInputValue } = useSearch();
    const { url, config, getUrl } = useUrl();

    const searchProduct = (prediction, e) => {
        e && e.preventDefault();
        setQuery('');

        let term;
        setPredictions([]);
        if (prediction) {
            setInputValue(prediction)
            // click sur li
            console.log('prediction', prediction)
            term = prediction;
        }
            // else if (cardName) {
            //     // mouseup ou down dans la liste + submit
            //     console.log('cardName')
            //     term = cardName;
            // }
            // else if (predictions.length === 1) {
            //     // submit avec 1 choix
            //     console.log('predictions[0]')
            //     term = predictions[0];
            // }
        else if (searchTerm) {
            // 404
            console.log('searchTerm')
            term = searchTerm;
        }
        // else {
        //     console.log('inputValue')
        //     term = inputValue;
        // }

        setTimeout(() => {
            setQuery(setQueryString(term, '-'));
        }, 200)
    }

    useEffect(() => {
        // console.log(query)
        if (query) {
            getUrl(`${pathname}/${query}`)
        }
    }, [query])

    useEffect(() => {
        if (url && config) {
            fetchOne(url, config);
        }
    }, [url, config])

    useEffect(() => {
        console.log(response)
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
