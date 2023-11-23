import React, { useState, useEffect, createContext } from 'react';
import useAuth from '../hooks/useAuth';
import { api } from '../api/resources';
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [timeLapse, setTimeLapse] = useState(0);
  const [searchInput, setSearchInput] = useState(null);
  const [cardName, setCardName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState('');
  const [searchType, setSearchType] = useState(undefined);
  const [displayAutcomplete, setDisplayAutocomplete] = useState(false);
  const [apiCardNames, setApiCardNames] = useState(null);
  const [cardNames, setCardNames] = useState([]);
  const [marker, setMarker] = useState(-1);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLapse(timeLapse + 1);
    }, 1000)
    return () => clearInterval(timer)
  })

  const getCardNames = (cards) => {
    let filteredData = [];

    cards.forEach(card => {
      !filteredData.includes(card.name) && filteredData.push(card.name);
    })
    return filteredData;
  }

  const removeUserCards = (cards) => {
    let filteredData = [];

    cards.forEach(card => {
      card.userID !== user.id && filteredData.push(card);
    })
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
        setCardNames(getCardNames(catalogCards));
        setSearchType(undefined);
        localStorage.setItem('catalogCards', JSON.stringify(catalogCards));
        localStorage.setItem('cardNames', JSON.stringify(getCardNames(catalogCards)));
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
    if (apiCardNames) {
      console.log(apiCardNames);
      setCardNames(apiCardNames);
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/api-cardnames`, options)
      .then((res) => res.json())
      .then((data) => {
        setApiCardNames(data);
        setSearchType(undefined);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    setCardNames(apiCardNames)
  }, [apiCardNames])

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