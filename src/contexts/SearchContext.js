import React, { createContext, useState } from 'react';

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isValidLength, setIsValidLength] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
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