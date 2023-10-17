import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from './search/SearchForm';
import { SearchContext } from '../../contexts/SearchContext';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../api/resources';
import getBrowserWidth from '../utilities/getBrowserWidth';
import hideSearchBar from '../utilities/hideSearchBar';
import handleSearchBar from '../utilities/handleSearchBar';

const SearchCatalog = () => {
  const [browserWidth, setBrowserWidth] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [results, setResults] = useState([]);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    cardName,
    setCardName, 
    setIsValidLength,
    isSubmitted,
    setIsSubmitted,
    showSuggestions,
    setShowSuggestions,
    setText
  } = useContext(SearchContext);
  const { user } = useContext(UserContext);


  const history = useHistory();
  const inputRef = useRef(null);
  const currentForm = useRef(null);

  useEffect(() => {
    setBrowserWidth(getBrowserWidth())
  }, []);

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
        // Handle closing of Search catatalog search bar in mobile
        // If search field is not catalog and checkbox (#mobile-nav) is checked (search is displayed)
        if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
          // hideSearchBar();
          handleSearchBar(document.querySelector('.hamburger-btn'), (state) => { setSearchTerm(state) }, true);
      }
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
        // fetchSingleCard();
      }
    }

    // setPath(location.pathname.split('/')[1]);
  }, []);


  // Triggers on 
  useEffect(() => {

    if (isSubmitted && showSuggestions) {
      setShowSuggestions(false);
      fetchSingleCard();
    } else {
      setShowSuggestions(true);
    }

  }, [isSubmitted]);

  // AUTOCOMPLETE query for results
  useEffect(() => {
    if (isActive) {
      if (searchInput.value.length < 3) {
        setCardNames([]);
        setIsValidLength(false);
      } else if (searchTerm.length >= 3) {
        setIsValidLength(true);
        setCardNames([]);


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
          })
          .catch((error) => console.log(error));
      }
    }
  }, [searchTerm]);

  // AUTOCOMPLETE processing results
  useEffect(() => {
    // If input field is not empty string
    if (inputRef.current.value) {
      if (results.length > 0) {
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
    }
  }, [results]);

  // Handle submit form
  const fetchSingleCard = (e) => {

    console.log(cardName)

    // Assign cardName state to search input value
    searchInput.value = cardName;

    if (!searchTerm) {
      throw new Error('Field is empty. Please provide a suggestion');
    }

    // If fetch was called from SearchForm (pressing enter)
    // Else fetch was called from click event in Predictions component
    if (e) {
      e.preventDefault();
      setShowSuggestions(false);
      setIsSubmitted(true);
    } 
    // else if (searchTerm) {
    //   search = searchTerm;
    // } else {
    //   search = localStorage.getItem('searchCatalog');
    // }

    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    user && headers.append('Authorization', user.token)
    // headers.append('auth-token', token);
    const options = {
      method: 'GET',
      headers: headers,

    };

    fetch(`${api.serverURL}/api/catalog/${cardName}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('searchCatalog', search);
        // localStorage.removeItem('catalogCards');
        console.log(data)
        setLoading(false);
        setCards(data.results);
        setSearchTerm('');
        setIsValidLength(false);
        setIsSubmitted(false);
        setCardName('')
        setText('');
        setSearchInput(null);
        // Remove active state to clear search input
        setIsActive(false);
        // Remove search input focus
        searchInput.blur();
        // Hide search bar on mobile
        hideSearchBar();
        history.push({
          pathname: `/search-result/${currentForm.current.id.split('-')[1]}/${cardName}`,
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
          inputRef: inputRef
        }}
        />
    </div>
  );
};

export default SearchCatalog;
