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
import { CardContext } from '../../../contexts/CardContext';
import { PathContext } from '../../../contexts/PathContext';
import styled from 'styled-components';

const SearchField = forwardRef(function SearchField(props, ref) {
  console.log(props)
  const {
    searchTermHandler,
    formId,
    setRequestSent,
    cardNames,
    searchTerm,
    isActive,
    searchInput,
  } = props;

  console.log(formId)
  const [currentListItem, setCurrentListItem] = useState(null);
  const [previousListItem, setPreviousListItem] = useState(null);
  const [hoverTarget, setHoverTarget] = useState(null);
  const [hoverList, setHoverList] = useState(false);
  const [power, setPower] = useState(false);

  const {
    previousFormID,
    setPreviousFormID,
    isValidLength,
    setIsValidLength,
    setIsSubmitted,
    text,
    setText
  } = useContext(SearchContext);

  const { tracker, setTracker } = useContext(CardContext);
  const { path } = useContext(PathContext);

  const listItems = useRef(null);




  // Rendering and styling of a Suggestions list item single component
  // Is triggered on currentListItem state change and hoverList state change
  useEffect(() => {
    // If listItems is defined (ul is populated) and Suggestions change
    // are triggered with arrowup and arrowdown keypress.
    if (power) {
      setPower(false);
      if (!hoverTarget && listItems) {
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
          listItems.current.firstChild
        ) {
          listItems.current.firstChild.style['background'] = '#fff';
        }
        // Else if listItems is defined (ul is populated) and Suggestions change
        // are triggered with the mouse hover
      } else if (hoverTarget && listItems) {
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

  // Clear search field on url change
  // useEffect(() => {
  //   if (searchInput.current) {
  //     searchInput.value = '';
  //   }
  //   if (searchTerm) {
  //     searchTermHandler('');
  //   }
  // }, [path]);

  // Keyboard arrow up and down autocomplete list searching function
  const handleKeyDown = (e) => {
    if (listItems) {
      // Sets hover state to false for useEffect hook above
      setHoverTarget(false);

      if (e.key === 'ArrowDown') {
        setPower(true);
        let listItem = '';
        if (tracker === listItems.current.childNodes.length) {
          // console.log(currentListItem.tabIndex);
          return console.log('cant go any higher');
        }
        if (tracker === 0) {
          listItem = listItems.current.firstChild;
          setCurrentListItem(listItem);
          setPreviousListItem(null);
          setRequestSent(false);
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

        if (listItem) {
          searchInput.value = listItem.textContent;
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
          searchInput.value = listItem.textContent;
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
    // console.log(e.target.value);
    setText(e.target.value);
    searchTermHandler(e.target.value);
  };

  const handleBlur = (e) => {
    // Reset currentListItem and previousListItem
    // on loosing focus of the search text field
    setCurrentListItem(null);
    if (!hoverList) {
      setIsValidLength(false);
    }
  };


  const handleFocus = (e) => {
    // Sets activeForm with form id string
    console.log(formId)


    if (previousFormID) {
      if (previousFormID !== formId) {
        // if searchTerm not empty
        if (searchTerm) {
          // empty it
          searchTermHandler('');
        }
      }
    }

    setTracker(0);
    setPreviousFormID(formId);
    if (text.length > 2) {
      setIsValidLength(true);
      setHoverList(false);
    }
  };

  // Click event manager function on list of suggestions
  const handleClick = (e) => {
    let content = '';

    if (e.target.nodeName === 'LI') {
      content = e.target.textContent;
    } else if (e.target.nodeName === 'STRONG') {
      content = e.target.parentNode.textContent;
    }
    searchTermHandler(content.toLowerCase());
    setIsSubmitted(true);
    // localStorage.setItem('searchTerm', JSON.stringify(content));
  };

  return (
    <>
      <input
        type="text"
        className="search-field"
        value={isActive ? searchTerm : ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={searchInput}
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
          id="search-result"
          className="search-result"
          ref={listItems}
        >
          {cardNames &&
            cardNames.map((cardName, index) => {
              return (
                isValidLength && (
                  <Predictions
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

export default SearchField;
