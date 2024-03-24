import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/resources';

const useGetData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url, headers) => {
        setLoading(true);
        await axios
            .get(`${api.serverURL}${url}`, headers)
            .then(res => {
                console.log(res.data)

                setData(res.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return { fetchData, loading, error, data }
}

export default useGetData
