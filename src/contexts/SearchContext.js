import React, { useContext, createContext, useState, useEffect } from 'react';

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isValidLength, setIsValidLength] = useState(false);

  // SearchForm & SearchStore only

  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // setSendForm stores the form id from the current form (useRef()) passed to the SearchField component
  // from one the three search forms : Search catalog, Search API, Search Store. 
  // It is set once in the SearchField component whem the input field has focus.
  // This prevents conflict between search form since they all use the same SearchField component.
  // It informs the SearchField instance which form it is linked to. It returns in case of conflict
  const [sentForm, setSentForm] = useState('');
  // This sentForm value is passed to the dependency array of a useEffect
  // in each Forms to compare the value with the current form id.

  const [hasFocus, setHasFocus] = useState(false);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // 

  return (
    <SearchContext.Provider
      value={{
        sentForm,
        setSentForm,
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
