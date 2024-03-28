import React, {
    useState,
    useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import Form from '../../components/Form';
import SearchInput from './components/SearchInput';
import Message from '../../components/Message.js';
import Button from '../../components/Button';
import Loader from '../../layout/Loader';
import useAuth from '../../hooks/contexthooks/useAuth';
import useSearch from '../../hooks/contexthooks/useSearch';
import useNavbar from '../../hooks/contexthooks/useNavbar.js';
import { api } from '../../api/resources';
import setQueryString from '../../assets/utilities/setQueryString';

const Collection = () => {
    // States
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    // Context
    const {
        isCollectionEmpty,
        searchInput,
        setSearchInput,
        searchTerm,
        cardName,
        setCardName,
        setCardNames,
        predictions,
        collectionCardNames,
        collectionInputRef
    } = useSearch();

    const { displaySeachBar, setDisplaySearchBar } = useNavbar();

    const { auth } = useAuth();
    const navigate = useNavigate();

    const searchCollection = () => {

        setLoading(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.token);
        const options = {
            method: 'GET',
            headers: headers,
        }

        fetch(`${api.serverURL}/api/cards/${auth.user.id}`, options)
            .then(res => res.json())
            .then((data) => {


                // Update local storage with search data
                localStorage.setItem('search-results', JSON.stringify({ cards: data.cards, search: searchInput?.id }));
                setLoading(false);

                navigate(`/me/collection/all-cards`,
                    {
                        state: { cards: data.cards, search: searchInput?.id }

                    });
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    useEffect(() => {
        collectionInputRef.current?.focus();

        if (displaySeachBar) {
            setDisplaySearchBar(false);
        }
    }, []);

    useEffect(() => {
        if (searchInput?.id === 'collection') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [searchInput]);

    useEffect(() => {
        if (isActive) {
            setCardNames(collectionCardNames);
        }
    }, [isActive, setCardNames, collectionCardNames])

    // Instore single card request search field with
    const searchCollectionCard = (e = undefined, prediction = undefined) => {
        e?.preventDefault();

        if (searchTerm.length < 3) { return }

        setLoading(true);

        collectionInputRef.current?.blur();

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.token);
        const options = {
            method: 'GET',
            headers: headers,
        };

        let query = ''

        if (prediction) {
            query = prediction;
        }
        else if (cardName) {
            query = cardName;
        }
        else if (predictions.length === 1) {
            query = predictions[0];
        }
        else if (searchTerm) {
            query = searchTerm;
        }

        fetch(`${api.serverURL}/api/cards/collection/${auth.user.id}/${encodeURIComponent(query)}`, options)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                        .then((data) => {
                            setLoading(false);
                            setCardName('');
                            setSearchInput(null);
                            localStorage.setItem('search-results', JSON.stringify({
                                cards: data.cards,
                                search: searchInput.id,
                            }
                            ));
                            navigate(`/me/collection/${setQueryString(query.toLowerCase(), '-')}`,
                                {
                                    state: {
                                        cards: data.cards,
                                        search: searchInput.id,
                                    }
                                });
                        })
                }
                else if (res.status === 400) {
                    setLoading(false);
                    navigate(`/not-found/${query}`);
                }
            });
    }

    return (
        <>
            <Page name={'collection'} >
                {loading ? <Loader /> :
                    <main>
                        {
                            isCollectionEmpty ? (
                                <Message type={'collection'} />

                            ) : (
                                    <Form id={'collection-form'} classList={'search-form'} handleSubmit={searchCollectionCard}>
                                        <SearchInput
                                            id={'collection'}
                                            className={'search-field'}
                                            placeholder={'Search Your Collection'}
                                            searchCard={searchCollectionCard}
                                            isActive={isActive}
                                            ref={collectionInputRef} />
                                        <Button
                                            id={''}
                                            classList='bg-success btn-collection'
                                            handleClick={() => searchCollection('cards')}
                                        >
                                            {'All Cards'}
                                        </Button>
                                    </Form>
                                )
                        }
                    </main>
                }
        </Page>
        </>
    )
}

export default Collection;