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

  // Find match with card title & searchTerm
  const filterCardTitles = (cardTitles, searchTerm) => {
    const filteredTitles = [];

    cardTitles.forEach(title => {
      title.toLowerCase().includes(searchTerm) && filteredTitles.push(title);
    });

    filteredTitles.length && setPredictions(filteredTitles);
  }

  useEffect(() => {
    predictions.length && setShowPredictions(true);
    console.log(predictions);
  }, [predictions])

  useEffect(() => {
    if (searchTerm) {
      // If card title is set
      if (cardTitles.length > 0) {
        if (searchTerm.length < 3) {
          // Hide prediction list
          setMarker(-1);
          setShowPredictions(false);
        }
        else {
          filterCardTitles(cardTitles, searchTerm)
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
              ? 'Search Your Store'
              : 'Search Skryfall API'
        }
      />
      {isActive &&
        <AutoCompleteList predictions={predictions} handleSubmit={props.handleSubmit} />
      }
    </>
  );
});

export default SearchInput;