import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchInput from './search/SearchInput';
import Spinner from '../layout/Spinner';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';
import sanitizeString from '../utilities/sanitizeString';
import hideSearchBar from '../utilities/hideSearchBar';
import getBrowserWidth from '../utilities/getBrowserWidth';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [oracleID, setOracleID] = useState('');
  const [data, setData] = useState(null);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    cardName,
    setCardName,
  } = useContext(SearchContext);

  const { setPathname } = useContext(PathContext);

  const location = useLocation()
  const history = useHistory();
  const inputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  // Set pathname
  useEffect(() => {
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

  // On submit, check if cardName is set
  useEffect(() => {
    (loading && !cardName) && setCardName(searchTerm)
  }, [loading])

  const handleSubmit = (e) => {

    if (!searchTerm) {
      throw new Error('Field is empty. Please provide a suggestion');
    }

    e && e.preventDefault();
    setLoading(true);
    inputRef.current.blur();
    const headers = { method: 'GET' };
    fetch(
      `${api.skryfallURL}/cards/named?exact=${sanitizeString(cardName)}`,
      headers
    )
      // https://api.scryfall.com/cards/search?order=released&q=oracleid%3A0c2841bb-038c-4fbf-8360-bc0a1522b58d&unique=prints
      .then((res) => res.json())
      .then((data) => {
        const { name, oracle_id } = data;
        localStorage.setItem('oracle', oracle_id);
        localStorage.setItem('apiCardName', name);
        // console.log('oracle id', oracle_id)
        // console.log('name', name)
        setOracleID(oracle_id);
        setCardName(name);
      })
      .catch((error) => console.log(error));
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


  // 
  useEffect(() => {
    if (data) {

      const filterOnlineVersions = (cards) => {
        return cards.filter((card) => {
          return !card.set_name.toLowerCase().includes('online');
        });
      };

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
          console.log(index)
          cards.splice(index, 1);
          duplicate(cards, card, index);
        }
      });

      // Customize cards id to remove repetition
      cards.forEach(card => card.id = crypto.randomUUID());

      setLoading(false);

      console.log(cards)

      history.push({
        pathname: `/search-result/${cardName.toLowerCase()}`,
        state: { cards: cards, cardName: cardName, type: 'search-api' },
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
                <SearchInput isActive={isActive} id={'search-api'} handleSubmit={handleSubmit} ref={inputRef} />
              </form>
            </div>
        )
      }
    </>
  );
};
export default Search;
