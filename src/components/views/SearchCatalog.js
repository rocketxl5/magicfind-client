import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from './search/SearchForm';

import { SearchContext } from '../../contexts/SearchContext';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';


const SearchCatalog = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState('');

  const [cardNames, setCardNames] = useState([]);
  const [results, setResults] = useState([]);
  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    setIsValidLength,
    isSubmitted,
    setIsSubmitted,
    showSuggestions,
    setShowSuggestions,
    setText
  } = useContext(SearchContext);


  const history = useHistory();
  const currentInput = useRef(null);
  const currentForm = useRef(null);

  useEffect(() => {
    if (searchInput) {
      // console.log('in catalog')
      if (searchInput.id === currentInput.current.id) {
        setSearchInput(currentInput.current)
        // console.log('search catalog is', isActive)
        setIsActive(true);
      } else {
        setIsActive(false);
        setSearchTerm('');
      }
    }

  }, [searchInput]);


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
    if (isActive) {
      if (searchInput.value.length < 3) {
      setIsValidLength(false);
    } else if (searchTerm.length >= 3) {
      setIsValidLength(true);
      setCardNames([]);
      setLoading(true);

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const options = {
        method: 'GET',
        headers: headers,
      };
      fetch(`${api.serverURL}/api/catalog`, options)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
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

    if (!searchTerm) {
      throw new Error('Search is unknown or incomplete');
    }

    let search = '';

    if (e) {
      e.preventDefault();
      setShowSuggestions(false);
      setIsSubmitted(true);
      search = searchInput.value;
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
      headers: headers,
    };

    fetch(`${api.serverURL}/api/catalog/${search}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('searchCatalog', search);
        // localStorage.removeItem('catalogCards');
        console.log(data)
        setCards(data.results);
        setCardName(data.cardName);
        setLoading(false);
        setSearchTerm('');
        setIsValidLength(false);
        setIsSubmitted(false);
        setText('');
        setSearchInput(null)
        // setTracker(0);
        // Remove active state to clear search input
        setIsActive(false);
        // Remove search input focus
        searchInput.blur();

        history.push({
          pathname: `/search-result/${currentForm.current.id.split('-')[1]}/${search}`,
          state: { cards: data.results, cardName: data.cardName, formName: currentForm.current.id, loading },
        });

      })
      .catch((error) => console.log(error));
  };

  return (
      <div className="search-catalog">
        <SearchForm
          handleSubmit={fetchSingleCard}
          searchTermHandler={(input) => setSearchTerm(input)}
        formId={'search-catalog'}
          cardNames={cardNames}
          searchTerm={searchTerm}
          isActive={isActive}
        ref={{
          formRef: currentForm,
          inputRef: currentInput
        }}
        />
    </div>
  );
};

export default SearchCatalog;
