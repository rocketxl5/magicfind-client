import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import StoreItem from './StoreItem';
import SearchResultHeader from './search/SearchResultHeader';
import SearchForm from './search/SearchForm';
import Spinner from '../layout/Spinner.js';
import { UserContext } from '../../contexts/UserContext';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';
import styled from 'styled-components';

const SearchStore = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);

  const [setRemoveCard] = useState(false);
  const [setModifyCard] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNames, setCardNames] = useState([]);
  const [requestSent, setRequestSent] = useState(false);


  const {
    currentInput,
    currentForm,
    previousFormID,
    setPreviousFormID,
    searchInput,
    showSuggestions,
    setShowSuggestions,
    isSubmitted,
    setIsSubmitted,
    setIsValidLength,
    setText
  } = useContext(SearchContext);
  const { user, userStoreContent } = useContext(UserContext);

  const { setTracker } = useContext(CardContext);
  const { setPath } = useContext(PathContext);
  const history = useHistory();
  const location = useLocation();
  const activeForm = useRef(null);

  useEffect(() => {
    if (activeForm.current.id === 'search-store') {
      setIsActive(true);
    } else {
      setIsActive(false);
      setSearchTerm('');
    }
  }, [currentInput]);

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
    if (searchInput) {
      if (isSubmitted && showSuggestions) {
        // Call request function to fetch resulst from card name
        fetchSingleCard();
        // Set the focus on input search field
        searchInput.focus();
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
    // if (previousForm !== form.current.id) {
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
      search = searchInput.value;
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
        setPreviousFormID(currentForm.id);
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
    fetch(`${api.serverURL}/api/cards/${user.id}`, options)
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

  return (
    <>
    <div className="search-content">
        <h2 className="page-title">Enter A Card Name</h2>
      <SearchForm
          handleSubmit={fetchSingleCard}
          searchTermHandler={(input) => setSearchTerm(input)}
          formId={'search-store'}
        setRequestSent={setRequestSent}
        requestSent={requestSent}
        cardNames={cardNames}
          searchTerm={searchTerm}
          isActive={isActive}
          activeForm={activeForm}
      />
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
      </div>
      <div className="">
        {loading || !cards ? (
          <Spinner />
        ) : (
            <>
            {cardName && (
                <SearchResultHeader cardName={cardName} cards={cards} clearSearch={clearSearch} />
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

export default SearchStore;
