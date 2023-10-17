import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useContext,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Predictions from './Predictions';
import { SearchContext } from '../../../contexts/SearchContext';

const SearchInput = forwardRef(function SearchInput(props, ref) {
  const {
    formId,
    cardNames,
    isActive
  } = props;
  // console.log(ref)
  // const { inputRef } = ref;
  const inputRef = ref && ref.inputRef;


  const [tracker, setTracker] = useState(0);
  const [currentListItem, setCurrentListItem] = useState(null);
  const [previousListItem, setPreviousListItem] = useState(null);
  const [hoverTarget, setHoverTarget] = useState(null);
  const [hoverList, setHoverList] = useState(false);
  const [power, setPower] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState(null);
  const {
    searchInput,
    setSearchInput,
    searchTerm,
    setSearchTerm,
    setCardName,
    isValidLength,
    setIsValidLength,
    setIsSubmitted,
    text,
    setText
  } = useContext(SearchContext);

  const ulRef = useRef(null);

  // Rendering and styling of a Suggestions list item single component
  // Is triggered on currentListItem state change and hoverList state change
  useEffect(() => {
    // If autocompleteList is defined (ul is populated) and Suggestions change
    // are triggered with arrowup and arrowdown keypress.
    if (power) {
      setPower(false);
      if (!hoverTarget && autocompleteList) {
        if (currentListItem && previousListItem) {
          currentListItem.style['background'] = '#efefef';
          previousListItem.style['background'] = '#fff';
        }
        // keydown form search input field
        if (currentListItem && !previousListItem) {
          currentListItem.style['background'] = '#efefef';
        }
        // keyup back into search input field
        if (!currentListItem && previousListItem) {
          previousListItem.style['background'] = '#fff';
        }

        if (
          !currentListItem &&
          !previousListItem &&
          autocompleteList.firstChild
        ) {
          autocompleteList.firstChild.style['background'] = '#fff';
        }
        // Else if autocompleteList is defined (ul is populated) and Suggestions change
        // are triggered with the mouse hover
      } else if (hoverTarget && autocompleteList) {
        // console.log(hoverTarget);
        // if currentListItem is defined (mot null)
        if (currentListItem) {
          currentListItem.style['background'] = '#fff';
          hoverTarget.style['background'] = '#e4e4e4';
          setPreviousListItem(currentListItem);
          setCurrentListItem(hoverTarget);
        } else {
          hoverTarget.style['background'] = '#e4e4e4';
          setPreviousListItem(hoverTarget);
          setCurrentListItem(hoverTarget);
        }
      }
    }
  }, [currentListItem, hoverTarget]);


  // Keyboard arrow up and down autocomplete list searching function
  const handleKeyDown = (e) => {
    if (autocompleteList) {
      // Sets hover state to false for useEffect hook above
      setHoverTarget(false);

      if (e.key === 'ArrowDown') {
        setPower(true);
        let listItem = '';
        if (tracker === autocompleteList.childNodes.length) {
        // console.log(currentListItem.tabIndex);
          return console.log('cant go any higher');
        }
        if (tracker === 0) {
          listItem = autocompleteList.firstChild;
          setCurrentListItem(listItem);
          setPreviousListItem(null);
        } else if (!currentListItem && previousListItem) {
          listItem = previousListItem;
          setPreviousListItem(null);
          setCurrentListItem(listItem);
        } else {
          listItem = currentListItem.nextSibling;
          setPreviousListItem(currentListItem);
          setCurrentListItem(currentListItem.nextSibling);
        }
        setTracker(tracker + 1);
        setCardName(listItem.textContent);
        if (listItem) {
          console.log(listItem.textContent)
          // searchInput.value = listItem.textContent;
        }
      }
      if (e.key === 'ArrowUp') {
        setPower(true);
        let listItem = '';
        // if (!currentListItem && !previousListItem) {
        //   return null;
        // }

        if (tracker === 0) {
          return console.log('cant go any lower');
        }

        if (currentListItem.tabIndex === 0) {
          setPreviousListItem(null);
          setCurrentListItem(null);
        } else {
          listItem = currentListItem.previousSibling;
          setPreviousListItem(currentListItem);
          setCurrentListItem(currentListItem.previousSibling);
        }
        setTracker(tracker - 1);
        if (listItem) {
          console.log(listItem.textContent)
          setCardName(listItem.textContent);
          // searchInput.value = listItem.textContent;
        }
      }
    }
  };

  // keydown event listener calls handleKeyDown function
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
    setSearchTerm(e.target.value)
  };

  const handleBlur = (e) => {
    // Reset currentListItem and previousListItem
    // on loosing focus of the search text field
    setCurrentListItem(null);
    setAutocompleteList(null);
    if (!hoverList) {
      setIsValidLength(false);
    }
  };


  const handleFocus = (e) => {
    setAutocompleteList(ulRef.current);
    if (searchInput !== e.target) {
      setSearchInput(e.target);
      if (searchTerm) {
        // empty it
        setSearchTerm('');
      }
    }

    setTracker(0);
    if (text.length > 2) {
      setIsValidLength(true);
      setHoverList(false);
    }
  };

  // Click event manager function on list of suggestions
  const handleClick = (e) => {

    if (e.target.nodeName === 'LI') {
      setCardName(e.target.textContent);
    } 
    setIsSubmitted(true);
    // localStorage.setItem('searchTerm', JSON.stringify(content));
  };

  return (
    <>
      <input
        id={`search-${formId.split('-')[1]}-input`}
        type="text"
        className="search-field"
        value={isActive ? inputRef.current.value : ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        placeholder={
          formId === 'search-catalog'
            ? 'Search Magic Find'
            : formId === 'search-api'
              ? 'Search Skryfall API'
              : 'Search Your Store'
        }
      />
      {
        <ul
          onClick={handleClick}
          onMouseLeave={(e) => setHoverList(false)}
          id="autocomplete-list"
          className="autocomplete-list"
          ref={ulRef}
        >
          {cardNames &&
            cardNames.map((cardName, index) => {
              return (
                isValidLength && (
                  <Predictions
                    setTrackerHandler={(state) => setTracker(state)}
                    key={cardName}
                    searchTerm={searchTerm}
                    setPower={setPower}
                    setHoverTarget={setHoverTarget}
                    setHoverList={setHoverList}
                    cardName={cardName}
                    index={index}
                  />
                )
              );
            })}
        </ul>
      }
    </>
  );
});

export default SearchInput;