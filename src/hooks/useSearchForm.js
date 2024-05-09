import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import useSearch from './contexthooks/useSearch';
import useUrl from './useUrl';
import useBlur from './useBlur';
import setQueryString from '../features/search/services/setQueryString';

const useSearchForm = (pathname, type) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const { updateBlur } = useBlur();
    const { fetchOne, error, response, loading } = useFetch();
    const { setPredictions, setInputValue, setSearchTerm, searchTerm } = useSearch();
    const { url, config, getUrl } = useUrl();

    useEffect(() => {
        // console.log('searchTerm', searchTerm)
        // console.log('type', type)
        // setInputValue(searchTerm);
        // setPredictions([]);
        // setSearchTerm('');
        if (searchTerm) {
            setPredictions([]);
            setInputValue(searchTerm);
            setTimeout(() => {
                // setQuery(setQueryString(searchTerm, '-'));
                getUrl(`${pathname}/${setQueryString(searchTerm, '-')}`)
            }, 200)
        }
    }, [searchTerm])

    // useEffect(() => {
    //     if (query) {
    //         console.log('query', query)
    //         getUrl(`${pathname}/${query}`)
    //     }
    // }, [query])

    useEffect(() => {
        if (url && config) {
            setInputValue('')
            setSearchTerm('');
            // console.log('url', url)
            fetchOne(url, config);
        }
    }, [url, config])

    useEffect(() => {
        if (response) {
            // Pass boolean flag to reset switchOn state
            console.log(response)
            // updateBlur(response.search === 'catalog' ? true : false);
            // localStorage.setItem('search-results', JSON.stringify({ ...response }));
            // navigate(`${pathname}/${query}`, { state: { ...response } });
        }
        if (error) {
            console.error(error)
            // navigate(`/not-found/${query}`);
        }

    }, [error, response])

    return { loading }
}

export default useSearchForm
