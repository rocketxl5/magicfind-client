import React, {
  useState,
  useEffect,
  forwardRef,
  useContext,
} from 'react';
import AutoCompleteList from './AutoCompleteList';
import { SearchContext } from '../../../contexts/SearchContext';

const SearchInput = forwardRef(function SearchInput(props, ref) {
  const {
    isActive,
    id
  } = props;
  const inputRef = ref && ref.inputRef;
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

  // Find match with card title & searchTerm
  const filterCardTitles = (cardTitles, searchTerm) => {
    const filteredTitles = [];

    cardTitles.forEach(title => {
      title.toLowerCase().includes(searchTerm) && filteredTitles.push(title);
    });

    filteredTitles.length && setPredictions(filteredTitles);
  }

  useEffect(() => {
    predictions.length > 0 && setShowPredictions(true);
    console.log(predictions);
  }, [predictions])

  useEffect(() => {
    // If card title is set
    if (cardTitles.length > 0) {
      if (searchTerm.length < 3) {
        // Hide prediction list
        setMarker(0);
        setShowPredictions(false);
      }
      else {
        filterCardTitles(cardTitles, searchTerm)
      } 
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleBlur = (e) => {
    e.target.value = '';
    setMarker(0);
    setSearchTerm('');
    setPredictions([]);
    setShowPredictions(false);
    setSearchType(undefined);
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
              ? 'Search Your Store'
              : 'Search Skryfall API'
        }
      />
      <AutoCompleteList predictions={predictions} />
    </>
  );
});

export default SearchInput;