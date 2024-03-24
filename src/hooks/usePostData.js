import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const usePostData = (data) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postData = async (token, query) => {
        console.log(data)
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
            })
    }

    return { postData, loading, error, result }
}

export default usePostData
