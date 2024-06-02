import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const usePatch = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false)

    const patch = async (token, data, query) => {
        setLoading(true);
        // console.log(query)
        // console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }

        await axios
            .patch(`${api.serverURL}${query}`, data, config)
            .then(res => {
                console.log(res.data)
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

    return { patch, loading, showConfirmation, error, result }
}

export default usePatch
