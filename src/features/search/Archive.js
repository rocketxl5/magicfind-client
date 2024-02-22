import React, {
    useRef,
    useState,
    useEffect,
    useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './components/SearchInput'
import Loading from '../../layout/Loading';
import { SearchContext } from '../../contexts/SearchContext';
import { api } from '../../api/resources';
import setQueryString from '../../assets/utilities/setQueryString';
import hideSearchBar from '../../assets/utilities/hideSearchBar';
import getViewPortWidth from '../../assets/utilities/getViewPortWidth';

const Search = () => {
    // States
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [oracleID, setOracleID] = useState('');
    const [data, setData] = useState(null);
    // Ref
    const archiveInputRef = useRef(null);
    // Context
    const {
        searchInput,
        setSearchInput,
        searchTerm,
        predictions,
        cardName,
        setCardName,
        setCardNames,
        archiveCardNames,
    } = useContext(SearchContext);
    // Hooks
    const navigate = useNavigate();

    // Utilities
    const browserWidth = getViewPortWidth();

    useEffect(() => {
        archiveInputRef.current?.focus();
        if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
            hideSearchBar();
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
    }, [isActive, archiveCardNames])


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
                            localStorage.setItem('oracle', oracle_id);
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

    // Fetch call triggered when oracleID state changes in fetchSingleCard function
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

            setLoading(false)
            setCardName('');
            setSearchInput(null);
            console.log(cards)
            const result = {
                cards: cards,
                search: searchInput.id
            };
            localStorage.setItem('search-results', JSON.stringify(result));
            navigate(`/me/archive/${setQueryString(cardName, '-')}`,
                {
                    state: result,
                });

        }
    }, [data])

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <header className="content-header">
                            <h2 className="title">Search MTG Archive</h2>
                        </header>
                        <main className="main">
                            <form id="archive-form" className="search-form" onSubmit={searchArchive}>
                                <SearchInput id="archive" className={'search-field'} placeholder={'Search MTG Archive'} searchCard={searchArchive} isActive={isActive} ref={archiveInputRef} />
                            </form>
                        </main>
                    </>
                )
            }
        </>
    );
};

export default Search;