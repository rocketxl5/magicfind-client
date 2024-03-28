import React, {
    useRef,
    useState,
    useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import Form from '../../components/Form';
import Loader from '../../layout/Loader.js';
import SearchInput from './components/SearchInput'
import { api } from '../../api/resources';
import useSearch from '../../hooks/contexthooks/useSearch';
import useNavbar from '../../hooks/contexthooks/useNavbar.js';
// import useAuth from '../../hooks/contexthooks/useAuth.js';
import setQueryString from '../../assets/utilities/setQueryString';

const Search = () => {
    // States
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [oracleID, setOracleID] = useState('');
    const [data, setData] = useState(null);
    // Ref
    const archiveInputRef = useRef(null);
    // Hooks
    const {
        searchInput,
        setSearchInput,
        searchTerm,
        predictions,
        cardName,
        setCardName,
        setCardNames,
        archiveCardNames,
        setUpdateCollection,
        collectionCardNames
    } = useSearch();

    const { displaySeachBar, setDisplaySearchBar } = useNavbar();

    const navigate = useNavigate();


    useEffect(() => {
        archiveInputRef.current?.focus();
        if (displaySeachBar) {
            setDisplaySearchBar(false);
        }
    }, [])

    useEffect(() => {
        if (searchInput?.id === 'archive') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [searchInput])

    useEffect(() => {
        if (isActive) {
            setCardNames(archiveCardNames);
        }
    }, [isActive, setCardNames, archiveCardNames, collectionCardNames])


    const searchArchive = (e = undefined, prediction = undefined) => {
        e?.preventDefault();

        if (searchTerm.length < 3) { return }

        setLoading(true);

        const headers = { method: 'GET' };

        let query = ''

        if (prediction) {
            query = `cards/named?exact=${prediction}`;
        }
        else if (cardName) {
            query = `cards/named?exact=${cardName}`;
        }
        else if (predictions.length === 1) {
            query = `cards/named?exact=${predictions[0]}`;
        }
        else if (searchTerm) {
            query = `cards/named?fuzzy=${searchTerm}`;
        }

        archiveInputRef.current.blur();

        fetch(`${api.skryfallURL}/${query}`, headers)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                        .then((data) => {
                            const { name, oracle_id } = data;
                            // localStorage.setItem('oracle', oracle_id);
                            setOracleID(oracle_id);
                            setCardName(name);
                        })
                }
                else if (res.status === 404) {
                    setLoading(false);
                    navigate(`/not-found/${searchTerm}`);
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

            setLoading(false);
            setCardName('');
            setSearchInput(null);
            setUpdateCollection(true);

            localStorage.setItem('search-results', JSON.stringify({
                cards: cards,
                search: searchInput.id
            }));
            navigate(`/me/archive/${setQueryString(cardName, '-')}`,
                {
                    state: {
                        cards: cards,
                        search: searchInput.id
                    }
                });

        }
    }, [data]);

    return (
        <>
            <Page name={'archive'}>
                {loading ? <Loader /> :
                    <main>
                        <Form
                            id={'archive-form'}
                            classList={'search-form'}
                            handleSubmit={searchArchive}
                        >
                            <SearchInput
                                id={'archive'}
                                className={'search-field'}
                                placeholder={'Search MTG Archive'}
                                searchCard={searchArchive}
                                isActive={isActive}
                                ref={archiveInputRef} />
                        </Form>
                    </main>
                }
            </Page>
        </>
    )
}

export default Search;