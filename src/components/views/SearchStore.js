import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import StoreItem from './StoreItem';
import { FiXCircle, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import SearchField from './SearchField';
import Spinner from '../layout/Spinner.js';
import { UserContext } from '../../contexts/UserContext';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';
import styled from 'styled-components';
import capitalizeString from '../utilities/capitalizeString';

const SearchStore = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setRemoveCard] = useState(false);
  const [setModifyCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNames, setCardNames] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const { setIsValidLength } = useContext(SearchContext);

  const { user } = useContext(UserContext);
  const { isSubmitted, setIsSubmitted } = useContext(SearchContext);
  const { showSuggestions, setShowSuggestions } = useContext(SearchContext);
  const { setText } = useContext(SearchContext);
  const { sentForm } = useContext(SearchContext);
  const { userStoreContent } = useContext(CardContext);
  const { setTracker } = useContext(CardContext);
  const { setPath } = useContext(PathContext);
  const history = useHistory();
  const location = useLocation();
  console.log(loading)
  // ul with card names in autocomplete list
  const listItems = useRef(null);
  // input text for search term
  const searchInput = useRef(null);
  // form
  const form = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('storeCardName')) {
      if (localStorage.getItem('storeCardName') === 'all') {
        // fetchAllCards();
        console.log('all cards')
      } else {
        // setCards(JSON.parse(localStorage.getItem('storeCards')));
        setCardName(localStorage.getItem('storeCardName'));
        console.log('in card name', localStorage.getItem('storeCardName'));

        fetchSingleCard();
      }
    }
    setPath(location.pathname.split('/')[1]);
  }, []);

  useEffect(() => {
    if (searchInput.current) {
      if (isSubmitted && showSuggestions) {
        // Call request function to fetch resulst from card name
        fetchSingleCard();
        // Set the focus on input search field
        searchInput.current.focus();
        setShowSuggestions(false);
      } else {
        setShowSuggestions(true);
      }
    }
  }, [isSubmitted]);

  // AUTOCOMPLETE
  useEffect(() => {
    // console.log(searchTerm);

    if (searchTerm.length < 3) {
      setIsValidLength(false);
    } else if (searchTerm.length > 2) {
      setIsValidLength(true);

      const filteredCardNames = [];
      if (userStoreContent) {
        userStoreContent.forEach((item) => {
          // Check for a match in name
          // Check for repetition of name: if there's multiple cards in store
          // with the same name, show the name only once in autocomplete list
          if (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !filteredCardNames.includes(item.name)
          ) {
            filteredCardNames.push(item.name);
          }
        });
      }

      setCardNames(filteredCardNames);
      // console.log(filteredCardNames);
    }
  }, [searchTerm]);

  // Instore single card request search field with
  // cardname (searchTerm) and user id
  const fetchSingleCard = (e) => {
    // bounce back if sent form does not match current form's id
    // This block other forms in the view to process the request down below
    // if (sentForm !== form.current.id) {
    //   return console.log('wrong form');
    // }

    // if (!searchTerm || searchTerm.length < 3) {
    //   return console.log('Search term is incomplete');
    // }

    let search = '';

    if (e) {
      // console.log('in submit');
      e.preventDefault();
      setShowSuggestions(false);
      setIsSubmitted(true);
      search = searchInput.current.value;
    } else if (searchTerm) {
      search = searchTerm;
    } else {
      search = localStorage.getItem('storeCardName');
    }

    setLoading(true);

    // Set request headers
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', user.token);
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/${search}/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('storeCards', JSON.stringify(data.data));
        search && localStorage.setItem('storeCardName', search);
        setCards(data.data);
        setCardNames([]);
        setCardName(search);
        setLoading(false);
        setSearchTerm('');
        setIsValidLength(false);
        setIsSubmitted(false);
        setText('');
        setTracker(0);
        search = '';
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
    fetch(`/api/cards/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('storeCards', JSON.stringify(data.data));
        localStorage.setItem('storeCardName', 'all');
        setCards(data.data);
        setCardName('Store Cards:');
        setLoading(false);
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

  const clearSearch = () => {
    setCards([]);
    setCardName('');
    localStorage.removeItem('storeCards');
    localStorage.removeItem('storeCardName');
  };

  useEffect(() => {
    if (sentForm === 'search-store') {
      setIsOn(true);
    } else {
      setIsOn(false);
      setSearchTerm('');
    }
  }, [sentForm]);

  return (
    <div className="search-content">
      <h2 className="page-title">Enter A Card Name</h2>

      <form id="search-store" onSubmit={fetchSingleCard} ref={form}>
        {!sentForm || sentForm === 'search-store' ? (
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            listItems={listItems}
            searchInput={searchInput}
            setRequestSent={setRequestSent}
            requestSent={requestSent}
            cardNames={cardNames}
            isOn={isOn}
            form={form}
          />
        ) : (
            <SearchField form={form} />
        )}
      </form>
      <Buttons>
        <Button
          onClick={handleClick}
          className="bg-green"
        >
          Add New Card
        </Button>
        <Button
          onClick={fetchAllCards}
          className="bg-teal"
        >
          Show All Cards
        </Button>
      </Buttons>

      <div className="store-search-results">
        {loading || !cards ? (
          <Spinner />
        ) : (
            <>
            {cardName && (
                <header className="result-header">
                  <h3 className="result-title">
                    <div className="result-details">
                      <span>
                        {capitalizeString(cardName)}
                      </span>
                      <span>
                        {`${cards.length} 
                               ` + (cards.length > 1 ? 'Results' : 'Result')}
                      </span>
                    </div>
                    <span className="clear-search" onClick={clearSearch}>
                      <FiXCircle size={20} />
                    </span>
                  </h3>
                </header>
            )}
              <div className="search-items">
              {cards.map((card) => {
                return (
                  <StoreItem
                    key={card._id}
                    card={card}
                    setRemoveCard={setRemoveCard}
                    setModifyCard={setModifyCard}
                  />
                );
              })}
            </div>
            </>
        )}
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

export default SearchStore;
