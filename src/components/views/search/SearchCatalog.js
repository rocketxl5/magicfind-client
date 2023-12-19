import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchInput from './SearchInput';
import { SearchContext } from '../../../contexts/SearchContext';
import useAuth from '../../../hooks/useAuth';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';
import hideSearchBar from '../../../utilities/hideSearchBar';
import getBrowserWidth from '../../../utilities/getBrowserWidth';
import setQueryString from '../../../utilities/setQueryString';

const SearchCatalog = () => {
  const [isActive, setIsActive] = useState(false);
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

  const { auth } = useAuth();

  const { setPathname } = useContext(PathContext);

  const navigate = useNavigate();
  const location = useLocation();
  const catalogInputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  const fetchCatalogCards = () => {
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
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    setPathname(location.pathname);

    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }, []);

  useEffect(() => {

    if (searchInput?.id === 'search-catalog') {
      fetchCatalogCards();
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [searchInput]);

  const searchCatalog = (e = undefined, prediction = undefined) => {
    e?.preventDefault();

    if (searchTerm.length < 3) { return }

    setLoading(true);

    catalogInputRef.current?.blur();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('auth-token', auth.token);
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
    console.log(query)

    fetch(`${api.serverURL}/api/cards/catalog/${encodeURIComponent(query)}`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
            .then((data) => {
              setLoading(false);

              const result = {
                cards: data.cards,
                cardName: data.cardName,
                type: searchInput.id,
                search: location.pathname
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
      <form id="search-catalog-form" className="search-form" onSubmit={searchCatalog} >
        <SearchInput isActive={isActive} id={'search-catalog'} searchCards={searchCatalog} ref={catalogInputRef} />
      </form>
    </div>
  );
};

export default SearchCatalog;
