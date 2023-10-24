import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchInput from './search/SearchInput';
import Spinner from '../layout/Spinner';
import { UserContext } from '../../contexts/UserContext';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import styled from 'styled-components';
import hideSearchBar from '../utilities/hideSearchBar';
import getBrowserWidth from '../utilities/getBrowserWidth';

const SearchCollection = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cards, setCards] = useState([]);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    cardName,
    setCardName, 
  } = useContext(SearchContext);

  const { user, userStoreContent } = useContext(UserContext);
  const { setPathname } = useContext(PathContext);

  const history = useHistory();
  const location = useLocation();
  const inputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  // Set pathname
  useEffect(() => {
    setPathname(location.pathname);
  }, [])

  useEffect(() => {
    if (searchInput) {
      if (searchInput.id === 'search-collection') {
        setIsActive(true);
        if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
          hideSearchBar();
        }
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
    if (!searchTerm) {
      throw new Error('Field is empty. Please provide a suggestion');
    }

    e && e.preventDefault();
    setLoading(true);
    inputRef.current.blur();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', user.token);
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/${searchTerm}/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('storeCards', JSON.stringify(data.data));
        // localStorage.setItem('storeCardName', cardName);
        setLoading(false);
        setCardName('')
        setSearchInput(null);
        // if (browserWidth <= 775 && document.querySelector('#mobile-nav').checked) {
        //   hideSearchBar();
        // }
        history.push({
          pathname: `/search-result/${searchTerm.toLowerCase()}`,
          state: { cards: data.results, cardName: data.cardName, type: inputRef.current.id },
        });
      })
      .catch((error) => console.log(error));
  };

  // Get all cards from user store
  const fetchAllCards = () => {
    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', user.token);
    const options = {
      method: 'GET',
      headers: headers,
    };
    fetch(`${api.serverURL}/api/cards/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('storeCards', JSON.stringify(data.data));
        localStorage.setItem('storeCardName', 'all');
        setLoading(false);
        setCards(data.result);
        setCardName('Store Cards:');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(false);
  }, [cards]);

  const handleClick = (e) => {
    history.push('search-api');
    if (localStorage.getItem('apiCardName')) {
      localStorage.removeItem('apiCardName');
      localStorage.removeItem('oracle');
    }
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
                <SearchInput isActive={isActive} id={'search-collection'} handleSubmit={handleSubmit} ref={inputRef} />
              </form>

              <Buttons>
                <Button
                  className="bg-green"
                  type="button"
                  onClick={handleClick}
                >
                  Add New Card
                </Button>
                <Button
                  className="bg-teal"
                  type="button"
                  onClick={fetchAllCards}
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
