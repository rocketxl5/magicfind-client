import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import { UserContext } from './UserContext';
import { api } from '../api/resources';
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [cardName, setCardName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState('');
  const { user } = useContext(UserContext);
  const [searchType, setSearchType] = useState(undefined);
  const [showPredictions, setShowPredictions] = useState(false);
  const [cardTitles, setCardTitles] = useState([]);
  const [marker, setMarker] = useState(-1);

  const getCardNames = (cards) => {
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

  const fetchCatalogCards = () => {
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
        setCardTitles(getCardNames(catalogCards));
        setSearchType(undefined);
      })
      .catch((error) => console.log(error));
  }

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
        const collectionCards = data;
        setCardTitles(getCardNames(collectionCards));
        setSearchType(undefined);
      })
      .catch((error) => console.log(error));
  }

  const fetchApiCards = () => {
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
          fetchCatalogCards();
          break;
        case 'search-collection':
          fetchCollectionCards();
          break;
        default:
          fetchApiCards();
          break;
      }
    }
  }, [searchType])

  return (
    <SearchContext.Provider
      value={{
        marker,
        setMarker,
        setSearchType,
        cardTitles,
        cards,
        setCards,
        searchInput, 
        setSearchInput,
        searchTerm,
        setSearchTerm,
        cardName,
        setCardName,
        showPredictions,
        setShowPredictions
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};