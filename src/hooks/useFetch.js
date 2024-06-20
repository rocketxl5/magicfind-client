import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetch = async (url, config) => {

        setLoading(true);

        if (error) {
            setError(null);
        }
        if (response) {
            setResponse(null);
        }

        await axios
            .get(url, config)
            .then(res => {
                // console.log(res)
                const data = res.data.data || res.data;
                setResponse(data);
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

    const fetchAllServer = async (collection) => {
        const fetchJSON = async (query, config, setter) => {
            const url = api.serverURL + query;
            const res = await axios.get(url, config);
            if (res.status !== 200) {
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

    const fetchAllAPI = async (queries) => {
        const fetchApi = async (query) => {
            const url = api.scryfallURL + query;
            return new Promise((resolve, reject) => {
                resolve(axios.get(url))
                reject(() => 'Something went wrong @ fetchAllAPI')
            })

        }
        Promise.all(queries.map(query => fetchApi(query)))
            .then(res => {
                setResponse(res.map(result => result.data.data))
            })
            .catch(error => { throw error })
    }

    return { fetch, fetchAllServer, fetchAllAPI, loading, showConfirmation, error, response }
}

export default useFetch
