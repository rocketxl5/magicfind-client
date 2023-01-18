import React, { useContext, createContext, useState, useEffect } from 'react';

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isValidLength, setIsValidLength] = useState(false);
  // SearchBar & SearchStore only
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sentForm, setSentForm] = useState(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResult,
        setSearchResult,
        isValidLength,
        setIsValidLength,
        showSuggestions,
        setShowSuggestions,
        isSubmitted,
        setIsSubmitted,
        sentForm,
        setSentForm,
        hasFocus,
        setHasFocus,
        text,
        setText
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
