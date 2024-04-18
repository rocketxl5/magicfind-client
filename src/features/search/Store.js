import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../../layout/Loader';
import Page from '../../components/Page';
import useFetchData from '../../hooks/useFetchData';
import useAuth from '../../hooks/contexthooks/useAuth';

const Store = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [cards, setCards] = useState([])
    const location = useLocation();

    const { auth } = useAuth();
    const { fetchData, loading, showConfirmation, error, result } = useFetchData();

    useEffect(() => {
        fetchData(`/api/users/store/${auth.user.id}`)

    }, [])

    useEffect(() => {
        if (result) {
            // setHasLoaded(true);
            // const publishedCards = result.cards.filter(card => card._is_published);
            setCards(result);
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
            <Page name={'store'} title={'Store'}>
                {cards.length && <div>{result.name}</div>}
            </Page>
        </>
    )
}

export default Store;

