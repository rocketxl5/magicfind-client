import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetch = async (endpoint, config, resource) => {

        if (error) {
            setError(null);
        }
        if (response) {
            setResponse(null);
        }

        const query = {
            'api': api.skryfallURL,
            'server': api.serverURL
        }

        const url = `${query[resource]}${endpoint}`

        console.log(endpoint)
        console.log('query', url)
        console.log('config', config)
        setLoading(true);
        await axios
            .get(url, config)
            .then(res => {
                console.log(res)
                setResponse(res.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
                setShowConfirmation(true);
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 1500);
            })
    }

    const fetchApi = () => {

    }

    const fetchAll = async (collection) => {

        const fetchJSON = async (query, config, setter) => {
            const res = await axios.get(`${api.serverURL}${query}`, config);
            if (!res.status === 200) {
                throw new Error(`Error ${res.status}`)
            }

            return { data: res.data, setter }
        }

        const results = await Promise.all(collection.map(({ query, config, setter }) => fetchJSON(query, config, setter)));

        setTimeout(() => {
            results.forEach((res) => {
                res.setter(res.data)
            })
        }, 200)
    }

    return { fetch, fetchApi, fetchAll, loading, showConfirmation, error, response }
}

export default useFetch
