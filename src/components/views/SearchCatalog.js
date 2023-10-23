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
import { PathContext } from '../../contexts/PathContext';
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
    cardName,
    setCardName, 
  } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const { pathname } = useContext(PathContext);

  const history = useHistory();
  const inputRef = useRef(null);

  useEffect(() => {
    // console.log(pathname)
    if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
      hideSearchBar();
    }
  }, [pathname])

  useEffect(() => {
    if (searchInput) {
      if (searchInput.id === 'search-catalog') {
        setIsActive(true);
    }
    else {
      setIsActive(false);
        setSearchInput(null);
      }
    }
  }, [searchInput]);

  // On submit, check if cardName is set
  useEffect(() => {
    !cardName && setCardName(searchTerm)
  }, [loading])


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
  const handleSubmit = (e) => {
    if (!searchTerm) {
      throw new Error('Field is empty. Please provide a suggestion');
    }

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
          state: { cards: data.results, cardName: data.cardName, type: inputRef.current.id },
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
