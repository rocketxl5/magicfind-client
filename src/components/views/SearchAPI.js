import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from './search/SearchInput';
import Spinner from '../layout/Spinner';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import setString from '../../utilities/setString';
import hideSearchBar from '../../utilities/hideSearchBar';
import getBrowserWidth from '../../utilities/getBrowserWidth';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [oracleID, setOracleID] = useState('');
  const [data, setData] = useState(null);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    cardName,
    setCardName,
  } = useContext(SearchContext);

  const { setPathname } = useContext(PathContext);

  const location = useLocation()
  const navigate = useNavigate();
  const apiInputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  // Set pathname
  useEffect(() => {
    apiInputRef?.current?.focus();
    setPathname(location.pathname);
  }, [])

  useEffect(() => {
    if (searchInput) {
      if (searchInput.id === 'search-api') {
        setIsActive(true);
        if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
          hideSearchBar();
        }
      }
      else {
        setIsActive(false);
        setSearchInput(null);
      }
    }
  }, [searchInput]);


  const handleSubmit = (e) => {
    e && e.preventDefault();

    if (searchTerm.length < 3) { return }

    setLoading(true);
    // setSearchTerm(cardName);
    apiInputRef.current.blur();

    const headers = { method: 'GET' };

    const query = !cardName ? searchTerm : cardName;
    fetch(
      `${api.skryfallURL}/cards/named?fuzzy=${query}`,
      headers
    )
      // https://api.scryfall.com/cards/search?order=released&q=oracleid%3A0c2841bb-038c-4fbf-8360-bc0a1522b58d&unique=prints
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.object === 'error') {
          navigate(`/search-result/${setString(searchTerm, '-')}`,
            {
              state: { cards: undefined, cardName: searchTerm, type: 'not-found', search: location.pathname },
            });
        } else {
          const { name, oracle_id } = data;
          localStorage.setItem('oracle', oracle_id);
          localStorage.setItem('apiCardName', name);
          setOracleID(oracle_id);
          setCardName(name);
        }

      })
      .catch((error) => {
        console.log(error)
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

      const filterOnlineVersions = (cards) => {
        return cards.filter((card) => {
          return !card.digital && !card.oversized;
          // return !card.set_name.toLowerCase().includes('online') && !card.oversized;
        });
      };

      // Generates Multiple finish version of single card
      const duplicate = (cardsClone, card, index) => {
        // Save finishes array from api card
        const finishes = card.finishes;
        finishes.forEach(finish => {
          // Replace card finishes array value with single finish  
          card.finishes = [finish];
          card.selected = false;
          // Add updated card to cardsFound array at index
          cardsClone.splice(index, 0, { ...card });
        })
      }

      const filteredCards = filterOnlineVersions(data);
      const cards = [...filteredCards];

      filteredCards.forEach((card, index) => {
        if (card.finishes.length > 1) {
          // console.log(index)
          cards.splice(index, 1);
          duplicate(cards, card, index);
        }
      });

      // Customize cards id to prevent redundancy.
      cards.forEach(card => card.id = crypto.randomUUID());

      setLoading(false);
      navigate(`/search-result/${setString(cardName, '-')}`,
        {
          state: { cards: cards, cardName: cardName, type: 'search-api', search: location.pathname },
        });
      setCardName('');
      setSearchInput(null);
    }
  }, [data])

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
            <div className="search-card">
              <h2 className="page-title">Enter A Card Name</h2>
              <form id="search-api-form" className="search-form" onSubmit={handleSubmit}>
                <SearchInput isActive={isActive} id={'search-api'} handleSubmit={handleSubmit} ref={apiInputRef} />
              </form>
            </div>
        )
      }
    </>
  );
};

export default Search;
