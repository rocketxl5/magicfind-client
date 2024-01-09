import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import Loading from '../../layout/Loading';
import { SearchContext } from '../../../contexts/SearchContext';
import { api } from '../../../api/resources';
import setQueryString from '../../../utilities/setQueryString';
import hideSearchBar from '../../../utilities/hideSearchBar';
import getViewPortWidth from '../../../utilities/getViewPortWidth';

const Search = ({ path }) => {
  // States
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [oracleID, setOracleID] = useState('');
  const [data, setData] = useState(null);
  // Ref
  const apiInputRef = useRef(null);
  // Context
  const {
    searchInput,
    setSearchInput,
    searchTerm,
    predictions,
    cardName,
    setCardName,
    setCardNames,
    apiCards,
    setApiCards,
  } = useContext(SearchContext);
  // Routing
  const navigate = useNavigate();
  // Utilities
  const browserWidth = getViewPortWidth();

  const fetchApiCards = () => {

    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/mtg-cardnames`, options)
      .then((res) => res.json())
      .then((data) => {
        setApiCards(data);
        setCardNames(data);
        setLoading(false);
        apiInputRef.current.focus();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  }

  useEffect(() => {
    if (path === 'add-card') {
      apiInputRef.current.focus();
    }
    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }, [])

  useEffect(() => {
    if (searchInput?.id === 'search-api') {
      if (!apiCards) {
        fetchApiCards()
      } else {
        setCardNames(apiCards);
      }
      setIsActive(true);
    } else {
      setIsActive(false);
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
          navigate(`/search-result/not-found/${searchTerm}`);
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
      const result = {
        cards: apiCards,
        searchType: searchInput.id
      };

      localStorage.setItem('search-result', JSON.stringify(result));
      navigate(`/search-result/api/${setQueryString(cardName, '-')}`,
        {
          state: result,
        });

    }
  }, [data])

  return (
    <div className="outer-content">
      {
        loading ? (
          <Loading />
        ) : (
            <div className="inner-content">
              <header className="header">
                <h2 className="title">Add a card</h2>
              </header>
              <main className="main">
                <form id="search-api-form" className="search-form" onSubmit={searchAPI}>
                  <SearchInput id={'search-api'} className={'search-field'} placeholder={'Search MTG Cards'} searchCard={searchAPI} isActive={isActive} ref={apiInputRef} />
                </form>
              </main>
            </div>
        )
      }
    </div>
  );
};

export default Search;