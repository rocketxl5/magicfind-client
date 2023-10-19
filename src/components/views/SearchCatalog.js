import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useHistory } from 'react-router-dom';
import SearchInput from './search/SearchInput';
import { SearchContext } from '../../contexts/SearchContext';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../api/resources';
import hideSearchBar from '../utilities/hideSearchBar';
import handleSearchBar from '../utilities/handleSearchBar';
import getBrowserWidth from '../utilities/getBrowserWidth';

const SearchCatalog = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const browserWidth = getBrowserWidth();

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
    showPredictions,
    setShowPredictions,
  } = useContext(SearchContext);
  const { user } = useContext(UserContext);

  const history = useHistory();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchInput) {

      searchInput.id === 'search-catalog' && setIsActive(true);
    }
    else {

      setIsActive(false);
      setSearchInput(null);
        // Handle closing of Search catatalog search bar in mobile
        // If search field is not catalog and checkbox (#mobile-nav) is checked (search is displayed)
        if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
          // hideSearchBar();
          handleSearchBar(document.querySelector('.hamburger-btn'), (state) => { setSearchTerm(state) }, true);
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


  // Triggers when isSubmitted is set to true @ AutoCompleteList
  useEffect(() => {

    if (isSubmitted && showPredictions) {
      console.log(cardName)
      setShowPredictions(false);
      fetchSingleCard();
    } else {
      setShowPredictions(true);
    }

  }, [isSubmitted]);

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
      setShowPredictions(false);
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
        setSearchTerm(undefined);
        setIsValidLength(false);
        setIsSubmitted(false);
        setCardName('')
        setSearchInput(null);

        hideSearchBar();
        history.push({
          pathname: `/search-result/${cardName.toLowerCase()}`,
          state: { cards: data.results, cardName: data.cardName, loading },
        });

      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="search-catalog-container">
      <form id="search-catalog-form" className="search-form" onSubmit={fetchSingleCard} >
        <SearchInput isActive={isActive} id={'search-catalog'} ref={inputRef} />
      </form>
    </div>
  );
};

export default SearchCatalog;
