import React, { createContext, useState } from 'react';

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isValidLength, setIsValidLength] = useState(false);

  // SearchForm & SearchStore only

  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // setSendForm stores the form id from the current form (useRef()) passed to the SearchField component
  // from one the three search forms : Search catalog, Search API, Search Store. 
  // It is set oncesearchTerm in the SearchField component whem the input field has focus.
  // This prevents conflict between search form since they all use the same SearchField component.
  // It informs the SearchField instance which form it is linked to. It returns in case of conflict

  // This sentForm value is passed to the dependency array of a useEffect
  // in each Forms to compare the value with the current form id.
  const [searchInput, setSearchInput] = useState(null);
  const [previousFormID, setPreviousFormID] = useState(null);
  const [cardName, setCardName] = useState('');
  const [text, setText] = useState('');
  let [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider
      value={{
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
        showSuggestions,
        setShowSuggestions,
        isSubmitted,
        setIsSubmitted,
        text,
        setText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
