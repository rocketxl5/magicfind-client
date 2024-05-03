import {
    useState,
    useEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchInput from './components/SearchInput';
import Loader from '../../layout/Loader.js';
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
        loading,
        setLoading,
        setSearchInput,
        searchTerm,
        cardName,
        setCardName,
        setCardNames,
        predictions,
        catalogCardNames,
        catalogInputRef,
        setPredictions
    } = useSearch();
    // Hooks
    const { auth, isAuth } = useAuth();
    const { searchBarRef } = useNavbar();

    const navigate = useNavigate();
    const location = useLocation();

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
        console.log(query)
        console.log(`/api/cards/catalog/${encodeURIComponent(query)}`)

        setPredictions([]);
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
                            searchInput.blur();
                            localStorage.setItem('search-results', JSON.stringify({
                                cards: data.cards,
                                search: searchInput.id,
                                query: cardName
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
                        catalogInputRef.current?.blur();
                        navigate(query, { state: { from: searchInput.id } });
                    })
                }

            });
    }

    return (
        <div id="search-catalog-form" ref={searchBarRef}>
            <form id={'catalog-form'} className={'search-form'} onSubmit={searchCatalogCard}>
                <SearchInput
                    id={'catalog'}
                    classList={'search-catalog-input'}
                    placeholder={'Search Magic Find'}
                    searchCard={searchCatalogCard}
                    isActive={isActive}
                    ref={catalogInputRef}
                />
                {loading && <Loader classList={'box-size-6 right-1'} />}
            </form>
        </div>
    );
};

export default Catalog;