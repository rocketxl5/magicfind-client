import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const usePost = (data) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false)

    const postData = async (token, query) => {
        setLoading(true);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }

        await axios
            .post(`${api.serverURL}${query}`, data, config)
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

    return { postData, loading, showConfirmation, error, result }
}

export default usePost
