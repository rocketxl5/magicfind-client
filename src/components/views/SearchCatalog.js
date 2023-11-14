import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './search/SearchInput';
import { SearchContext } from '../../contexts/SearchContext';
import { AuthContext } from '../../contexts/AuthContext';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import hideSearchBar from '../utilities/hideSearchBar';
import getBrowserWidth from '../utilities/getBrowserWidth';
import Spinner from '../layout/Spinner';

const SearchCatalog = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    cardName,
    setCardName, 
  } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { pathname } = useContext(PathContext);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const browserWidth = getBrowserWidth();

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
    console.log(searchTerm)
    console.log(cardName)
    if (loading) {
      !cardName && setCardName(searchTerm)
    }
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
    setSearchTerm(cardName);
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
        // console.log(data)
        setLoading(false);
        setCardName('')
        setSearchInput(null);
        if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
          hideSearchBar();
        }
        navigate(`/search-result/${cardName.toLowerCase()}`,
          {
            state: { cards: data.results, cardName: data.cardName, type: inputRef.current.id },
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
            <div id="search-catalog-container">
              <form id="search-catalog-form" className="search-form" onSubmit={handleSubmit} >
                <SearchInput isActive={isActive} id={'search-catalog'} handleSubmit={handleSubmit} ref={inputRef} />
              </form>
            </div>
        )
      }
    </>
  );
};

export default SearchCatalog;
