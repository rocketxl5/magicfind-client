import React, {
  useState,
  useEffect,
  forwardRef,
  useContext,
} from 'react';
import AutoComplete from './AutoComplete';
import { SearchContext } from '../../../contexts/SearchContext';

const SearchInput = forwardRef(function SearchInput(props, ref) {
  const {
    id,
    isActive
  } = props;
  const inputRef = ref;
  const [predictions, setPredictions] = useState([]);

  const {
    setMarker,
    setSearchType,
    cardTitles,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    setShowPredictions
  } = useContext(SearchContext);

  useEffect(() => {
    predictions.length && setShowPredictions(true);
  }, [predictions])

  useEffect(() => {
    if (searchTerm) {
      // If card titles is set
      if (cardTitles.length > 0) {
        if (searchTerm.length >= 3) {
          // Reset Marker to initial value
          setMarker(-1);
          setShowPredictions(false);
          const filteredCardTitles = cardTitles.filter((title) => {
            return title.toLowerCase().includes(searchTerm.toLowerCase());
          });
          setPredictions(filteredCardTitles);
        }
      }
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setMarker(-1);
    // setSearchType(undefined);
    setSearchTerm('');
    setPredictions([]);
    setShowPredictions(false);
  };

  const handleFocus = (e) => {
    setSearchInput(e.target);
    setSearchType(e.target.id);
    if (searchTerm) {
      setSearchTerm('');
    }
  }

  return (
    <>
      <input
        id={id}
        type="text"
        className="search-field"
        value={isActive ? searchTerm : ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        placeholder={
          id === 'search-catalog'
            ? 'Search Magic Find'
            : id === 'search-collection'
              ? 'Search Your Collection'
              : 'Search Skryfall API'
        }
      />
      {isActive &&
        <AutoComplete predictions={predictions} handleSubmit={props.handleSubmit} />
      }
    </>
  );
});

export default SearchInput;