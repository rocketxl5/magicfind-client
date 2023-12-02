import React, {
  forwardRef,
  useContext
} from 'react';
import AutoComplete from './AutoComplete';
import { SearchContext } from '../../../contexts/SearchContext';

const SearchInput = forwardRef(function SearchInput(props, ref) {
  const {
    id,
    isActive,
    handleSubmit
  } = props;
  const inputRef = ref;

  const {
    setMarker,
    cardNames,
    setCardName,
    setSearchInput,
    setCardNames,
    searchTerm,
    setSearchTerm,
    predictions,
    setPredictions,
    displayAutcomplete,
    setDisplayAutocomplete
  } = useContext(SearchContext);

  const handleChange = (e) => {
    if (e.target.value.length >= 3) {

      // Reset Marker to initial value
      setMarker(-1);

      const filteredCardTitles = cardNames?.filter((title) => {
        return title.toLowerCase().includes(e.target.value.toLowerCase());
      });

      !displayAutcomplete && setDisplayAutocomplete(true)
      setPredictions(filteredCardTitles);
      setCardName(e.target.value);
    }
    else {
      setDisplayAutocomplete(false);
      setCardName('');
    }
    setSearchTerm(e.target.value)
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setMarker(-1);
    setSearchTerm('');
    setPredictions([]);
    setDisplayAutocomplete(false);
    setSearchInput(null);
  };

  const handleFocus = (e) => {
    setSearchInput(e.target);
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
      {(isActive && searchTerm) &&
        <AutoComplete predictions={predictions} handleSubmit={handleSubmit} inputRef={inputRef} />
      }
    </>
  );
});

export default SearchInput;