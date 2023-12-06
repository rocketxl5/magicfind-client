import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi"
import SearchInput from './SearchInput';
import Loading from '../../layout/Loading';
import { SearchContext } from '../../../contexts/SearchContext';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';
import styled from 'styled-components';
import hideSearchBar from '../../../utilities/hideSearchBar';
import getBrowserWidth from '../../../utilities/getBrowserWidth';
import setQueryString from '../../../utilities/setQueryString';
import useAuth from '../../../hooks/useAuth';

const SearchCollection = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState(null);

  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    cardName,
    cards,
    setCards,
    setCardName,
    setCardNames,
    predictions
  } = useContext(SearchContext);

  const { setPathname } = useContext(PathContext);

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
          return res.json();
        }

        return res.json().then((data) => {
          setLoading(false);
          throw new Error(JSON.stringify(data));
        })
      })
      .then((data) => {
        setLoading(false);
        setCardNames(data.names);
        setCards(data.cards);
        collectionInputRef?.current?.focus();
      })
      .catch((error) => {
        const errorMessage = JSON.parse(error.message);
        setMessage({ ...errorMessage });
      });
  }


  useEffect(() => {
    setPathname(location.pathname);

    fetchCollectionCards()

    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }, []);

  useEffect(() => {
    if (searchInput?.id === 'search-collection') {

      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [searchInput]);

  // Instore single card request search field with
  const searchCollection = (e) => {
    e?.preventDefault();

    if (searchTerm.length < 3) { return }
      setLoading(true);
      setSearchTerm(cardName);
      collectionInputRef.current.blur();

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('auth-token', auth.token);
      const options = {
        method: 'GET',
        headers: headers,
      };

    let query = '';

    if (cardName) {
      query = cardName
    }
    else if (predictions.length === 1) {
      query = predictions[0];
    }
    else {
      query = searchTerm
    }

    fetch(`${api.serverURL}/api/cards/${encodeURIComponent(query)}/${auth.id}`, options)
      .then((res) => res.json())
      .then((data) => {
    // localStorage.setItem('storeCards', JSON.stringify(data.data));
    // localStorage.setItem('storeCardName', cardName);

        setLoading(false);
        setCardName('')
        setSearchInput(null);
        navigate(`/search-result/${setQueryString(query.toLowerCase(), '-')}`,
          {
            state: { cards: data.results, cardName: data.cardName, type: collectionInputRef.current.id, search: location.pathname },
          });
      })
      .catch((error) => console.log(error));
  };

  // Get all cards from user store
  const handleClick = () => {
    if (cards) {
      navigate(`/search-result/all-cards`,
        {
          state: { cards: cards, type: collectionInputRef.current.id, search: location.pathname },
        });
    }
  };

  return (
    <div className="flex inherit-height">
      {
        loading ? (
          <Loading />
        ) : (
            <div className="content flex-grow-1">
              <header className="header">

                <h2 className="title">Search Collection</h2>
              </header>
              <main className="main">
            {
              message?.title === 'no_cards' ? (

                <div className="message">
                  <section className="message-section">
                    <div className="message-body">
                      {
                        message.body?.map((part, index) => {
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
        )
      }
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
