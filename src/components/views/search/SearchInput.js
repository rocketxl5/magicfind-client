import React, {
  forwardRef,
  useContext
} from 'react';
import AutoComplete from './AutoComplete';
import { SearchContext } from '../../../contexts/SearchContext';
import hideSearchBar from '../../../utilities/hideSearchBar';

const SearchInput = forwardRef(function SearchInput(props, ref) {
  const {
    id,
    className,
    placeholder,
    searchCard,
    isActive,
  } = props;
  const inputRef = ref;

  const {
    setMarker,
    cardNames,
    setCardName,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    predictions,
    setPredictions,
    searchInput,
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
      // setCardName(e.target.value);
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
  };

  const handleFocus = (e) => {
    e.preventDefault();
    // console.log(searchInput?.id)
    if (searchInput?.id !== e.target.id) {

      setSearchInput(e.target);
    }

    if (document.querySelector('#mobile-nav')?.checked) {
      hideSearchBar();
    }
  }

  return (
    <>
      <input
        id={id}
        type="text"
        className={className}
        value={isActive ? searchTerm : ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        placeholder={placeholder}
      />
      {(isActive && searchTerm) &&
        <AutoComplete predictions={predictions} searchCard={searchCard} inputRef={inputRef} />
      }
    </>
  );
});

export default SearchInput;