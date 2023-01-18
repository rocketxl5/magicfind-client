import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useRef
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import StoreItem from './StoreItem';
import SearchField from './SearchField';
import Spinner from '../layout/Spinner.js';
import { FiXCircle } from 'react-icons/fi';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { CardContext } from '../../contexts/CardContext';
import { UserContext } from '../../contexts/UserContext';
import styled from 'styled-components';

const SearchCatalog = () => {
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNames, setCardNames] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [results, setResults] = useState([]);
  const { setIsValidLength } = useContext(SearchContext);

  const { isSubmitted, setIsSubmitted } = useContext(SearchContext);
  const { showSuggestions, setShowSuggestions } = useContext(SearchContext);
  const { searchResult, setSearchResult } = useContext(SearchContext);
  const { setText } = useContext(SearchContext);
  const { sentForm } = useContext(SearchContext);
  // const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { userStoreContent } = useContext(CardContext);
  const { setTracker } = useContext(CardContext);
  const { path, setPath } = useContext(PathContext);
  const history = useHistory();

  // ul with card names in autocomplete list
  const listItems = useRef(null);
  // input text for search term
  const searchInput = useRef(null);
  // form
  const form = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('catalogCardName')) {
      if (localStorage.getItem('catalogCardName') === 'all') {
        // fetchAllCards();
      } else {
        // setCards(JSON.parse(localStorage.getItem('storeCards')));
        setCardName(localStorage.getItem('catalogCardName'));
        // console.log('in card name', localStorage.getItem('storeCardName'));

        fetchSingleCard();
      }
    }
    // setPath(location.pathname.split('/')[1]);
  }, []);

  // Format name to fit scryfall api's requisite (word+word)
  const sanitizeString = (string) => {
    let sanitized = string.trim();
    sanitized = sanitized.split(' ').join('+');
    // console.log(sanitized);
    return sanitized;
  };

  useEffect(() => {
    if (isSubmitted && showSuggestions) {
      fetchSingleCard();
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  }, [isSubmitted]);

  // AUTOCOMPLETE
  useEffect(() => {
    // console.log(searchTerm);

    if (searchTerm.length < 3) {
      setIsValidLength(false);
    } else if (searchTerm.length > 2) {
      setIsValidLength(true);
      setCardNames([]);
      setLoading(true);

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const options = {
        method: 'GET',
        headers: headers
      };
      fetch(`/api/catalog`, options)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (results.length > 0) {
      console.log(results);
      const filteredCardNames = [];

      results.forEach((result) => {
        // Check for a match in name
        // Check for repetition of name: if there's multiple cards in store
        // with the same name, show the name only once in autocomplete list
        if (
          result.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !filteredCardNames.includes(result.name)
        ) {
          filteredCardNames.push(result.name);
        }
      });

      setCardNames(filteredCardNames);
    }
  }, [results]);

  // Submit search request to backend
  const fetchSingleCard = (e) => {
    if (sentForm !== form.current.id) {
      return;
    }

    if (!searchTerm) {
      return console.log('Field is empty');
    }

    let search = '';

    if (e) {
      e.preventDefault();
      setShowSuggestions(false);
      setIsSubmitted(true);
      search = searchInput.current.value;
    } else if (searchTerm) {
      search = searchTerm;
    } else {
      search = localStorage.getItem('searchCatalog');
    }

    setLoading(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('auth-token', token);
    const options = {
      method: 'GET',
      headers: headers
    };

    fetch(`/api/catalog/${search}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('searchCatalog', search);
        // localStorage.removeItem('catalogCards');
        // setSearchResult(data.data);
        setLoading(false);
        setSearchTerm('');
        setIsValidLength(false);
        setIsSubmitted(false);
        setText('');
        setTracker(0);

        if (path !== 'catalog') {
          history.push({
            pathname: `/catalog/${search}`,
            state: { result: data.data }
          });
        }
      })
      .catch((error) => console.log(error));
  };

  // console.log(path);
  useEffect(() => {
    if (sentForm === 'search-catalog') {
      setIsOn(true);
    } else {
      setIsOn(false);
      setSearchTerm('');
    }
  }, [sentForm]);

  // Clear search input on page change
  // useEffect(() => {
  //   console.log(path);
  //   // if (path !== 'search-catalog') {
  //   searchInput.current.value = '';
  //   // }
  //   console.log();
  // }, [path]);
  return (
    <Fragment>
      <form
        id="search-catalog"
        className="search-catalog"
        onSubmit={(e) => fetchSingleCard(e)}
        ref={form}
      >
        {!sentForm || sentForm === 'search-catalog' ? (
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setRequestSent={setRequestSent}
            cardNames={cardNames}
            listItems={listItems}
            searchInput={searchInput}
            isOn={isOn}
            form={form}
          />
        ) : (
          <SearchField form={form} />
        )}
      </form>
    </Fragment>
  );
};

export default SearchCatalog;
