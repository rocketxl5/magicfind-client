import {
    useState,
    useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './components/SearchInput';
import Loader from '../../layout/Loader.js';
import useAuth from '../../hooks/contexthooks/useAuth';
import useNavbar from '../../hooks/contexthooks/useNavbar.js';
import useSearch from '../../hooks/contexthooks/useSearch.js';
import setQueryString from './services/setQueryString';
import useFetch from '../../hooks/useFetch.js';
import { api } from '../../api/resources';

const Catalog = () => {
    // States
    const [isActive, setIsActive] = useState(false);
    // Context hook
    const {
        searchInput,
        // loading,
        setLoading,
        searchTerm,
        cardName,
        setCardNames,
        predictions,
        catalogCardNames,
        catalogInputRef,
        setPredictions
    } = useSearch();
    // Hooks
    const { auth, isAuth } = useAuth();
    const { searchBarRef } = useNavbar();

    const { fetchOne, loading, response } = useFetch();

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

    // fetchOne(`/api/cards/catalog/${queryString}`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'auth-token': isAuth && auth.token
    //     },
    // })

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

        setPredictions([]);

        const queryString = setQueryString(query, '-')

        fetch(`${api.serverURL}/api/cards/catalog/${queryString}`, headers)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                        .then((data) => {
                            setLoading(false);
                            searchInput.blur();
                            localStorage.setItem('search-results', JSON.stringify({
                                cards: data.cards,
                                search: searchInput.id,
                                query: query
                            }));
                            navigate(`/catalog/${queryString}`,

                                {
                                    state: {
                                        cards: data.cards,
                                        search: searchInput.id,
                                        query: query
                                    },
                                });
                        })
                }
                else {
                    return res.json().then((error) => {
                        setLoading(false);
                        console.log(error)
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