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
import styled from 'styled-components';

const Search = () => {
  // const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [oracleID, setOracleID] = useState('');
  const [cardNames, setCardNames] = useState([]);
  const [cards, setCards] = useState([]);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    setCardName,
    setShowPredictions,
  } = useContext(SearchContext);

  const {
    apiCardNames,
    setTracker
  } = useContext(CardContext);

  const { path, setPathname } = useContext(PathContext);

  const location = useLocation()
  const history = useHistory();

  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (searchInput) {
      // console.log('in catalog')
      if (searchInput.id !== inputRef.current.id) {
        searchInput.value = '';
      }
      if (searchInput.id === inputRef.current.id) {
        setSearchInput(inputRef.current)
        setIsActive(true);
      } else {
        setIsActive(false);
        setSearchTerm('');
      }
    }
  }, [searchInput]);


  const handleSubmit = (e) => {
    // bounce back if sent form does not match current form's id
    // This block other forms in the view to process the request down below
    // if (previousFormID !== form.current.id) {
    //   return;
    // }

    let searching = '';
    setOracleID('');

    if (!searchTerm || searchTerm.length < 3) {
      return console.log('Search term is incomplete');
    } else {
      searching = searchTerm;
    }

    // If fetchSingleCard is called on submit.
    // Enter key was pressed.
    // Value sent can come from a complete card name entered by the user
    // Or a complete card name send with autocomplete
    // Or an incomplete field value
    if (isActive) {
      e.preventDefault();
      setLoading(true);
      // Check if searchTerm is an existing card
      // If searchTerm is written by user
      let foundName = apiCardNames.filter((name) => {
        return name.toLowerCase() === searchTerm.toLowerCase();
      });

      // When searchTerm was typed by user
      if (foundName.length > 0) {
        // setSearching(foundName[0]);
        // Set search card name to local storage
        // localStorage.setItem(
        //   'search',
        //   `${searchTerm.charAt(0).toUpperCase()}${searchTerm.substring(1)}`
        // );
        searching = searchTerm;

        // Else request is sent with autofill result
        // from arrow up or/and down feature.
        // searchTerm is incomplete in this case.
        // searchInput should contain the autocompleted result
      } else {
        searching = searchInput.value;
      }
    }
    // setLoading(true);

    const headers = { method: 'GET' };
    fetch(
      `${api.skryfallURL}/cards/named?exact=${sanitizeString(searching)}`,
      headers
    )
      // https://api.scryfall.com/cards/search?order=released&q=oracleid%3A0c2841bb-038c-4fbf-8360-bc0a1522b58d&unique=prints
      .then((res) => res.json())
      .then((data) => {
        const { name, oracle_id } = data;
        localStorage.setItem('oracle', oracle_id);
        localStorage.setItem('apiCardName', name);
        // Reset cardNames state to empty array
        setCardNames([]);
        setCardName(name);
        setOracleID(oracle_id);
        setSearchTerm('');
        setShowPredictions(false);

        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  // Filter through card result from api and
  // remove online versions
  const filterData = (cards) => {
    let word = 'online';
    return cards.filter((card) => {
      return !card.set_name.toLowerCase().includes(word);
    });
  };
  // console.log(path);
  // Get all cards name for autocomplete feature @ components/views/SearchField
  useEffect(() => {
    // if coming from add-card view
    if (
      path === 'add-card' ||
      location.pathname.split('/')[1] === 'search-api'
    ) {
      // set oracleID and cardName to repopulate search-api view
      // with matching card prints
      // Oracle id is needed for skryfall search api
      // setCardName(localStorage.getItem('card-name'));
      setOracleID(localStorage.getItem('oracle'));
      setCardName(localStorage.getItem('apiCardName'));
      // setLoading(false);
    } else {
      setOracleID('');
      setCardName('');
    }
    if (searchInput) {
      searchInput.value = '';
    }
    setPathname(location.pathname.split('/')[1]);
  }, [path]);

  // On searchTerm state change,
  // Check if length of searchTerm is 3 or more.
  // If so, isValidLeangth becomes true & filter cardNames to match searcTerm
  // Card names array gets populated with filtered results.
  useEffect(() => {
    if (searchTerm.length > 2) {
      setShowPredictions(true);
      setCardNames([]);
      const filteredNames = apiCardNames.filter((name) => {
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setCardNames(filteredNames);
    } else if (searchTerm.length < 3) {
      setShowPredictions(false);
    }
  }, [searchTerm]);

  // Fetch call triggered when oracleID state changes in fetchSingleCard function
  useEffect(() => {
    if (oracleID) {
      setLoading(true);

      const headers = { method: 'GET' };
      fetch(
        `${api.skryfallURL}/cards/search?order=released&q=oracleid%3A${oracleID}&unique=prints`,
        headers
      )
        .then((res) => res.json())
        .then((data) => {
          // Filter data to remove online versions of searched card
          setCards(filterData(data.data));
          // console.log(data.data);
          localStorage.setItem('apiCards', JSON.stringify(data.data));
          setLoading(false);
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
      <form id="search-api-form" className="search-form" onSubmit={handleSubmit} ref={formRef} >
        <SearchInput cardNames={cardNames}
          isActive={isActive} ref={inputRef} />
      </form>
    </div>
  );
};
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 6%;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export default Search;
