import { useState, useEffect, useReducer, useRef, createContext } from 'react';
import { searchReducer } from '../features/search/services/searchReducer';
import useAuth from '../hooks/contexthooks/useAuth';

const initialState = {
  cardNames: [],
  inputValue: '',
  exact: true,
  loading: false,
  position: -200,
  predictions: [],
  searchResult: [],
  searchTerm: '',
  searchType: '',
  selection: '',
  tracker: -1,
}

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {

  const [state, dispatch] = useReducer(searchReducer, initialState);

  const {
    cardNames,
    exact,
    inputValue,
    loading,
    position,
    predictions,
    searchResult,
    searchTerm,
    searchType,
    selection,
    tracker,
  } = state || {};

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

  const { auth } = useAuth();

  // Search field Refs
  const catalogInputRef = useRef(null);
  const collectionInputRef = useRef(null);
  const archiveInputRef = useRef(null);

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
        cardCollection,
        setCardCollection,
        isCollectionEmpty,
        setIsCollectionEmpty,
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
        filterUserCards,
        filterCardNames,
        catalogInputRef,
        collectionInputRef,
        archiveInputRef,

        cardNames,
        exact,
        inputValue,
        loading,
        position,
        predictions,
        searchResult,
        searchType,
        searchTerm,
        selection,
        tracker,
        dispatch,
        initialState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};