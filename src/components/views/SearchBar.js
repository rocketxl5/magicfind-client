import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import SearchField from './SearchField';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNames, setCardNames] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [results, setResults] = useState([]);
  const [requestSent, setRequestSent] = useState(false);

  const { setIsValidLength } = useContext(SearchContext);
  const { isSubmitted, setIsSubmitted } = useContext(SearchContext);
  const { showSuggestions, setShowSuggestions } = useContext(SearchContext);
  const { setText } = useContext(SearchContext);
  const { sentForm } = useContext(SearchContext);
  const { setTracker } = useContext(CardContext);
  const { path, setPath } = useContext(PathContext);
  const history = useHistory();
  // ul with card names in autocomplete list
  const listItems = useRef(null);
  // input text for search term
  const searchInput = useRef(null);

  const currentForm = useRef(null);

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
        headers: headers,
      };
      fetch(`${api.serverURL}/api/catalog`, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(typeof data)
          setResults(data);
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
    if (sentForm !== currentForm.current.id) {
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
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/catalog/${search}`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setSearchTerm('');
        setIsValidLength(false);
        setIsSubmitted(false);
        setText('');
        setTracker(0);

        if (path !== 'catalog') {
          history.push({
            pathname: `/catalog/${search}`,
            state: { result: data.data },
          });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (checked) {

    }
  }, [checked])

  useEffect(() => {
    if (sentForm === 'search-catalog') {
      setIsOn(true);
    } else {
      setIsOn(false);
      setSearchTerm('');
    }
  }, [sentForm]);

  return (
    <div className="search-bar">
      <form
        id="search-catalog"
        className="search-form"
        onSubmit={(e) => fetchSingleCard(e)}
        ref={currentForm}
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
            currentForm={currentForm}
          />
        ) : (
          <SearchField />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
