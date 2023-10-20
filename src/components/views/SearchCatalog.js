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


  // useEffect(() => {
  //   if (localStorage.getItem('catalogCardName')) {
  //     if (localStorage.getItem('catalogCardName') === 'all') {
  //       // fetchAllCards();
  //     } else {
  //       // setCards(JSON.parse(localStorage.getItem('storeCards')));
  //       setCardName(localStorage.getItem('catalogCardName'));
  //       // console.log('in card name', localStorage.getItem('storeCardName'));
  //       // fetchSingleCard();
  //     }
  //   }

  //   // setPathname(location.pathname.split('/')[1]);
  // }, []);




  // Handle submit form
  const handleSubmit = (e) => {
    if (!searchTerm) {
      throw new Error('Field is empty. Please provide a suggestion');
    }

    // If fetch was called from SearchForm (pressing enter)
    // Else fetch was called from click event in Predictions component

    e && e.preventDefault();
    setLoading(true);
    inputRef.current.blur();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    user && headers.append('auth-token', user.token)
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
        setCardName('')
        setSearchInput(null);
        if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
          hideSearchBar();
        }
        history.push({
          pathname: `/search-result/${cardName.toLowerCase()}`,
          state: { cards: data.results, cardName: data.cardName, type: inputRef.current.id, loading: loading },
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="search-catalog-container">
      <form id="search-catalog-form" className="search-form" onSubmit={handleSubmit} >
        <SearchInput isActive={isActive} id={'search-catalog'} handleSubmit={handleSubmit} ref={inputRef} />
      </form>
    </div>
  );
};

export default SearchCatalog;
