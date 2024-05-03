import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const useFetch = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetchOne = async (query, config) => {
        console.log(query)
        setLoading(true);
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'auth-token': token
        //     },
        // }

        await axios
            .get(`${api.serverURL}${query}`, config)
            .then(res => {
                console.log(res)
                setResult(res.data);
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



    return { fetchOne, fetchAll, loading, showConfirmation, error, result }
}

export default useFetch
