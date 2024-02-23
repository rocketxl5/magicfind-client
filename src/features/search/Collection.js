import React, {
    useRef,
    useState,
    useEffect,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi"

import SearchInput from './components/SearchInput'
import Loading from '../../layout/Loading';
import { api } from '../../api/resources';
import getViewPortWidth from '../../assets/utilities/getViewPortWidth';
import hideSearchBar from '../../assets/utilities/hideSearchBar';
import setQueryString from '../../assets/utilities/setQueryString';
import useAuth from '../../hooks/useAuth';
import useSearch from '../../hooks/useSearch';

const Collection = () => {
    // States
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    // Ref
    const collectionInputRef = useRef(null);
    // Context
    const {
        errorMessage,
        setErrorMessage,
        searchInput,
        setSearchInput,
        searchTerm,
        cardName,
        setCardName,
        setCardNames,
        predictions,
        collectionCardNames
    } = useSearch();
    // Hooks
    const { auth } = useAuth();
    const navigate = useNavigate();
    // Utilities
    const browserWidth = getViewPortWidth();

    const searchCollection = () => {

        setLoading(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.token);
        const options = {
            method: 'GET',
            headers: headers,
        }

        fetch(`${api.serverURL}/api/cards/${auth.user.id}/cards`, options)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                        .then((data) => {
                            const result = { cards: data, search: searchInput?.id }
                            // Update local storage with search data
                            localStorage.setItem('search-results', JSON.stringify(result));
                            setLoading(false);
                            navigate(`/me/collection/all-cards`,
                                {
                                    state: result,

                                });
                        });
                }
                else if (res.status === 400 || res.status === 404) {
                    return res.json()
                        .then((error) => {
                            setLoading(false);
                            setErrorMessage({ ...error.message });
                        })
                }
            });
    }
    useEffect(() => {
        console.log('collection')
        // if (location.pathname.includes('collection')) {
        collectionInputRef.current?.focus();
        // }

        if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
            hideSearchBar();
        }
    }, []);

    useEffect(() => {
        // console.log(collectionCardNames)
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
    }, [isActive, collectionCardNames])



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

                            const result = {
                                cards: data.cards,
                                search: searchInput.id,
                            }

                            setCardName('');
                            setSearchInput(null);
                            localStorage.setItem('search-results', JSON.stringify(result));
                            navigate(`/me/collection/${setQueryString(query.toLowerCase(), '-')}`,
                                {
                                    state: result,
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

            <header className="content-header">
                <h2 className="title">Collection</h2>
            </header>

            {
                errorMessage?.title === 'no_cards' ? (
                    <div className="message">
                        <section className="message-section">
                            <div className="message-body">
                                {
                                    errorMessage.body?.map((part, index) => {
                                        return <p key={index}>{part}</p>
                                    })
                                }
                            </div>
                        </section>
                        <section className="message-section">
                            <Link className="message-link" to="/add-card"> To Add Card Page <FiArrowRightCircle /></Link>
                        </section>
                    </div>
                ) : (
                    <main>
                        {
                            loading ? (

                                <Loading />

                            ) : (
                                <form id="collection-form" className="search-form" onSubmit={searchCollectionCard} >
                                    <SearchInput id={'collection'} className={'search-field'} placeholder={'Search Your Collection'} searchCard={searchCollectionCard} isActive={isActive} ref={collectionInputRef} />
                                    <button
                                        className="bg-green btn-collection"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            searchCollection('cards');
                                        }}
                                    >
                                        All Cards
                                    </button>
                                </form>
                            )
                        }
                    </main>

                )
            }
        </>
    )
}

export default Collection;