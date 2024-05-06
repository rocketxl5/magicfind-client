import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../../layout/Loader';
import Page from '../../components/Page';
import useFetch from '../../hooks/useFetch';
import useAuth from '../../hooks/contexthooks/useAuth';

const Store = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [cards, setCards] = useState([])
    const location = useLocation();

    const { isAuth, auth } = useAuth();
    const { fetchOne, loading, showConfirmation, error, result } = useFetch();

    useEffect(() => {
        if (isAuth) {
            const config = { headers: { 'Content-Type': 'application/json' } }
            fetchOne(`/api/users/store/${auth.user.id}`, config)
        }
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

