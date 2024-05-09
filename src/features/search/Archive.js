import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import Loader from '../../layout/Loader.js';
import SearchForm from './SearchForm.js';
import useSearch from '../../hooks/contexthooks/useSearch';
import useNavbar from '../../hooks/contexthooks/useNavbar.js';
// import useAuth from '../../hooks/contexthooks/useAuth.js';
import setQueryString from './services/setQueryString';
import { api } from '../../api/resources';

const Search = () => {
    // States
    const [oracleID, setOracleID] = useState('');
    const [data, setData] = useState(null);
    // Ref
    const archiveInputRef = useRef(null);
    // Hooks
    const {
        searchInput,
        setSearchInput,
        predictions,
        searchTerm,
        setSearchTerm,
        setCardNames,
        archiveCardNames,
        setUpdateCollection,
        collectionCardNames,
        setPredictions,
        inputValue
    } = useSearch();

    const { displaySeachBar, setDisplaySearchBar } = useNavbar();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        archiveInputRef.current?.focus();
    }, []);


    const searchArchive = (e = undefined, prediction = undefined) => {
        e?.preventDefault();

        if (inputValue.length < 3) { return }



        const headers = { method: 'GET' };

        let query = ''

        if (prediction) {
            query = `cards/named?exact=${prediction}`;
        }
        else if (searchTerm) {
            query = `cards/named?exact=${searchTerm}`;
        }
        else if (predictions.length === 1) {
            query = `cards/named?exact=${predictions[0]}`;
        }
        else if (inputValue) {
            query = `cards/named?fuzzy=${inputValue}`;
        }

        setPredictions([]);

        fetch(`${api.skryfallURL}/${query}`, headers)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                        .then((data) => {
                            const { name, oracle_id } = data;
                            archiveInputRef.current.blur();
                            setOracleID(oracle_id);
                            setSearchTerm(name);
                            // localStorage.setItem('oracle', oracle_id);
                        })
                }
                else if (res.status === 404) {
                    // setLoading(false);
                    navigate(`/not-found/${query}`);
                }
            })
    };

    // Fetch call triggered when oracleID state changes
    useEffect(() => {
        if (oracleID) {
            const headers = { method: 'GET' };
            fetch(
                `${api.skryfallURL}/cards/search?order=released&q=oracleid%3A${oracleID}&unique=prints`,
                headers
            )
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                })
                .catch((error) => console.log(error));
        }
    }, [oracleID]);

    useEffect(() => {
        if (data) {
            const cards = [];
            const filteredCards = filterCards(data);
            filteredCards.forEach((card, index) => {
                if (card.finishes.length === 1) {
                    cards.push(filteredCards.splice(index, 1).pop());
                }
            });
            filteredCards.forEach(card => {
                card.finishes.forEach(finish => {
                    cards.push({ ...card, finishes: [finish], id: `${card.id}_${finish}` });
                })
            });

            // Remove online versions
            function filterCards(cards) {
                return cards.filter((card) => {
                    return !card.digital;
                    // return !card.digital && !card.oversized;
                });
            };

            // setLoading(false);
            setSearchTerm('');
            setSearchInput(null);
            setUpdateCollection(true);

            localStorage.setItem('search-results', JSON.stringify({
                cards: cards,
                search: 'archive',
                query: searchTerm
            }));
            navigate(`/me/archive/${setQueryString(searchTerm, '-')}`,
                {
                    state: {
                        cards: cards,
                        query: searchTerm,
                        search: 'archive'
                    }
                });
        }
    }, [data]);

    return (
        <Page name={'archive'} title={'MTG Archive'}>
            <SearchForm
                type={'archive'}
                classList={'search-input'}
                pathname={location.pathname}
                placeholder={'Search Archive'}
                cardNames={archiveCardNames}
                inputRef={archiveInputRef}
            >
            </SearchForm>
        </Page>
    )
}

export default Search;