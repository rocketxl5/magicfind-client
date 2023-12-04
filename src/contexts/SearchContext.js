import React, { useState, createContext } from 'react';
import useAuth from '../hooks/useAuth';
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [cardName, setCardName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [apiCards, setApiCards] = useState(null);
  const [collectionCards, setCollectionCards] = useState(undefined);
  const [cards, setCards] = useState([]);
  const [displayAutcomplete, setDisplayAutocomplete] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [marker, setMarker] = useState(-1);
  const { auth } = useAuth();

  // Returns array of unique card names
  const filterCardNames = (cards) => {
    let filteredData = [];
    cards.forEach(card => {
      !filteredData.includes(card.name) && filteredData.push(card.name);
    })
    return filteredData;
  }

  // Returns array of cards minus user cards
  const filterUserCards = (cards) => {
    let filteredData = [];

    cards.forEach(card => {
      card.userID !== auth.id && filteredData.push(card);
    })
    return filteredData;
  }

  return (
    <SearchContext.Provider
      value={{
        marker,
        setMarker,
        cardNames,
        setCardNames,
        cards,
        setCards,
        apiCards,
        setApiCards,
        collectionCards,
        setCollectionCards,
        searchInput, 
        setSearchInput,
        searchTerm,
        setSearchTerm,
        cardName,
        setCardName,
        predictions,
        setPredictions,
        filterUserCards,
        filterCardNames,
        displayAutcomplete,
        setDisplayAutocomplete
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};