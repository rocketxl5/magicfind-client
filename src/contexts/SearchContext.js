import { useState, useEffect, useReducer, useRef, createContext } from 'react';
import useAuth from '../hooks/contexthooks/useAuth';

const initialState = {
  searchTerm: '',
  inputValue: '',
  predictions: [],
  cardNames: [],
  marker: -1,
}

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {

  const [searchInput, setSearchInput] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [cardCollection, setCardCollection] = useState([]);

  const [archiveCardNames, setArchiveCardNames] = useState(null);
  const [collectionCardNames, setCollectionCardNames] = useState(null);
  const [catalogCardNames, setCatalogCardNames] = useState(null);

  // State changes on delete and add card actions
  // Resets collectionCardNames state @ DashboardNav
  const [updateCollection, setUpdateCollection] = useState(false);
  const [updateCatalog, setUpdateCatalog] = useState(false);
  const [updateArchive, setUpdateArchive] = useState(false);

  // Mount state @ Collection initial fetch 
  const [isCollectionEmpty, setIsCollectionEmpty] = useState(true);
  const [displayAutcomplete, setDisplayAutocomplete] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [marker, setMarker] = useState(-1);

  const { auth } = useAuth();

  // Search field Refs
  const catalogInputRef = useRef(null);
  const collectionInputRef = useRef(null);
  const archiveInputRef = useRef(null);

  // *** New Code *** //
  const inputRef = useRef(null);

  useEffect(() => {
    setUpdateCatalog(true);
  }, [])

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
      card.userID !== auth.user.id && filteredData.push(card);
    })
    return filteredData;
  }

  return (
    <SearchContext.Provider
      value={{
        inputValue,
        setInputValue,
        cardCollection,
        setCardCollection,
        isCollectionEmpty,
        setIsCollectionEmpty,
        marker,
        setMarker,
        cardNames,
        setCardNames,
        archiveCardNames,
        setArchiveCardNames,
        collectionCardNames,
        setCollectionCardNames,
        updateCollection,
        setUpdateCollection,
        updateArchive,
        setUpdateArchive,
        setCatalogCardNames,
        catalogCardNames,
        updateCatalog,
        setUpdateCatalog,
        searchInput, 
        setSearchInput,
        searchTerm,
        setSearchTerm,
        predictions,
        setPredictions,
        filterUserCards,
        filterCardNames,
        displayAutcomplete,
        setDisplayAutocomplete,
        catalogInputRef,
        collectionInputRef,
        archiveInputRef,


        inputRef
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};