import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import { UserContext } from './UserContext';
import { api } from '../api/resources';
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isValidLength, setIsValidLength] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const [previousFormID, setPreviousFormID] = useState(null);
  const [cardName, setCardName] = useState('');
  const [text, setText] = useState('');
  const [tracker, setTracker] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState('');



  const { user } = useContext(UserContext);
  const [searchType, setSearchType] = useState(undefined);
  const [cardTitles, setCardTitles] = useState(null);

  const getCardTitles = (cards) => {
    let filteredData = [];

    cards.forEach(card => {
      !filteredData.includes(card.name) && filteredData.push(card.name);
    })
    console.log('card titles', filteredData)
    return filteredData;
  }

  const removeUserCards = (cards) => {
    let filteredData = [];

    cards.forEach(card => {
      card.userID !== user.id && filteredData.push(card);
    })

    console.log('removed user cards', filteredData)
    return filteredData;
  }



  const fetchCatalogCardTitles = () => {
    console.log('fectching from catalog')
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/catalog`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log('raw data', data)
        const catalogCards = user ? removeUserCards(data, user.id) : data;
        // setCards(cards);
        // setSearchType(undefined);
        setCardTitles(getCardTitles(catalogCards));
      })
      .catch((error) => console.log(error));
  }

  const fetchCollectionCardTitles = () => {
    console.log('fectching from collection')
    if (user) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('user-token', user.token);
      const options = {
        method: 'GET',
        headers: headers,
      };

      fetch(`${api.serverURL}/api/cards/${user.id}`, options)
        .then((res) => res.json())
        .then((data) => {
          setCardTitles(data.data);
          setSearchType(undefined);
        })
        .catch((error) => console.log(error));
    }
  }

  const fetchApiCardTitles = () => {
    console.log('fectching from api')
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/api-card-titles`, options)
      .then((res) => res.json())
      .then((data) => {
        setCardTitles(data);
        setSearchType(undefined);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    // If searchType is defined
    if (searchType) {
      switch (searchType) {
        case 'search-catalog':
          fetchCatalogCardTitles();
          break;
        case 'search-collection':
          fetchCollectionCardTitles();
          break;
        default:
          fetchApiCardTitles();
          break;
      }
    }
  }, [searchType])

  return (
    <SearchContext.Provider
      value={{
        setSearchType,
        cardTitles,
        cards,
        setCards,
        searchInput, 
        setSearchInput,
        searchTerm,
        setSearchTerm,
        previousFormID,
        setPreviousFormID,
        cardName,
        setCardName,
        searchResult,
        setSearchResult,
        isValidLength,
        setIsValidLength,
        showPredictions,
        setShowPredictions,
        isSubmitted,
        setIsSubmitted,
        text,
        setText,
        tracker,
        setTracker
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};