import React, {
  useRef,
  useState,
  forwardRef,
  useContext,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AutoCompleteList from './AutoCompleteList';
import { SearchContext } from '../../../contexts/SearchContext';

const SearchInput = forwardRef(function SearchInput(props, ref) {
  const {
    isActive,
    id
  } = props;
  const inputRef = ref && ref.inputRef;
  const [predictionList, setPredictionList] = useState(null);

  const {
    setSearchType,
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    setTracker,
    setIsValidLength
  } = useContext(SearchContext);
  const ulRef = useRef(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleBlur = (e) => {

    e.target.value = '';
    // setSearchInput(null);
    setSearchTerm('');
    setPredictionList(null);
    setIsValidLength(false);
    setSearchType(undefined);
    setTracker(0);
  };


  const handleFocus = (e) => {
    setPredictionList(ulRef.current);
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
      {/* <AutoCompleteList cardNames={cardNames} predictionList={predictionList} ref={ulRef} /> */}
    </>
  );
});

export default SearchInput;