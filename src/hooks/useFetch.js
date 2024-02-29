import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = ({ url, headers }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(url, headers)
            .then(res => {
                setData(res.data);
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [url]);

    return { data, loading, error }
}

export default useFetch
