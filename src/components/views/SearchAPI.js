import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import SearchField from './SearchField';
import Spinner from '../layout/Spinner';
import { FiXCircle } from 'react-icons/fi';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { CardContext } from '../../contexts/CardContext';
import styled from 'styled-components';

const Search = () => {
  // const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [oracleID, setOracleID] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNames, setCardNames] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [cards, setCards] = useState([]);
  const { isSubmitted, setIsSubmitted } = useContext(SearchContext);
  const { setIsValidLength } = useContext(SearchContext);
  const { setText } = useContext(SearchContext);
  const { sentForm } = useContext(SearchContext);
  const { apiCardNames } = useContext(CardContext);
  const { setTracker } = useContext(CardContext);

  const { path, setPath } = useContext(PathContext);
  const location = useLocation();

  // ul with card names in autocomplete list
  const listItems = useRef(null);
  // input text for search term
  const searchInput = useRef(null);
  // form
  const form = useRef(null);

  // Format name to fit scryfall api's requisite (word+word)
  const sanitizeString = (string) => {
    let sanitized = string.trim();
    sanitized = sanitized.split(' ').join('+');
    // console.log(sanitized);
    return sanitized;
  };

  const fetchSingleCard = (e) => {
    // bounce back if sent form does not match current form's id
    // This block other forms in the view to process the request down below
    if (sentForm !== form.current.id) {
      return;
    }

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
    if (e) {
      e.preventDefault();

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
        setIsSubmitted(true);
        searching = searchTerm;

        // Else request is sent with autofill result
        // from arrow up or/and down feature.
        // searchTerm is incomplete in this case.
        // searchInput should contain the autocompleted result
      } else {
        searching = searchInput.current.value;
      }
    }
    // setLoading(true);
    // console.log(sanitizeString(searchTerm));
    const headers = { method: 'GET' };
    fetch(
      `https://api.scryfall.com/cards/named?exact=${sanitizeString(searching)}`,
      headers
    )
      // https://api.scryfall.com/cards/search?order=released&q=oracleid%3A0c2841bb-038c-4fbf-8360-bc0a1522b58d&unique=prints
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('oracle', data.oracle_id);
        localStorage.setItem('apiCardName', data.name);
        // Reset cardNames state to empty array
        setCardNames([]);
        setCardName(data.name);
        setOracleID(data.oracle_id);

        setSearchTerm('');
        setIsValidLength(false);
        setIsSubmitted(false);
        setTracker(0);
        setText('');
        // setLoading(false);
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
    if (searchInput.current) {
      searchInput.current.value = '';
    }
    setPath(location.pathname.split('/')[1]);
  }, [path]);

  // On searchTerm state change,
  // Check if length of searchTerm is 3 or more.
  // If so, isValidLeangth becomes true & filter cardNames to match searcTerm
  // Card names array gets populated with filtered results.
  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsValidLength(true);
      setCardNames([]);
      const filteredNames = apiCardNames.filter((name) => {
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      console.log(filteredNames);
      setCardNames(filteredNames);
    } else if (searchTerm.length < 3) {
      setIsValidLength(false);
    }
  }, [searchTerm]);

  // isSubmitted is set in Suggesions Component
  // on click of li element
  useEffect(() => {
    if (isSubmitted) {
      // Call request function to fetch resulst from card name
      fetchSingleCard();
      // Set the focus on input search field
      if (searchInput.current) {
        searchInput.current.focus();
      }
    }
  }, [isSubmitted]);

  // Fetch call triggered when oracleID state changes in fetchSingleCard function
  useEffect(() => {
    if (oracleID) {
      setLoading(true);

      const headers = { method: 'GET' };
      fetch(
        `https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${oracleID}&unique=prints`,
        headers
      )
        .then((res) => res.json())
        .then((data) => {
          // Filter data to remove online versions of searched card
          setCards(filterData(data.data));

          setRequestSent(true);
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

  useEffect(() => {
    if (sentForm === 'search-api') {
      setIsOn(true);
    } else {
      setIsOn(false);
      setSearchTerm('');
    }
  }, [sentForm]);
  return (
    <Fragment>
      <h2 className="page-title">Enter A Card Name</h2>

      <form id="search-api" onSubmit={(e) => fetchSingleCard(e)} ref={form}>
        {!sentForm || sentForm === 'search-api' ? (
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            listItems={listItems}
            searchInput={searchInput}
            setRequestSent={setRequestSent}
            requestSent={requestSent}
            isOn={isOn}
            form={form}
            cardNames={cardNames}
          />
        ) : (
          <SearchField form={form} />
        )}
      </form>
      <div>
        {loading || !cards ? (
          <Spinner />
        ) : (
          <Fragment>
            {oracleID && (
              <header className="search-header">
                <span>
                  {`${cardName.charAt(0).toUpperCase()}${cardName
                    .substring(1)
                    .toLowerCase()} ${cards.length} 
              ` + (cards.length > 1 ? 'Results' : 'Result')}
                </span>
                <div className="clear-search" onClick={() => clearSearch()}>
                  <FiXCircle size={22} />
                </div>
              </header>
            )}
            <div className="catalog-items">
              {cards.map((card, index) => {
                return <Card key={index} card={card} />;
              })}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
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
const SearchResults = styled.div``;
export default Search;
