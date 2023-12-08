import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import Loading from '../../layout/Loading';
import { SearchContext } from '../../../contexts/SearchContext';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';
import setQueryString from '../../../utilities/setQueryString';
import hideSearchBar from '../../../utilities/hideSearchBar';
import getBrowserWidth from '../../../utilities/getBrowserWidth';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [oracleID, setOracleID] = useState('');
  const [data, setData] = useState(null);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    predictions,
    cardName,
    setCardName,
    setCardNames,
    apiCards,
    setApiCards
  } = useContext(SearchContext);

  const { setPathname } = useContext(PathContext);

  const location = useLocation()
  const navigate = useNavigate();
  const apiInputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  const fetchApiCards = () => {

    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/api-cardnames`, options)
      .then((res) => res.json())
      .then((data) => {
        setApiCards(data);
        setLoading(false);
        apiInputRef.current.focus();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  }

  useEffect(() => {
    apiInputRef?.current?.focus();
    setPathname(location.pathname);

    // If apiCards is undefined
    if (!apiCards) {
      fetchApiCards()
    }

    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }, [])

  useEffect(() => {
    if (searchInput?.id === 'search-api') {
      setIsActive(true);
      setCardNames(apiCards);
    } else {
      setIsActive(false);
      setCardNames([])
    }
  }, [searchInput])


  const searchAPI = (e = undefined, prediction = undefined) => {
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
    else if (predictions === 1) {
      query = `cards/named?exact=${predictions[0]}`;
    }
    else if (searchTerm) {
      query = `cards/named?fuzzy=${searchTerm}`;
    }

    apiInputRef.current.blur();

    fetch(
      `${api.skryfallURL}/${query}`,
      headers
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.object === 'error') {
          navigate(`/search-result/${setQueryString(searchTerm, '-')}`,
            {
              state: { cards: undefined, cardName: searchTerm, type: 'card-not-found', search: location.pathname },
            });
        } else {
          const { name, oracle_id } = data;
          localStorage.setItem('oracle', oracle_id);
          setOracleID(oracle_id);
          setCardName(name);
        }
      })
      .catch((error) => {
        console.log(error)
        // const { cards, cardName, type, search } = location.state;
        // navigate(`/search-result/${setQueryString(searchTerm, '-')}`,
        //     {
        //       state: { cards: undefined, cardName: searchTerm, type: 'card-not-found', search: location.pathname },
        //     });
      });

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
          // localStorage.setItem('apiCards', JSON.stringify(data.data));
        })
        .catch((error) => console.log(error));
    }
  }, [oracleID]);

  useEffect(() => {
    if (data) {
      const apiCards = [];
      const filteredCards = filterCards(data);

      filteredCards.forEach((card, index) => {
        if (card.finishes.length === 1) {
          apiCards.push(filteredCards.splice(index, 1).pop());
        }
      });
      filteredCards.forEach(card => {
        card.finishes.forEach(finish => {
          apiCards.push({ ...card, finishes: [finish], id: `${card.id}_${finish}` });
        })
      });

      // Remove online and oversized cards
      function filterCards(cards) {
        return cards.filter((card) => {
          return !card.digital;
          // return !card.digital && !card.oversized;
        });
      };

      setLoading(false)
      setCardName('');
      setSearchInput(null);
      const result = { cards: apiCards, cardName: cardName, type: searchInput?.id, search: location.pathname };

      navigate(`/search-result/${setQueryString(cardName, '-')}`,
        {
          state: result,
        });

      localStorage.setItem('search-result', JSON.stringify(result));
    }
  }, [data])

  return (
    <div className="flex inherit-height">
      {
        loading ? (
          <Loading />
        ) : (
            <div className="content flex-grow-1">
              <header className="header">
                <h2 className="title">Add a card</h2>
              </header>
              <main className="main">
                <form id="search-api-form" className="search-form" onSubmit={searchAPI}>
                  <SearchInput isActive={isActive} id={'search-api'} searchCards={searchAPI} ref={apiInputRef} />
            </form>
              </main>
          </div>
        )
      }
    </div>
  );
};

export default Search;
