import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { CardContext } from '../../contexts/CardContext';
import SearchInput from './search/SearchInput';
import { api } from '../../api/resources';
import sanitizeString from '../utilities/sanitizeString';
import hideSearchBar from '../utilities/hideSearchBar';
import handleSearchBar from '../utilities/handleSearchBar';
import getBrowserWidth from '../utilities/getBrowserWidth';

const Search = () => {
  // const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [oracleID, setOracleID] = useState('');
  const [cards, setCards] = useState([]);

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
          // handleSearchBar(document.querySelector('.hamburger-btn'), (state) => { setSearchTerm(state) }, true);
          // document.querySelector('.mobile-nav-label').click();
        }
      }
      else {
        setIsActive(false);
        setSearchInput(null);
      }
    }
  }, [searchInput]);


  const handleSubmit = (e) => {

    if (!searchTerm) {
      throw new Error('Field is empty. Please provide a suggestion');
    }

    e && e.preventDefault();
    setLoading(true);
    inputRef.current.blur();

      // When searchTerm was typed by user
    // if (foundName.length > 0) {
    //   // setSearching(foundName[0]);
    //   // Set search card name to local storage
    //   // localStorage.setItem(
    //   //   'search',
    //   //   `${searchTerm.charAt(0).toUpperCase()}${searchTerm.substring(1)}`
    //   // );
    //   searching = searchTerm;

    //   // Else request is sent with autofill result
    //   // from arrow up or/and down feature.
    //   // searchTerm is incomplete in this case.
    //   // searchInput should contain the autocompleted result
    // } else {
    //   searching = searchInput.value;
    // }
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

  // Get all cards name for autocomplete feature @ components/views/SearchField
  // useEffect(() => {
  //   // if coming from add-card view
  //   if (
  //     path === 'add-card' ||
  //     location.pathname.split('/')[1] === 'search-api'
  //   ) {
  //     // set oracleID and cardName to repopulate search-api view
  //     // with matching card prints
  //     // Oracle id is needed for skryfall search api
  //     // setCardName(localStorage.getItem('card-name'));
  //     setOracleID(localStorage.getItem('oracle'));
  //     setCardName(localStorage.getItem('apiCardName'));
  //     // setLoading(false);
  //   } else {
  //     setOracleID('');
  //     setCardName('');
  //   }
  //   if (searchInput) {
  //     searchInput.value = '';
  //   }
  //   setPathname(location.pathname.split('/')[1]);
  // }, [path]);

  // On searchTerm state change,
  // Check if length of searchTerm is 3 or more.
  // If so, isValidLeangth becomes true & filter cardNames to match searcTerm
  // Card names array gets populated with filtered results.
  // useEffect(() => {
  //   if (searchTerm.length > 2) {
  //     setShowPredictions(true);
  //     setCardNames([]);
  //     const filteredNames = apiCardNames.filter((name) => {
  //       return name.toLowerCase().includes(searchTerm.toLowerCase());
  //     });
  //     setCardNames(filteredNames);
  //   } else if (searchTerm.length < 3) {
  //     setShowPredictions(false);
  //   }
  // }, [searchTerm]);

  // Fetch call triggered when oracleID state changes in fetchSingleCard function
  const filterData = (cards) => {
    let word = 'online';
    return cards.filter((card) => {
      return !card.set_name.toLowerCase().includes(word);
    });
  };
  useEffect(() => {
    if (oracleID) {

      const headers = { method: 'GET' };
      fetch(
        `${api.skryfallURL}/cards/search?order=released&q=oracleid%3A${oracleID}&unique=prints`,
        headers
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          // Filter data to remove online versions of searched card
          // setCards();
          const filteredData = filterData(data.data);
          history.push({
            pathname: `/search-result/${cardName.toLowerCase()}`,
            state: { cards: filteredData, cardName: cardName, type: inputRef.current.id },
          });
          setCardName('')
          setSearchInput(null);
          // localStorage.setItem('apiCards', JSON.stringify(data.data));
        })
        .catch((error) => console.log(error));
    }
  }, [oracleID]);

  const clearSearch = () => {
    setCards([]);
    setCardName('');
    setOracleID('');
    localStorage.removeItem('oracle');
    localStorage.removeItem('apiCardName');
    localStorage.removeItem('apiCards');
  };

  return (
    <div className="search-card">
      <h2 className="page-title">Enter A Card Name</h2>
      <form id="search-api-form" className="search-form" onSubmit={handleSubmit}>
        <SearchInput isActive={isActive} id={'search-api'} handleSubmit={handleSubmit} ref={inputRef} />
      </form>
    </div>
  );
};
export default Search;
