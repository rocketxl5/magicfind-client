import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const useSkryfall = () => {
    const [card, setCard] = useState('');

    const { fetch, error, response, } = useFetch();

    useEffect(() => {
        if (card) {
            const config = {
                'Content-Type': 'application/json',
            };
            const isApi = true
            // Passes boolean value for api check @ useFetch
            fetch(card, config, true)
        }
    }, [card]);

    useEffect(() => {

    }, [response])

    useEffect(() => {

    }, [error])

    return { setCard, response }
}

export default useSkryfall
