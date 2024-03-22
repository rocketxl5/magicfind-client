import React, {
    useRef,
    useState,
    useEffect,
    useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './components/SearchInput'
import Form from '../../components/Form';
import { SearchContext } from '../../contexts/SearchContext';
import useAuth from '../../hooks/contexthooks/useAuth';
import useNavbar from '../../hooks/contexthooks/useNavbar.js';
import { api } from '../../api/resources';
import setQueryString from '../../assets/utilities/setQueryString';

const Catalog = () => {
    // States
    const [isActive, setIsActive] = useState(false);
    // Ref
    // const catalogInputRef = useRef(null);
    // Context
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
    } = useContext(SearchContext);
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
                            console.log(data)
                            setLoading(false);
                            const result = {
                                cards: data.cards,
                                search: searchInput.id
                            }
                            setCardName('');
                            setSearchInput(null);
                            localStorage.setItem('search-results', JSON.stringify(result));
                            navigate(`/catalog/${setQueryString(query.toLowerCase(), '-')}`,
                                {
                                    state: { result: result },
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