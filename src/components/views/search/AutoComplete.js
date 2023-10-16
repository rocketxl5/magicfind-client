import React, { useRef, useState, useEffect, useContext } from 'react'
import Predictions from './Predictions';
import { SearchContext } from '../../../contexts/SearchContext';

const AutoComplete = (props) => {
    const [tracker, setTracker] = useState(0);
    const [currentListItem, setCurrentListItem] = useState(null);
    const [previousListItem, setPreviousListItem] = useState(null);
    const [hoverTarget, setHoverTarget] = useState(null);
    const [hoverList, setHoverList] = useState(false);
    const [power, setPower] = useState(false);

    const { isValidLength } = useContext(SearchContext);

    const listItems = useRef(null);

    const { inputRef } = props;

    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

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
                    console.log(listItem.textContent)
                    console.log(inputRef.current)
                    inputRef.current.value = listItem.textContent;
                    console.log(inputRef.current)
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
                    inputRef.current.value = listItem.textContent;
                }
            }
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
        ;
        // localStorage.setItem('searchTerm', JSON.stringify(content));
    };



    return (
        <ul
            onClick={handleClick}
            onMouseLeave={(e) => setHoverList(false)}
            id="autocomplete-list"
            className="autocomplete-list"
            ref={listItems}
        >
            {cardNames &&
                cardNames.map((cardName, index) => {
                    return (
                        isValidLength && (
                            <Predictions
                                tracker={tracker}
                                setTrackerHandler={(state) => setTracker(state)}
                                key={cardName}
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
    )
}

export default AutoComplete
