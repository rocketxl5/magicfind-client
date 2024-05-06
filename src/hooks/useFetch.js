import { useState } from 'react';
import axios from 'axios';
import useAuth from './contexthooks/useAuth';
import { api } from '../api/resources';

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { isAuth, auth } = useAuth()

    const fetchOne = async (query, config) => {
        setLoading(true);

        await axios
            .get(`${api.serverURL}${query}`, config)
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

    return { fetchOne, fetchAll, loading, showConfirmation, error, response }
}

export default useFetch
