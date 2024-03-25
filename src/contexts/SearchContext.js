import { useRef, useState, useEffect, createContext } from 'react';
import useAuth from '../hooks/contexthooks/useAuth';
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [cardName, setCardName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [archiveCardNames, setArchiveCardNames] = useState(null);
  const [collectionCardNames, setCollectionCardNames] = useState(null);
  const [catalogCardNames, setCatalogCardNames] = useState(null);

  // State changes on delete and add card actions
  // Resets collectionCardNames state @ DashboardNav
  const [updateCollection, setUpdateCollection] = useState(false);
  const [updateCatalog, setUpdateCatalog] = useState(false);
  const [updateArchive, setUpdateArchive] = useState(false);

  // Mount state @ Collection initial fetch 
  const [errorMessage, setErrorMessage] = useState([]);
  const [displayAutcomplete, setDisplayAutocomplete] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState(-1);

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
        errorMessage,
        setErrorMessage,
        marker,
        setMarker,
        loading,
        setLoading,
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
        cardName,
        setCardName,
        predictions,
        setPredictions,
        filterUserCards,
        filterCardNames,
        displayAutcomplete,
        setDisplayAutocomplete,
        catalogInputRef,
        collectionInputRef,
        archiveInputRef
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};