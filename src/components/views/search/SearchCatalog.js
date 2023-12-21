import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import { SearchContext } from '../../../contexts/SearchContext';
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';
import hideSearchBar from '../../../utilities/hideSearchBar';
import getBrowserWidth from '../../../utilities/getBrowserWidth';
import setQueryString from '../../../utilities/setQueryString';

const SearchCatalog = () => {
  // States
  const [isActive, setIsActive] = useState(false);
  // Ref
  const catalogInputRef = useRef(null);
  // Context
  const {
    searchInput,
    setLoading,
    setSearchInput,
    searchTerm,
    cardName,
    setCardName,
    setCardNames,
    predictions,
  } = useContext(SearchContext);
  // Routing
  const navigate = useNavigate();
  // Hook
  const { auth } = useAuth();
  // Utilities
  const browserWidth = getBrowserWidth();

  const searchCatalog = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/catalog`, options)
      .then((res) => res.json())
      .then((data) => {
        setCardNames(data.cards)
        console.log(data.cards)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {

    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }, []);

  useEffect(() => {

    if (searchInput?.id === 'search-catalog') {
      searchCatalog();
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [searchInput]);

  const searchCatalogCard = (e = undefined, prediction = undefined) => {
    e?.preventDefault();

    if (searchTerm.length < 3) { return }

    setLoading(true);

    catalogInputRef.current?.blur();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    auth && headers.append('auth-token', auth.token);
    const options = {
      method: 'GET',
      headers: headers,
    };

    let query;

    if (prediction) {
      query = prediction;
    }
    else if (cardName) {
      query = cardName;
    }
    else if (predictions.length === 1) {
      query = predictions[0];
    }
    else if (searchTerm) {
      query = searchTerm;
    }
    // Conditional query string won't return user cards if auth
    // Else returns all cards
    const queryString = auth ?
      `${api.serverURL}/api/cards/catalog/${encodeURIComponent(query)}/${auth.id}` :
      `${api.serverURL}/api/cards/catalog/${encodeURIComponent(query)}`;

    fetch(queryString, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
            .then((data) => {
              setLoading(false);

              const result = {
                cards: data.cards,
                searchType: searchInput.id
              }

              setCardName('');
              setSearchInput(null);
              localStorage.setItem('search-result', JSON.stringify(result));
              navigate(`/search-result/catalog/${setQueryString(query.toLowerCase(), '-')}`,
                {
                  state: result,
                });

              if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
                hideSearchBar();
              }
            })
        }
        else if (res.status === 400) {
          setLoading(false);
          navigate(`/search-result/not-found/${query}`);

          if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
            hideSearchBar();
          }
        }
      });
  }

  return (
    <div id="search-catalog-container">
      <form id="search-catalog-form" className="search-form" onSubmit={searchCatalogCard} >
        <SearchInput isActive={isActive} id={'search-catalog'} searchCard={searchCatalogCard} ref={catalogInputRef} />
      </form>
    </div>
  );
};

export default SearchCatalog;
