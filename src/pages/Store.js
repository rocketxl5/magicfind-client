import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../layout/Loader';
import useFetchData from '../hooks/useFetchData';

const Store = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const location = useLocation();

    const { fetchData, loading, showConfirmation, error, result } = useFetchData();

    useEffect(() => {

        fetchData(`/api/users/store/${location.state.user.userID}`)

    }, [])

    useEffect(() => {
        if (result) {
            setHasLoaded(true)
            console.log(result)
        }
        else {
            hasLoaded && setHasLoaded(false);
        }
    }, [result])

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error])

    return (
        <>
            {loading && <Loader />}
            {hasLoaded && <div>{result.name}</div>}
        </>
    )
}

export default Store;
