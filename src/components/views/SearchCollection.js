import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchInput from './search/SearchInput';
import { UserContext } from '../../contexts/UserContext';
import { SearchContext } from '../../contexts/SearchContext';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';
import styled from 'styled-components';

const SearchCollection = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardNames, setCardNames] = useState([]);

  const {
    setSearchType,
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    cardName,
    setCardName,
    showPredictions,
    setShowPredictions,
    isSubmitted,
    setIsSubmitted,
    setText
  } = useContext(SearchContext);
  const { user, userStoreContent } = useContext(UserContext);

  const history = useHistory();
  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (searchInput) {
      if (searchInput.id !== inputRef.current.id) {
        searchInput.value = '';
      }
      if (searchInput.id === inputRef.current.id) {
        setSearchInput(inputRef.current);
        setIsActive(true);
      } else {
        setIsActive(false);
        setSearchTerm('');
      }
    }

  }, [searchInput]);

  useEffect(() => {
    if (localStorage.getItem('storeCardName')) {
      if (localStorage.getItem('storeCardName') === 'all') {
        // fetchAllCards();
        console.log('all cards')
      } else {
        // setCards(JSON.parse(localStorage.getItem('storeCards')));
        setCardName(localStorage.getItem('storeCardName'));
        console.log('in card name', localStorage.getItem('storeCardName'));

        // fetchSingleCard();
      }
    }
  }, []);


  useEffect(() => {
    if (searchInput) {
      if (isSubmitted && showPredictions) {
        setShowPredictions(false);
        fetchSingleCard();
        // Set the focus on input search field
        // searchInput.focus();
        setShowPredictions(false);
      } else {
        setShowPredictions(true);
      }
    }
  }, [isSubmitted]);

  // AUTOCOMPLETE
  useEffect(() => {
    if (isActive) {

      if (searchTerm.length < 3) {
        setShowPredictions(false);
      } else if (searchTerm.length >= 3) {
        setShowPredictions(true);
        setLoading(true)
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
    }
  }, [searchTerm]);

  // Instore single card request search field with
  // cardname (searchTerm) and user id
  const fetchSingleCard = (e) => {
    // bounce back if sent form does not match current form's id
    // This block other forms in the view to process the request down below
    // Assign cardName state to search input value
    searchInput.value = cardName;


    if (!searchTerm) {
      throw new Error('Field is empty. Please provide a suggestion');
    }

    if (e) {
      e.preventDefault();
      setShowPredictions(false);
      setIsSubmitted(true);
    }
    // else if (searchTerm) {
    //   search = searchTerm;
    // } else {
    //   search = localStorage.getItem('storeCardName');
    // }

    setLoading(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', user.token);
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/${cardName}/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('storeCards', JSON.stringify(data.data));
        localStorage.setItem('storeCardName', cardName);
        setLoading(false);
        setCards(data.result);
        setCardNames();
        setCardName('');
        setSearchTerm('');
        setShowPredictions(false);
        setIsSubmitted(false);
        setText('');
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

  const clearSearch = () => {
    setCards([]);
    setCardName('');
    localStorage.removeItem('storeCards');
    localStorage.removeItem('storeCardName');
  };

  return (
    <>
      <div className="search-card">
        <h2 className="page-title">Enter A Card Name</h2>
        <form id="search-collection-form" className="search-form" onSubmit={fetchSingleCard} ref={formRef} >
          <SearchInput cardNames={cardNames}
            isActive={isActive} ref={inputRef} />
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

export default SearchCollection;
