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
import Loading from '../../layout/Loading';

const SearchCatalog = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    cardName,
    setCards,
    setCardName,
    setCardNames,
    predictions,
    filterUserCards
  } = useContext(SearchContext);

  const { user } = useAuth();

  const { pathname } = useContext(PathContext);

  const navigate = useNavigate();
  const location = useLocation();
  const catalogInputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  // useEffect(() => {
  //   // console.log(pathname)
  //   // if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
  //     hideSearchBar();
  //   catalogInputRef.current.blur();
  //   // }
  // }, [pathname])

  useEffect(() => {
    if (searchInput) {

      if (searchInput.id === 'search-catalog') {
        setIsActive(true);
        const fetchCatalogCards = () => {
          console.log('fectching from catalog')
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          const options = {
            method: 'GET',
            headers: headers,
          };

          fetch(`${api.serverURL}/api/cards/catalog/${user.id}`, options)
            .then((res) => res.json())
            .then((data) => {
              const catalogCards = user ? filterUserCards(data.cards, user.id) : data.cards;
              console.log(catalogCards)
              setCards(catalogCards);
              setCardNames(catalogCards);
              // localStorage.setItem('catalogCards', JSON.stringify(catalogCards));
              // localStorage.setItem('cardNames', JSON.stringify(catalogCards));
            })
            .catch((error) => console.log(error));
        }

        fetchCatalogCards();
      }
      else {
        setIsActive(false);
      }
    }
  }, [searchInput]);

  // On submit, check if cardName is set
  // useEffect(() => {
  //   console.log(searchTerm)
  //   console.log(cardName)
  //   if (loading) {
  //     !cardName && setCardName(searchTerm)
  //   }
  // }, [loading])


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
    e?.preventDefault();

    if (searchTerm) {

      setLoading(true);

      catalogInputRef.current?.blur();

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      user && headers.append('auth-token', user.token)
      const options = {
        method: 'GET',
        headers: headers,
      };

      const query = !cardName ? searchTerm : predictions.length === 1 ? predictions[0] : cardName;

      fetch(`${api.serverURL}/api/catalog/${query}`, options)
        .then((res) => res.json())
        .then((data) => {
          // localStorage.setItem('searchCatalog', search);
          // localStorage.removeItem('catalogCards');
          console.log(data)
          setLoading(false);
          setSearchInput(null);
          setSearchTerm('');
          setCardName('');
          if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
            hideSearchBar();
          }
          navigate(`/search-result/${cardName.toLowerCase()}`,
            {
              state: { cards: data.results, cardName: data.cardName, type: catalogInputRef.current.id, search: location.pathname },
            });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <div id="search-catalog-container">
            <form id="search-catalog-form" className="search-form" onSubmit={handleSubmit} >
              <SearchInput isActive={isActive} id={'search-catalog'} handleSubmit={handleSubmit} ref={catalogInputRef} />
            </form>
          </div>
        )
      }
    </>
  );
};

export default SearchCatalog;
