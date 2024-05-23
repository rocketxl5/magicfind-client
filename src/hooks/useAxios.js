import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';


const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetch = async (url, config) => {

        if (error) {
            setError(null);
        }
        if (response) {
            setResponse(null);
        }

        await axios
            .get(url, config)
            .then(res => {
                const data = res.data.data || res.data;
                setResponse(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setShowConfirmation(true);
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 1500);
            })
    }

    const fetchAll = async (collection, api) => {
        const fetchJSON = async (query, config, setter) => {
            const url = api + query;
            const res = await axios.get(url, config);
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

    const post = async (token, query, data) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }

        await axios
            .post(`${api.serverURL}${query}`, data, config)
            .then(res => {
                const data = res.data.data || res.data;
                setResponse(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setShowConfirmation(true);
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 1500);
            })
    }

    const patch = async (token, query, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }

        await axios
            .patch(`${api.serverURL}${query}`, data, config)
            .then(res => {
                const data = res.data.data || res.data;
                setResponse(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setShowConfirmation(true);
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 1500);
            })
    }

    return { fetch, fetchAll, post, patch, showConfirmation, error, response }
}

export default useAxios
