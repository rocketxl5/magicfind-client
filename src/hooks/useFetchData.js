import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const useFetchData = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false)

    const fetchData = async (query, token) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }

        await axios
            .get(`${api.serverURL}${query}`, config)
            .then(res => {
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

    return { fetchData, loading, showConfirmation, error, result }
}

export default useFetchData
