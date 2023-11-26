import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from './search/SearchInput';
import Spinner from '../layout/Spinner';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import styled from 'styled-components';
import hideSearchBar from '../../utilities/hideSearchBar';
import getBrowserWidth from '../../utilities/getBrowserWidth';

const SearchCollection = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    setCards,
    cards,
    cardName,
    setCardName, 
    setCardNames,
    predictions,
    getCardNames
  } = useContext(SearchContext);

  const { setPathname } = useContext(PathContext);

  const navigate = useNavigate();
  const location = useLocation();
  const collectionInputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  // Set pathname
  useEffect(() => {
    collectionInputRef?.current?.focus();
    setPathname(location.pathname);
    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }, [])

  useEffect(() => {
    if (searchInput) {
      console.log('all cards')
      if (searchInput.id === 'search-collection') {
        setIsActive(true);
        const fetchCollectionCards = () => {
          console.log('fectching from collection')
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('auth-token', user.token);
          const options = {
            method: 'GET',
            headers: headers,
          }
          fetch(`${api.serverURL}/api/cards/${user.id}`, options)
            .then((res) => res.json())
            .then((data) => {
              const collectionCards = data.unpublished;
              setCards(collectionCards);
              setCardNames(getCardNames(collectionCards));
            })
            .catch((error) => console.log(error));
        }

        fetchCollectionCards()
      }
      else {
        setIsActive(false);
      }
    }
  }, [searchInput]);

  // On submit, check if cardName is set
  // useEffect(() => {
  //   (loading && !cardName) && setCardName(searchTerm);
  // }, [loading])

  // useEffect(() => {
  //   if (localStorage.getItem('storeCardName')) {
  //     if (localStorage.getItem('storeCardName') === 'all') {
  //       // fetchAllCards();
  //       console.log('all cards')
  //     } else {
  //       // setCards(JSON.parse(localStorage.getItem('storeCards')));
  //       setCardName(localStorage.getItem('storeCardName'));
  //       console.log('in card name', localStorage.getItem('storeCardName'));

  //       // fetchSingleCard();
  //     }
  //   }
  // }, []);


  // Instore single card request search field with
  // cardname (searchTerm) and user id
  const handleSubmit = (e) => {
    e?.preventDefault();

    if (searchTerm) {   
      setLoading(true);
      setSearchTerm(cardName);
      collectionInputRef.current.blur();

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('auth-token', user.token);
      const options = {
        method: 'GET',
        headers: headers,
      };
      console.log(cardName)
      const query = !cardName ? searchTerm : predictions.length === 1 ? predictions[0] : cardName;

      fetch(`${api.serverURL}/api/cards/${query}/${user.id}`, options)
        .then((res) => res.json())
        .then((data) => {
          // localStorage.setItem('storeCards', JSON.stringify(data.data));
          // localStorage.setItem('storeCardName', cardName);
          setLoading(false);
          setCardName('')
          setSearchInput(null);
          navigate(`/search-result/${cardName.toLowerCase()}`,
            {
              state: { cards: data.results, cardName: data.cardName, type: collectionInputRef.current.id, search: location.pathname },
            });
        })
        .catch((error) => console.log(error));
    }
  };

  // Get all cards from user store
  const handleClick = () => {
    if (cards) {
      navigate(`/search-result/all-cards`,
        {
          state: { cards: cards, type: collectionInputRef.current.id, search: location.pathname },
        });
    }
  // setLoading(true);
  // const headers = new Headers();
  // headers.append('Content-Type', 'application/json');
  // headers.append('auth-token', user.token);
  // const options = {
  //   method: 'GET',
  //   headers: headers,
  // };
  // fetch(`${api.serverURL}/api/cards/${user.id}`, options)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     // localStorage.setItem('storeCards', JSON.stringify(data.data));
  //     // localStorage.setItem('storeCardName', 'all');
  //     setLoading(false);
  //     setCardName('');
  //     navigate(`/search-result/all-cards`,
  //       {
  //         state: { cards: data.results, type: collectionInputRef.current.id, search: location.pathname },
  //       });
  //     // setCards(data.result);
  //     // setCardName('Store Cards:');
  //   })
  //   .catch((error) => console.log(error));
  };

  // const clearSearch = () => {
  //   setCards([]);
  //   setCardName('');
  //   localStorage.removeItem('storeCards');
  //   localStorage.removeItem('storeCardName');
  // };

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
            <div className="search-card">
              <h2 className="page-title">Enter A Card Name</h2>
              <form id="search-collection-form" className="search-form" onSubmit={handleSubmit} >
                <SearchInput isActive={isActive} id={'search-collection'} handleSubmit={handleSubmit} ref={collectionInputRef} />
              </form>

              <Buttons>
                <Button
                  className="bg-green"
                  type="button"
                  onClick={() => navigate('/search-api')}
                >
                  Add New Card
                </Button>
                <Button
                  className="bg-teal"
                  type="button"
                  onClick={handleClick}
                >
                  Show All Cards
                </Button>
              </Buttons>
            </div>
        )
      }
    </>
  );
};

const Buttons = styled.div`
  margin-block-start: 4rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;
const Button = styled.button`
  min-width: 45%;
  color: var(--clr-light);
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;

  svg {
    display: block;
    margin-left: 1em;
    width: 1.5em;
    height: 1.5em;
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 320px) {
    width: 100%;
    margin-top: 1em;
  }
`;

export default SearchCollection;
