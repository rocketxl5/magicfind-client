import React, {
    useState,
    useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './components/SearchInput'
import Form from '../../components/Form';
import useAuth from '../../hooks/contexthooks/useAuth';
import useNavbar from '../../hooks/contexthooks/useNavbar.js';
import useSearch from '../../hooks/contexthooks/useSearch.js';
import setQueryString from '../../assets/utilities/setQueryString';
import { api } from '../../api/resources';

const Catalog = () => {
    // States
    const [isActive, setIsActive] = useState(false);
    // Context hook
    const {
        searchInput,
        setLoading,
        setSearchInput,
        searchTerm,
        cardName,
        setCardName,
        setCardNames,
        predictions,
        catalogCardNames,
        catalogInputRef
    } = useSearch();
    // Hooks
    const { auth, isAuth } = useAuth();
    const { searchBarRef } = useNavbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchInput?.id === 'catalog') {
            setIsActive(true);
        } else if (isActive) {
            setIsActive(false);
        }
    }, [searchInput, setIsActive, isActive]);

    useEffect(() => {
        if (isActive) {
            setCardNames(catalogCardNames)
        }
    }, [isActive, catalogCardNames, setCardNames])

    const searchCatalogCard = (e = undefined, prediction = undefined) => {
        e?.preventDefault();

        if (searchTerm.length < 3) { return }

        setLoading(true);

        catalogInputRef.current?.blur();

        const headers = {
            'Content-Type': 'application/json',
            'auth-token': isAuth && auth.token
        }

        let query;

        if (prediction) {

            query = prediction;
        }
        else if (cardName) {

            query = cardName;
        }
        else if (predictions?.length === 1) {

            query = predictions[0];
        }
        else if (searchTerm) {

            query = searchTerm;
        }

        // Conditional query string won't return user cards if auth
        // Else returns all cards
        const queryString = isAuth ?
            `${api.serverURL}/api/cards/catalog/${encodeURIComponent(query)}/${auth.user.id}` :
            `${api.serverURL}/api/cards/catalog/${encodeURIComponent(query)}`;

        fetch(queryString, headers)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                        .then((data) => {
                            setLoading(false);
                            setCardName('');
                            setSearchInput(null);
                            localStorage.setItem('search-results', JSON.stringify({
                                cards: data.cards,
                                search: searchInput.id
                            }));
                            navigate(`/catalog/${setQueryString(query.toLowerCase(), '-')}`,

                                {
                                    state: {
                                        cards: data.cards,
                                        search: searchInput.id,
                                        query: query
                                    },
                                });
                        })
                }
                else if (res.status === 400) {
                    return res.json().then((error) => {

                        setLoading(false);
                        navigate(`/not-found/${query}`);
                    })
                }

            });
    }

    return (
        <div id="search-catalog-form" ref={searchBarRef}>
            <Form id={'catalog-form'} classList={'search-form'} handleSubmit={searchCatalogCard}>
                <SearchInput
                    id={'catalog'}
                    className={'search-catalog-field'}
                    placeholder={'Search Magic Find'}
                    searchCard={searchCatalogCard}
                    isActive={isActive}
                    ref={catalogInputRef}
                />
            </Form>
        </div>
    );
};

export default Catalog;