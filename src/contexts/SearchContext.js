import React, { useState, useEffect, createContext } from 'react';
import useAuth from '../hooks/useAuth';
import { api } from '../api/resources';
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [cardName, setCardName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState('');
  const [searchType, setSearchType] = useState(undefined);
  const [displayAutcomplete, setDisplayAutocomplete] = useState(false);
  const [cardNames, setCardNames] = useState([]);
  const [marker, setMarker] = useState(-1);
  const { user } = useAuth();
  const getCardNames = (cards) => {
    let filteredData = [];

    cards.forEach(card => {
      !filteredData.includes(card.name) && filteredData.push(card.name);
    })
    // console.log('card titles', filteredData)
    return filteredData;
  }

  const removeUserCards = (cards) => {
    let filteredData = [];

    cards.forEach(card => {
      card.userID !== user.id && filteredData.push(card);
    })
    // console.log('removed user cards', filteredData)
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
        // console.log('raw data', data)
        const catalogCards = user ? removeUserCards(data, user.id) : data;
        // setCards(cards);
        setCardNames(getCardNames(catalogCards));
        setSearchType(undefined);
      })
      .catch((error) => console.log(error));
  }

  const fetchCollectionCards = () => {
    // console.log('fectching from collection')
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
        console.log(data)
        setCardNames(getCardNames(collectionCards));
        setSearchType(undefined);
      })
      .catch((error) => console.log(error));
  }

  const fetchApiCards = () => {
    // console.log('fectching from api')
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/api-card-titles`, options)
      .then((res) => res.json())
      .then((cards) => {
        // Filter arena edition cards
        const filteredCards = cards.filter(card => {
          card.arena_id && console.log(card.arena_id)
          return !card.arena_id
        })
        setCardNames(filteredCards);
        setSearchType(undefined);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
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
        cardNames,
        setCardNames,
        cards,
        setCards,
        searchInput, 
        setSearchInput,
        searchTerm,
        setSearchTerm,
        cardName,
        setCardName,
        displayAutcomplete,
        setDisplayAutocomplete
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};