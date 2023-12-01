import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi"
import SearchInput from './search/SearchInput';
import Loading from '../layout/Loading';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import styled from 'styled-components';
import hideSearchBar from '../../utilities/hideSearchBar';
import getBrowserWidth from '../../utilities/getBrowserWidth';

const SearchCollection = ({ user }) => {
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

  const navigate = useNavigate();
  const location = useLocation();
  const collectionInputRef = useRef(null);
  const browserWidth = getBrowserWidth();

  const fetchCollectionCards = () => {
    console.log('in')
    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', user.token);
    const options = {
      method: 'GET',
      headers: headers,
    }
    fetch(`${api.serverURL}/api/cards/${user.id}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          setLoading(false);
          console.log(data);
          throw new Error(JSON.stringify(data));
        })
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setCardNames(data.names);
        setCards(data.cards);
        collectionInputRef?.current?.focus();
      })
      .catch((error) => {
        // console.log(error)
        const errorMessage = JSON.parse(error.message);
        setMessage({ ...errorMessage });
      });
  }
  useEffect(() => {
    console.log(location.pathname)
    collectionInputRef?.current?.focus();
    setPathname(location.pathname);

    fetchCollectionCards()

    if (browserWidth <= 775 && document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }, []);

  useEffect(() => {
    // console.log(searchInput)
    if (searchInput?.id === 'search-collection') {

      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [searchInput]);

  // Instore single card request search field with
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
          console.log(cardName)
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
    console.log(cards)
    if (cards) {
      console.log(cards)
      navigate(`/search-result/all-cards`,
        {
          state: { cards: cards, type: collectionInputRef.current.id, search: location.pathname },
        });
    }
  };

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
            <div className="search-card">
              <header>
                <h1 className="page-title">Collection Page</h1>

              </header>
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

                  <section className="main-collection">


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
                  </section>
                )
              }
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
