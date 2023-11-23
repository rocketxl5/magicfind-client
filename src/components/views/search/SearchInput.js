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
    cardNames,
    setCardName,
    setCardNames,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    displayAutoComple,
    setDisplayAutocomplete
  } = useContext(SearchContext);

  // useEffect(() => {
  //   // If searchterm string length is equal or greater than 3
  //   if (searchTerm.length >= 3) {
  //     // Reset Marker to initial value
  //     setMarker(-1);
  //     // setDisplayAutocomplete(false);
  //     const filteredCardTitles = cardNames.filter((title) => {
  //       return title.toLowerCase().includes(searchTerm.toLowerCase());
  //     });

  //     !displayAutoComple && setDisplayAutocomplete(true)
  //     // Triggers useEffect above
  //     setPredictions(filteredCardTitles);
  //   }
  //   else {
  //     setDisplayAutocomplete(false);
  //   }
  // }, [searchTerm]);

  const handleChange = (e) => {
    if (e.target.value.length >= 3) {

      // Reset Marker to initial value
      setMarker(-1);

      const filteredCardTitles = cardNames.filter((title) => {
        return title.toLowerCase().includes(e.target.value.toLowerCase());
      });

      !displayAutoComple && setDisplayAutocomplete(true)

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
    // setSearchType(undefined);
    setSearchTerm('');
    setPredictions([]);
    setDisplayAutocomplete(false);
    setCardNames([]);
  };

  const handleFocus = (e) => {
    setSearchInput(e.target);
    setSearchType(e.target.id);
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
        <AutoComplete predictions={predictions} handleSubmit={props.handleSubmit} inputRef={inputRef} />
      }
    </>
  );
});

export default SearchInput;