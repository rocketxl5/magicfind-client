import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../layout/Loader';
import useFetch from '../hooks/useFetch';

const Seller = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const location = useLocation();

    const { fetchOne, loading, showConfirmation, error, response } = useFetch();

    useEffect(() => {
        // console.log(location)
        fetchOne(`/api/users/store/${location.state?.user.userID}`, { headers: { 'Content-Type': 'application/json' } })

    }, [])

    useEffect(() => {
        if (response) {
            setHasLoaded(true)

        }
        else {
            hasLoaded && setHasLoaded(false);
        }
    }, [response])

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error])

    return (
        <>
            {loading && <Loader />}
            {hasLoaded && <div>{response.name}</div>}
        </>
    )
}

export default Seller;
