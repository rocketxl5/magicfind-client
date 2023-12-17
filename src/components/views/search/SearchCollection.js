import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi"
import SearchInput from './SearchInput';
import { SearchContext } from '../../../contexts/SearchContext';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';
import styled from 'styled-components';
import hideSearchBar from '../../../utilities/hideSearchBar';
import getBrowserWidth from '../../../utilities/getBrowserWidth';
import setQueryString from '../../../utilities/setQueryString';
import useAuth from '../../../hooks/useAuth';

const SearchCollection = () => {
  const [isActive, setIsActive] = useState(false);
  // const [message, setMessage] = useState(null);

  const {
    errorMessage,
    setErrorMessage,
    hasMounted,
    setHasMounted,
    searchInput,
    setSearchInput,
    searchTerm,
    cardName,
    setCardName,
    setCardNames,
    setLoading,
    predictions
  } = useContext(SearchContext);

  const { pathname, setPathname } = useContext(PathContext);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const collectionInputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  const fetchCollectionCards = () => {

    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', auth.token);
    const options = {
      method: 'GET',
      headers: headers,
    }

    fetch(`${api.serverURL}/api/cards/${auth.id}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((data) => {
              setCardNames(data.names);
              // Update local storage with search data
              localStorage.setItem('search-result', JSON.stringify({
                cards: data.cards,
                cardName: undefined,
                type: searchInput?.id,
                search: location.pathname
              }));
              setHasMounted(true);
              setErrorMessage(null);
              setLoading(false);
              setPathname(location.pathname);
              if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
                hideSearchBar();
              }
            });
        }
        else if (res.status === 400) {
          return res.json()
            .then((error) => {
              console.log(error.message)
              setHasMounted(true);
              setLoading(false);
              setErrorMessage({ ...error.message });
            })
        }
      });
  }

  useEffect(() => {
    if (!hasMounted) {
      fetchCollectionCards()
    } else {
      collectionInputRef.current?.focus();
      setHasMounted(false);
    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
    }
  }, []);

  useEffect(() => {
    if (searchInput?.id === 'search-collection') {
      setIsActive(true);
    } else {
      setHasMounted(false)
      setIsActive(false);
    }
  }, [searchInput]);

  // Instore single card request search field with
  const searchCollection = (e = undefined, prediction = undefined) => {
    e?.preventDefault();

    if (searchTerm.length < 3) { return }

    setLoading(true);

    collectionInputRef.current?.blur();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', auth.token);
    const options = {
      method: 'GET',
      headers: headers,
    };

    let query = ''

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

    fetch(`${api.serverURL}/api/cards/collection/${auth.id}/${encodeURIComponent(query)}`, options)
      .then((res) => res.json())
      .then((data) => {
        const result = {
          cards: data.results,
          cardName: data.cardName,
          type: searchInput.id,
          search: location.pathname
        }
        setLoading(false);
        setCardName('');
        setSearchInput(null);
        localStorage.setItem('search-result', JSON.stringify(result));
        navigate(`/search-result/${setQueryString(query.toLowerCase(), '-')}`,
          {
            state: result,
          });
      })
      .catch((error) => console.log(error));
  };

  // Get all cards from user store
  const handleClick = (e) => {
    e.preventDefault();

    if (localStorage.getItem('search-result')) {
      const jsonResult = JSON.parse(localStorage.getItem('search-result'))
      const result = {
        cards: jsonResult.cards,
        cardName: undefined,
        type: searchInput.id,
        search: location.pathname
      }
      // localStorage.setItem('search-result', JSON.stringify(result));
      navigate(`/search-result/all-cards`,
        {
          state: result,
        });
    }
  };

  return (
    <div className="flex inherit-height">
            <div className="content flex-grow-1">
              <header className="header">

                <h2 className="title">Search Collection</h2>
              </header>
              <main className="main">
            {
            errorMessage?.title === 'no_cards' ? (

                <div className="message">
                  <section className="message-section">
                    <div className="message-body">
                      {
                      errorMessage.body?.map((part, index) => {
                          return <p key={index}>{part}</p>
                        })
                      }
                    </div>
                  </section>
                  <section className="message-section">
                    <Link className="message-link" to={'/search-api'}> Go To The Add Card Page <FiArrowRightCircle /></Link>
                  </section>
                </div>
              ) : (
                      <>
                        <form id="search-collection-form" className="search-form" onSubmit={searchCollection} >
                          <SearchInput isActive={isActive} id={'search-collection'} searchCards={searchCollection} ref={collectionInputRef} />
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
                      </>
              )
            }
              </main>
      </div>
    </div>
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