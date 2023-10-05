import React, { createContext, useState } from 'react';

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isValidLength, setIsValidLength] = useState(false);

  // SearchForm & SearchStore only

  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // setSentForm stores the form id from the current form (useRef()) passed to the SearchField component
  // from one of the three search forms : Search catalog, Search API, Search Store. 
  // It is set once in the SearchField component whem the input field has focus.
  // This prevents conflict between search form since they all use the same SearchField component.
  // It informs the SearchField instance which form it is linked to. It returns in case of conflict
  const [sentForm, setSentForm] = useState('');
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
